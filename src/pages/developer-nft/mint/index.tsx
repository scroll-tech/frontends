import GlobalComponents from "@/components/GlobalComponents"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import NFTContextProvider from "@/contexts/NFTContextProvider"

import MintHome from "./home"

const Mint = () => {
  return (
    <BridgeContextProvider>
      <GlobalComponents></GlobalComponents>
      <NFTContextProvider>
        <MintHome></MintHome>
      </NFTContextProvider>
    </BridgeContextProvider>
  )
}

export default Mint
