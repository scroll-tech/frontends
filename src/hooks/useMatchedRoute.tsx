import { usePathname, useRouter } from "next/navigation"
import { match } from "path-to-regexp"

import HomepageRoutes from "@/constants/route"

export default function useMatchedRoute() {
  const pathname = usePathname()

  for (const route of HomepageRoutes) {
    if (checkMatchPath(route.fullPath || route.path, pathname)) {
      return route
    }
  }
  return {
    name: "NotFound",
  }
}

export const findCurrentRoute = pathname => {
  for (const route of HomepageRoutes) {
    if (checkMatchPath(route.fullPath || route.path, pathname)) {
      return route
    }
  }
  return {
    name: "NotFound",
  }
}

export const checkMatchPath = (routePath, currentPath) => {
  const matchPathCheck = match(routePath)
  if (matchPathCheck(currentPath)) {
    return true
  }
  return false
}
