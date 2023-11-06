import { Helmet } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import RainbowProvider from "@/contexts/RainbowProvider"
import ScrollToTop from "@/hooks/useScrollToTop"
import NotFound from "@/pages/404"
import { isSepolia, requireEnv } from "@/utils"

import AppWrapper from "./contexts"
import useMatchedRoute from "./hooks/useMatchedRoute"
import routes from "./routes"

const baseUrl = requireEnv("REACT_APP_API_BASE_URI")
function Homepage() {
  const route = useMatchedRoute()
  const getUrl = () => {
    return window.location.href
  }

  const getImageUrl = () => {
    if (window.location.pathname.startsWith("/developer-nft")) {
      return window.location.origin + "/og_scroll_origins_nft.png"
    }
    return window.location.origin + "/og_scroll.png"
  }

  return (
    <div className="App min-h-[100vh] bg-[#FFF8F3]">
      <Helmet>
        <title>Scroll{route ? " – " + route.name : null}</title>
        <meta name="description" content="Native zkEVM Layer 2 for Ethereum" />
        <meta property="og:url" content={getUrl()} />
        <meta property="og:title" content={`Scroll ${route?.name ? "- " + route.name : ""}`} />
        <meta property="og:description" content="Native zkEVM Layer 2 for Ethereum" />
        <meta property="og:image" content={getImageUrl()} />
        <link rel="preconnect" href={baseUrl} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={baseUrl} crossOrigin="anonymous" />
        <meta name="twitter:title" content={`Scroll ${route?.name ? "- " + route.name : ""}`} />
        <meta name="twitter:description" content="Native zkEVM Layer 2 for Ethereum" />
        <meta name="twitter:image" content={getImageUrl()} />
      </Helmet>
      <RainbowProvider>
        <AppWrapper>
          <ScrollToTop>
            <Header />
            <Routes>
              {routes.map((route, key) => (
                <Route key={key} path={route.path} element={route.element} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {isSepolia ? null : <Footer />}
          </ScrollToTop>
        </AppWrapper>
      </RainbowProvider>
    </div>
  )
}

export default Homepage
