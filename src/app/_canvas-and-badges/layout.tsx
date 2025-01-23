import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Canvas And Badges",
  relativeURL: "/canvas-and-badges",
  description: "Build your on-chain persona and collect badges across Scroll’s ecosystem",
  ogImg: "/og_canvas_and_badges.png",
  twitterImg: "/twitter_canvas_and_badges.png",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
