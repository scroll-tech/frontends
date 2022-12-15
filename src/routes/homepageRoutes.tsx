import Home from "@/views/home";
import Team from "@/views/team";
import Blog from "@/views/blog";
import IframeEmbedding from "@/components/IframeEmbedding";
import BlogDetail from "@/views/blog/detail";

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
    element: (
      <IframeEmbedding
        url="https://jobs.lever.co/ScrollFoundation"
        DesktopHeight="206.8rem"
        MobileHeight="255.1rem"
      />
    ),
  },
  {
    name: "Blog Detail",
    path: "/blog/:blogId",
    element: <BlogDetail />,
  },

  // { name: '404', path: '*', element: NotFound },
];

export default routes;
