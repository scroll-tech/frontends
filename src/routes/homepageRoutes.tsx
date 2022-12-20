import Home from "@/views/home"
import Team from "@/views/team"
import Blog from "@/views/blog"
import IframeEmbedding from "@/components/IframeEmbedding"
import BlogDetail from "@/views/blog/detail"
import NotFound from "@/pages/404"

const routes = [
  {
    name: "A native zkEVM layer 2 solution for Ethereum",
    path: "/",
    element: <Home />,
  },
  { name: "Blog", path: "/blog", element: <Blog /> },
  { name: "Team", path: "/team", element: <Team /> },
  {
    name: "Join Us",
    path: "/join-us",
    element: <IframeEmbedding url="https://jobs.lever.co/ScrollFoundation" DesktopHeight="207rem" MobileHeight="256rem" />,
  },
  {
    name: "Blog Detail",
    path: "/blog/:blogId",
    element: <BlogDetail />,
  },
  {
    name: "NotFound",
    path: "*",
    element: <NotFound />,
  },
]

export default routes
