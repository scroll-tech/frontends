import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Helmet } from "react-helmet"
import Web3Provider from "@/contexts/Web3ContextProvider"
import ScrollToTop from "@/hooks/useScrollToTop"
import { Route, Routes } from "react-router-dom"
import AppWrapper from "./contexts"
import routes from "./routes/prealphaRoutes"
import useMatchedRoute from "./hooks/useMatchedRoute"
function App() {
  const route = useMatchedRoute()
  const getUrl = () => {
    return window.location.href
  }

  return (
    <div className="App bg-white min-h-[100vh]">
      <Helmet>
        {route ? <title>{route.name} - Scroll</title> : null}
        <meta property="og:url" content={getUrl()} />
      </Helmet>
      <Web3Provider>
        <AppWrapper>
          <ScrollToTop>
            <Header />
            <Routes>
              {routes.map((route, key) => (
                <Route key={key} path={route.path} element={route.element} />
              ))}
            </Routes>
            <Footer />
          </ScrollToTop>
        </AppWrapper>
      </Web3Provider>
    </div>
  )
}

export default App
