import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "App Privacy Policy",
  relativeURL: "/app-privacy-policy",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
