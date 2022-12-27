import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import LoadingPage from "@/components/LoadingPage"
import ReactGA from "react-ga4"
import { HelmetProvider } from "react-helmet-async"

const Prealpha = React.lazy(() => import("./Prealpha"))
const Homepage = React.lazy(() => import("./Homepage"))

function App() {
  let location = useLocation()

  React.useEffect(() => {
    // Google Analytics
    ReactGA.send(`${location.pathname}${location.search}`)
  }, [location])

  return (
    <HelmetProvider>
      <React.Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/prealpha/*" element={<Prealpha />} />
          <Route path="/*" element={<Homepage />} />
        </Routes>
      </React.Suspense>
    </HelmetProvider>
  )
}

export default App
