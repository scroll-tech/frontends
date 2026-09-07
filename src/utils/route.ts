import { isNil, isPlainObject, mergeWith } from "lodash"
import type { Metadata } from "next"
import { match } from "path-to-regexp"

import { DEFAULT_METADATA } from "@/constants/route"

type RouteParams = {
  params: Record<string, string>
  searchParams: Record<string, string>
}

// type MetadataGeneratorProps = {
//   paramsProps: RouteParams
//   parent: Promise<Metadata>
// }

type GenMetaParams = {
  titleSuffix?: string
  description?: string
  relativeURL?: string
  ogImg?: string
  twitterImg?: string
} & Partial<Metadata>

type MetaGeneratorResult = Promise<GenMetaParams> | GenMetaParams

type MetaGeneratorFn = (paramsProps: RouteParams, parent: Metadata) => MetaGeneratorResult

async function defaultGenMetaFn(paramsProps: RouteParams, parent: Metadata): Promise<GenMetaParams> {
  return {}
}

export const batchCheckMatchPath = (routeList, currentPath) => {
  for (const route of routeList) {
    if (checkMatchPath(route, currentPath)) {
      return true
    }
  }
  return false
}

export const checkMatchPath = (routePath, currentPath) => {
  const matchPathCheck = match(routePath)
  if (matchPathCheck(currentPath)) {
    return true
  }
  return false
}

export function mergeNoNullish<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (sources.length < 2) {
    throw new Error("At least 3 objects (1 target and 2 sources) are required")
  }

  const customizer = (value: any, srcValue: any): any => {
    // Handle arrays specially
    if (Array.isArray(value) && Array.isArray(srcValue)) {
      return srcValue.filter(item => !isNil(item))
    }

    // Skip nullish values from source
    if (isNil(srcValue)) {
      return value
    }
  }

  // First, merge all objects
  const merged = mergeWith({}, target, ...sources, customizer)

  // Then recursively remove nullish values
  const removeNullish = (obj: any): any => {
    if (!isPlainObject(obj)) {
      return isNil(obj) ? undefined : obj
    }

    if (Array.isArray(obj)) {
      return obj.filter(item => !isNil(item)).map(item => removeNullish(item))
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanValue = removeNullish(value)
      if (!isNil(cleanValue)) {
        acc[key] = cleanValue
      }
      return acc
    }, {} as any)
  }

  return removeNullish(merged) as T
}

export function genMeta(fn: MetaGeneratorFn = defaultGenMetaFn) {
  return async function (paramsProps, parent) {
    const { metadataBase, ...restParent } = await parent
    let { title, titleSuffix, description, relativeURL, ogImg, twitterImg, ...otherOpts } = await fn(paramsProps, restParent)

    // nextjs has title.template for this nested title
    // but it won't work for titles in og and twitter
    title = title || `${DEFAULT_METADATA.title}${titleSuffix ? " - " + titleSuffix : ""}`
    description = (description || DEFAULT_METADATA.description) as string
    const openGraphImages = ogImg ? [ogImg] : [DEFAULT_METADATA.ogImg]
    const twitterImages = twitterImg ? [twitterImg] : [DEFAULT_METADATA.twitterImg]

    const currentRoute: Metadata = {
      title,
      openGraph: { title, description, url: relativeURL, images: openGraphImages },
      twitter: { title, description, images: twitterImages },
    }

    // nextjs complains about null deprecated value (colorScheme, ...)
    // when merge with parent route metadata
    const merged = mergeNoNullish(restParent, currentRoute, otherOpts)
    return merged
  }
}

/**
 * Routes that still render the old MUI Header/Footer. Everything else — the redesigned
 * landing page, its legal pages, and any unmatched path (i.e. every 404) — renders its
 * own chrome. This is deliberately a show-list: an allowlist of "hide it here" pages can
 * never match a 404, so the old template used to leak onto them.
 */
const LEGACY_CHROME_ROUTES = ["/sessions-restricted", "/sessions-terms-of-use", "/terms-and-conditions"]

export const hasLegacyChrome = (pathname: string) => LEGACY_CHROME_ROUTES.includes(pathname) || pathname.startsWith("/archive/")
