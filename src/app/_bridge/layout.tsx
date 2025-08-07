import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Bridge",
  relativeURL: "/bridge",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
