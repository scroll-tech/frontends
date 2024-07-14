import { SnackbarProvider } from "notistack"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"

import { Box } from "@mui/material"

import Footer from "@/components/Footer"
import GlobalComponents from "@/components/GlobalComponents"
import Header from "@/components/Header"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import CanvasContextProvider from "@/contexts/CanvasContextProvider"
import RainbowProvider from "@/contexts/RainbowProvider"
import ScrollToTop from "@/hooks/useScrollToTop"
import NotFound from "@/pages/404"
import { isSepolia, requireEnv } from "@/utils"

import useCheckTheme from "./components/Header/useCheckTheme"
import GlobalError from "./components/RequestWarning/GlobalError"
import GlobalSuccess from "./components/RequestWarning/GlobalSuccess"
import useMatchedRoute from "./hooks/useMatchedRoute"
import routes from "./routes"

interface RouteItem {
  name: string
  path: string
  fullPath?: string
  element: JSX.Element
  description?: string
  isHiddenFooter?: boolean
}

const baseUrl = requireEnv("REACT_APP_API_BASE_URI")

function Homepage() {
  const dark = useCheckTheme()
  const route = useMatchedRoute() as RouteItem

  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }
    setVh()
    window.addEventListener("resize", setVh)
    return () => {
      window.removeEventListener("resize", setVh)
    }
  }, [])

  const getUrl = () => {
    return window.location.href
  }

  const getImageUrl = (type = "og") => {
    if (window.location.pathname.startsWith("/developer-nft")) {
      return window.location.origin + `/${type}_scroll_origins_nft.png`
    } else if (window.location.pathname.startsWith("/brand-kit")) {
      return window.location.origin + `/og_scroll_brand.png`
    } else if (window.location.pathname.startsWith("/sticker-vote")) {
      return window.location.origin + `/${type}_sticker_vote.png`
    } else if (window.location.pathname.startsWith("/sticker-winners")) {
      return window.location.origin + `/${type}_sticker_vote.png`
    } else if (window.location.pathname.startsWith("/sessions")) {
      return window.location.origin + `/${type}_scroll_sessions.png`
    } else if (["/canvas", "/canvas/mint"].includes(window.location.pathname)) {
      return window.location.origin + `/${type}_canvas.png`
    }
    return window.location.origin + "/og_scroll.png"
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dark ? "themeBackground.dark" : "themeBackground.light" }}>
      <Helmet>
        <title>Scroll{route ? " – " + route.name : null}</title>
        <meta name="description" content={route.description || "Native zkEVM Layer 2 for Ethereum"} />
        <meta property="og:url" content={getUrl()} />
        <meta property="og:title" content={`Scroll ${route?.name ? "- " + route.name : ""}`} />
        <meta property="og:description" content={route.description || "Native zkEVM Layer 2 for Ethereum"} />
        <meta property="og:image" content={getImageUrl()} />
        <link rel="preconnect" href={baseUrl} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={baseUrl} crossOrigin="anonymous" />
        <meta name="twitter:title" content={`Scroll ${route?.name ? "- " + route.name : ""}`} />
        <meta name="twitter:description" content={route.description || "Native zkEVM Layer 2 for Ethereum"} />
        <meta name="twitter:image" content={getImageUrl("twitter")} />
      </Helmet>
      <RainbowProvider>
        <BridgeContextProvider>
          <CanvasContextProvider>
            <SnackbarProvider Components={{ default: GlobalError, success: GlobalSuccess }}>
              <ScrollToTop>
                <Header />
                <Routes>
                  {routes.map((route, key) => (
                    <Route key={key} path={route.path} element={route.element} />
                  ))}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                {isSepolia || route.isHiddenFooter ? null : <Footer />}
              </ScrollToTop>
            </SnackbarProvider>
          </CanvasContextProvider>
          <GlobalComponents />
        </BridgeContextProvider>
      </RainbowProvider>
    </Box>
  )
}

export default Homepage
