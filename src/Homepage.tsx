import { Helmet } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"

import Header from "@/components/Header"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import RainbowProvider from "@/contexts/RainbowProvider"
import ScrollToTop from "@/hooks/useScrollToTop"
import NotFound from "@/pages/404"

import useMatchedRoute from "./hooks/useMatchedRoute"
import routes from "./routes"

interface RouteItem {
  name: string
  path: string
  fullPath?: string
  element: JSX.Element
  description?: string
}

function Homepage() {
  const route = useMatchedRoute() as RouteItem
  const getUrl = () => {
    return window.location.href
  }

  const getImageUrl = (type = "og") => {
    return window.location.origin + "/og_scroll.png"
  }

  return (
    <div className="App min-h-[100vh]">
      <Helmet>
        <title>Scroll{route ? " – " + route.name : null}</title>
        <meta name="description" content={route.description || "Native zkEVM Layer 2 for Ethereum"} />
        <meta property="og:url" content={getUrl()} />
        <meta property="og:title" content={`Scroll ${route?.name ? "- " + route.name : ""}`} />
        <meta property="og:description" content={route.description || "Native zkEVM Layer 2 for Ethereum"} />
        <meta property="og:image" content={getImageUrl()} />
        <meta name="twitter:title" content={`Scroll ${route?.name ? "- " + route.name : ""}`} />
        <meta name="twitter:description" content={route.description || "Native zkEVM Layer 2 for Ethereum"} />
        <meta name="twitter:image" content={getImageUrl("twitter")} />
      </Helmet>
      <RainbowProvider>
        <BridgeContextProvider>
          <ScrollToTop>
            <Header />
            <Routes>
              {routes.map((route, key) => (
                <Route key={key} path={route.path} element={route.element} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ScrollToTop>
        </BridgeContextProvider>
      </RainbowProvider>
    </div>
  )
}

export default Homepage
