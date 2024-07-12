import NFTContextProvider from "@/contexts/NFTContextProvider"

import MintHome from "./home"

const Mint = () => {
  return (
    <NFTContextProvider>
      <MintHome></MintHome>
    </NFTContextProvider>
  )
}

export default Mint
