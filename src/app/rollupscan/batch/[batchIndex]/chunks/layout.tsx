import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(async ({ params }) => {
  const { batchIndex } = await params

  return {
    titleSuffix: "Rollup Explorer: Chunk List",
    relativeURL: `/rollupscan/batch/${batchIndex}/chunks`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
