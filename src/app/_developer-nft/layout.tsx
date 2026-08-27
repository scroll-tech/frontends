import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Scroll Origins NFT",
  relativeURL: "/developer-nft",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
