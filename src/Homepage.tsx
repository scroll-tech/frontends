import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/views/home";
import Team from "@/views/team";
import Blog from "@/views/blog";
import BlogDetail from "@/views/blog/detail";
import ScrollToTop from "@/hooks/useScrollToTop";
import IframeEmbedding from "@/components/IframeEmbedding";

function Homepage() {
  return (
    <ScrollToTop>
      <div className="App bg-white min-h-[100vh]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/team" element={<Team />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/blog/:blogId" element={<BlogDetail />}></Route>
          <Route
            path="/join-us"
            element={
              <IframeEmbedding
                url="https://jobs.lever.co/ScrollFoundation"
                DesktopHeight="206.8rem"
                MobileHeight="255.1rem"
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </div>
    </ScrollToTop>
  );
}

export default Homepage;
