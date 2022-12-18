import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/hooks/useScrollToTop";
import routes from "./routes/homepageRoutes";
import useMatchedRoute from "./hooks/useMatchedRoute";

const hiddenFooterRoutesKeywords = ["blog"];

function Homepage() {
  const location = useLocation();
  const HiddenFooter = hiddenFooterRoutesKeywords.some(
    (keyword) => ~location.pathname.indexOf(keyword)
  );

  const route = useMatchedRoute();

  const getUrl = () => {
    return window.location.href;
  };
  return (
    <ScrollToTop>
      <Helmet>
        {route ? <title>{route.name} - Scroll</title> : null}
        <meta property="og:url" content={getUrl()} />
      </Helmet>
      <div className="App bg-white min-h-[100vh]">
        <Header />
        <Routes>
          {routes.map((route, key) => (
            <Route key={key} path={route.path} element={route.element} />
          ))}
        </Routes>
        {HiddenFooter ? null : <Footer />}
      </div>
    </ScrollToTop>
  );
}

export default Homepage;
