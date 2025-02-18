import { notFound } from "next/navigation"

import { isSepolia } from "@/utils"
import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Community",
  relativeURL: "/community",
  ogImg: "/og_community.png",
  twitterImg: "/twitter_community.png",
}))

export default function Layout({ children }) {
  if (isSepolia) {
    notFound()
  }
  return <>{children}</>
}
