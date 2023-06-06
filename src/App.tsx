import React from "react"
import ReactGA from "react-ga4"
import { HelmetProvider } from "react-helmet-async"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import LoadingPage from "@/components/LoadingPage"
import ScrollToTop from "@/components/ScrollToTop"
import useLoadAllStaticAssetsOnIdle from "@/hooks/useLoadAllOnIdle"
import useSentryPageTag from "@/hooks/useSentryPageTag"
import { VersionChecker } from "@/hooks/useVersionCheck"

const Homepage = React.lazy(() => import("./Homepage"))

const RemoveTrailingSlash = ({ ...rest }) => {
  const location = useLocation()

  // If the last character of the url is '/'
  if (location.pathname.match("/.*/$")) {
    return (
      <Navigate
        replace
        {...rest}
        to={{
          pathname: location.pathname.replace(/\/+$/, ""),
          search: location.search,
        }}
      />
    )
  } else return null
}

function App() {
  let location = useLocation()
  // Sentry Tag
  useSentryPageTag(location.pathname)
  useLoadAllStaticAssetsOnIdle()

  React.useEffect(() => {
    // Google Analytics
    ReactGA.send({ hitType: "pageview", page: `${location.pathname}${location.search}` })
  }, [location])

  return (
    <HelmetProvider>
      <RemoveTrailingSlash />
      <React.Suspense fallback={<LoadingPage />}>
        <VersionChecker>
          <Routes>
            <Route path="/*" element={<Homepage />} />
          </Routes>
        </VersionChecker>
        <ScrollToTop />
      </React.Suspense>
    </HelmetProvider>
  )
}

export default App
