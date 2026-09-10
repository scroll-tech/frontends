import { notFound } from "next/navigation"

import { isSepolia } from "@/utils/common"
import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Scroll Sessions Terms of Use",
  relativeURL: "/sessions-terms-of-use",
}))

export default function Layout({ children }) {
  if (isSepolia) {
    notFound()
  }
  return <>{children}</>
}
