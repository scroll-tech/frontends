import { matchPath } from "react-router";
import HomepageRoutes from "@/routes/homepageRoutes";
import PrealphaRoutes from "@/routes/prealphaRoutes";
import { useLocation } from "react-router-dom";

export default function useMatchedRoute() {
  const { pathname } = useLocation();

  for (const route of HomepageRoutes.concat(PrealphaRoutes)) {
    if (matchPath((route as any).fullPath || route.path, pathname)) {
      return route;
    }
  }
}
