import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Portal",
  relativeURL: "/portal",
}))

export default function PortalLayout({ children }) {
  return <>{children}</>
}
