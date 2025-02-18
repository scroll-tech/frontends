import { notFound } from "next/navigation"

import NFTContextProvider from "@/contexts/NFTContextProvider"
import { isSepolia } from "@/utils"
import { genMeta } from "@/utils/route"

import MintHome from "./home"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Scroll Origins NFT",
  relativeURL: "/developer-nft/mint",
  ogImg: "/og_scroll_origins_nft.png",
  twitterImg: "/twitter_scroll_origins_nft.png",
}))

const Mint = () => {
  if (isSepolia) {
    notFound()
  }
  return (
    <NFTContextProvider>
      <MintHome></MintHome>
    </NFTContextProvider>
  )
}

export default Mint
