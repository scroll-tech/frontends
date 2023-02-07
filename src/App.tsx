import React from "react"
import ReactGA from "react-ga4"
import { HelmetProvider } from "react-helmet-async"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import LoadingPage from "@/components/LoadingPage"

const Portal = React.lazy(() => import("./Portal"))
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

  React.useEffect(() => {
    // Google Analytics
    ReactGA.send(`${location.pathname}${location.search}`)
  }, [location])

  return (
    <HelmetProvider>
      <RemoveTrailingSlash />
      <React.Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/prealpha/*" element={<Portal />} />
          <Route path="/*" element={<Homepage />} />
        </Routes>
      </React.Suspense>
    </HelmetProvider>
  )
}

export default App
