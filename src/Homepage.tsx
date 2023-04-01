import { Helmet } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ScrollToTop from "@/hooks/useScrollToTop"
import NotFound from "@/pages/404"

import useMatchedRoute from "./hooks/useMatchedRoute"
import routes from "./routes/homepageRoutes"

function Homepage() {
  const route = useMatchedRoute()

  const getImageUrl = () => {
    return window.location.origin + "/logo_for_og.png"
  }

  return (
    <ScrollToTop>
      <Helmet>
        <title>Scroll{route ? " – " + route.name : null}</title>
        <meta name="description" content="Native zkEVM Layer 2 for Ethereum" />
        <meta property="og:title" content={`Scroll ${route?.name ? "- " + route.name : ""}`} />
        <meta property="og:description" content="Native zkEVM Layer 2 for Ethereum" />
        <meta property="og:image" content={getImageUrl()} />
        <meta name="twitter:title" content={`Scroll ${route?.name ? "- " + route.name : ""}`} />
        <meta name="twitter:description" content="Native zkEVM Layer 2 for Ethereum" />
        <meta name="twitter:image" content={getImageUrl()} />
      </Helmet>
      <div className="App bg-white min-h-[100vh]">
        <Header />
        <Routes>
          {routes.map((route, key) => (
            <Route key={key} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </ScrollToTop>
  )
}

export default Homepage
