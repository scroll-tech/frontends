import { notFound } from "next/navigation"

import { genMeta } from "@/utils/route"

import Canvas from "./Canvas"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Canvas",
  relativeURL: "/canvas",
  description: "Earn attestation badges across the ecosystem.",
  ogImg: "/og_canvas.png",
  twitterImg: "/twitter_canvas.png",
}))

const CanvasPage = () => {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return <Canvas></Canvas>
}

export default CanvasPage
