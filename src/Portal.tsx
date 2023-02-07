import { Helmet } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Web3Provider from "@/contexts/Web3ContextProvider"
import ScrollToTop from "@/hooks/useScrollToTop"
import { VersionChecker } from "@/hooks/useVersionCheck"
import NotFound from "@/pages/404"
import { requireEnv } from "@/utils"

import AppWrapper from "./contexts"
import useMatchedRoute from "./hooks/useMatchedRoute"
import routes from "./routes/prealphaRoutes"

const baseUrl = requireEnv("REACT_APP_API_BASE_URI")

function Portal() {
  const route = useMatchedRoute()
  const getUrl = () => {
    return window.location.href
  }

  return (
    <div className="App bg-white min-h-[100vh]">
      <Helmet>
        <title>Scroll {route ? " – " + route.name : null} </title>
        <meta property="og:url" content={getUrl()} />
        <link rel="preconnect" href={baseUrl} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={baseUrl} crossOrigin="anonymous" />
      </Helmet>
      <Web3Provider>
        <AppWrapper>
          <VersionChecker>
            <ScrollToTop>
              <Header />
              <Routes>
                {routes.map((route, key) => (
                  <Route key={key} path={route.path} element={route.element} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </ScrollToTop>
          </VersionChecker>
        </AppWrapper>
      </Web3Provider>
    </div>
  )
}

export default Portal
