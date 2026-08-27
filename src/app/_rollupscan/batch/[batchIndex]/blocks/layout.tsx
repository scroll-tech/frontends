import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(async ({ params }) => {
  const { batchIndex } = await params
  return {
    titleSuffix: "Rollup Explorer: Block Details",
    relativeURL: `/rollupscan/batch/${batchIndex}/blocks`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
