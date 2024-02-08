import { match } from "path-to-regexp"

import allRoutes from "@/constants/route"

export const findCurrentRoute = pathname => {
  for (const route of allRoutes) {
    if (checkMatchPath(route.path, pathname)) {
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
