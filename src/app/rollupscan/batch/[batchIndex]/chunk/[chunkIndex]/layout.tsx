import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(async ({ params }) => {
  const { batchIndex, chunkIndex } = await params
  return {
    titleSuffix: "Rollup Explorer: Chunk Details",
    relativeURL: `/rollupscan/batch/${batchIndex}/chunk/${chunkIndex}`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
