import { matchPath, useLocation } from "react-router-dom"

import HomepageRoutes from "@/routes"

export default function useMatchedRoute() {
  const { pathname } = useLocation()

  // trim trailing slash
  const normalizedPathname = pathname === "/" ? pathname : pathname.replace(/\/$/, "")

  for (const route of HomepageRoutes) {
    if (matchPath((route as any).fullPath || route.path, normalizedPathname)) {
      return route
    }
  }
  return {
    name: "NotFound",
  }
}
