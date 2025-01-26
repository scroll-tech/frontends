import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(async ({ params }) => {
  const { batchIndex } = await params

  return {
    titleSuffix: "Rollup Explorer: Batch Details",
    relativeURL: `/rollupscan/batch/${batchIndex}`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
