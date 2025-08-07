import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Bridge FAQ",
  relativeURL: "/bridge/faq",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
