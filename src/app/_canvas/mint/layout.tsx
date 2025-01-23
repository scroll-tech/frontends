import { notFound } from "next/navigation"

import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Canvas",
  relativeURL: "/canvas/mint",
  description: "Earn attestation badges across the ecosystem.",
  ogImg: "/og_canvas.png",
  twitterImg: "/twitter_canvas.png",
}))

export default function Layout({ children }) {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return <>{children}</>
}
