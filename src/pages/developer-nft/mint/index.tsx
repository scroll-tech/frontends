import GlobalComponents from "@/components/GlobalComponents"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import NFTContextProvider from "@/contexts/NFTContextProvider"

import MintEntry from "./entry"

const Mint = () => {
  return (
    <BridgeContextProvider>
      <GlobalComponents></GlobalComponents>
      <NFTContextProvider>
        <MintEntry></MintEntry>
      </NFTContextProvider>
    </BridgeContextProvider>
  )
}

export default Mint
