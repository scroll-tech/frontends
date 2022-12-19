import { useEffect } from "react";
import ReactGA from "react-ga";
import { RouteComponentProps } from "react-router-dom-v5";

// fires a GA pageview every time the route changes
export default function GoogleAnalyticsReporter({
  location: { pathname, search },
}: RouteComponentProps): null {
  useEffect(() => {
    ReactGA.pageview(`${pathname}${search}`);
  }, [pathname, search]);
  return null;
}
