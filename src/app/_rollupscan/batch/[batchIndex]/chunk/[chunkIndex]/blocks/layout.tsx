import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(async ({ params }) => {
  const { batchIndex, chunkIndex } = await params
  return {
    titleSuffix: "Rollup Explorer: Block Details",
    relativeURL: `/rollupscan/batch/${batchIndex}/chunk/${chunkIndex}/blocks`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
