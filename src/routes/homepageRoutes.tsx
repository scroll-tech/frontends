import IframeEmbedding from "@/components/IframeEmbedding"
import Blog from "@/views/blog"
import BlogDetail from "@/views/blog/detail"
import Home from "@/views/home"
import PrivacyPolicy from "@/views/privacyPolicy"
import Team from "@/views/team"
import Terms from "@/views/terms"

const routes = [
  {
    name: "Native zkEVM Layer 2 for Ethereum",
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
    name: "Terms and Conditions",
    path: "/terms-and-conditions",
    element: <Terms />,
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
]

export default routes
