import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Rollup Explorer",
  relativeURL: "/rollupscan",
}))

export default function RollupscanLayout({ children }) {
  return <>{children}</>
}
