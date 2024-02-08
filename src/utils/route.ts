import { match } from "path-to-regexp"

import allRoutes, { DEFAULT_METADATA, PageMetadata } from "@/constants/route"

export const findCurrentRoute = pathname => {
  for (const route of allRoutes) {
    if (checkMatchPath(route.path, pathname)) {
      return route
    }
  }
  return {
    ...DEFAULT_METADATA,
    name: "NotFound",
  } as PageMetadata
}

export const checkMatchPath = (routePath, currentPath) => {
  const matchPathCheck = match(routePath)
  if (matchPathCheck(currentPath)) {
    return true
  }
  return false
}
