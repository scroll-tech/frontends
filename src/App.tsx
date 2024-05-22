import React from "react"
import { HelmetProvider } from "react-helmet-async"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import LoadingPage from "@/components/LoadingPage"
import ScrollToTop from "@/components/ScrollToTop"
import useLoadAllStaticAssetsOnIdle from "@/hooks/useLoadAllOnIdle"

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
  useLoadAllStaticAssetsOnIdle()

  return (
    <HelmetProvider>
      <RemoveTrailingSlash />
      <React.Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/*" element={<Homepage />} />
        </Routes>
        <ScrollToTop />
      </React.Suspense>
    </HelmetProvider>
  )
}

export default App
