import { notFound } from "next/navigation"

import { isSepolia } from "@/utils"
import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Blog",
  relativeURL: "/blog",
}))

export default function Layout({ children }) {
  if (isSepolia) {
    notFound()
  }
  return <>{children}</>
}
