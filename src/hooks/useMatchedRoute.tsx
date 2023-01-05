import { useLocation, matchPath } from "react-router-dom"

import HomepageRoutes from "@/routes/homepageRoutes"
import PrealphaRoutes from "@/routes/prealphaRoutes"

export default function useMatchedRoute() {
  const { pathname } = useLocation()

  for (const route of HomepageRoutes.concat(PrealphaRoutes)) {
    if (matchPath((route as any).fullPath || route.path, pathname)) {
      return route
    }
  }
  return {
    name: "NotFound",
  }
}
