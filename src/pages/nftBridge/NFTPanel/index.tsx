import { useEffect } from "react"

import { Container } from "@mui/material"

import { ChainId, networks } from "@/constants"
import NFTBridgeProvider from "@/contexts/NFTBridgeProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { switchNetwork } from "@/utils"

import CornerTip from "../components/CornerTip"
import Transfer from "./Transfer"
import Viewing from "./Viewing"

const NFTPanel = () => {
  const { chainId } = useWeb3Context()
  const { changeFromNetwork, changeToNetwork, promptMessage, updatePromptMessage } = useNFTBridgeStore()

  useEffect(() => {
    if (chainId && Object.values(ChainId).includes(chainId)) {
      const fromNetworkIndex = networks.findIndex(item => item.chainId === chainId)
      changeFromNetwork(networks[fromNetworkIndex])
      changeToNetwork(networks[+!fromNetworkIndex])
    } else if (chainId) {
      changeFromNetwork(networks[0])
      changeToNetwork(networks[1])
      switchNetwork(networks[0].chainId)
    } else {
      changeFromNetwork(networks[0])
      changeToNetwork(networks[1])
    }
  }, [chainId])

  const handleClearpromptMessage = () => {
    updatePromptMessage("")
  }
  return (
    <NFTBridgeProvider>
      <Container sx={{ display: "flex", gap: "1rem", my: "3rem", height: "85.5rem" }}>
        <Viewing></Viewing>
        <Transfer></Transfer>
        <CornerTip
          severity="error"
          open={!!promptMessage}
          onClose={handleClearpromptMessage}
          autoHideDuration={null}
          AlertProps={{
            onClose: handleClearpromptMessage,
          }}
        >
          {promptMessage}
        </CornerTip>
      </Container>
    </NFTBridgeProvider>
  )
}

export default NFTPanel
