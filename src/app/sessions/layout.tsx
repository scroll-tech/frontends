import { notFound } from "next/navigation"

import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Scroll Sessions",
  relativeURL: "/sessions",
  description: "Receive Marks for your engagement with Scroll. Join Sessions now!",
  ogImg: "/og_sessions.png",
  twitterImg: "/twitter_sessions.png",
}))

export default function SessionsLayout({ children }) {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return <>{children}</>
}
