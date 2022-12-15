import { matchPath } from "react-router";
import routes from "@/routes/homepageRoutes";
import { useLocation } from "react-router-dom";

export default function useMatchedRoute() {
  const { pathname } = useLocation();
  for (const route of routes) {
    if (matchPath(route.path, pathname)) {
      return route;
    }
  }
}
