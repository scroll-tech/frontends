import { ethers } from "ethers"
import { createContext, useContext, useMemo } from "react"

import L1_ERC721 from "@/assets/abis/L1_ERC721.json"
import L1_ERC1155 from "@/assets/abis/L1_ERC1155.json"
import L2_ERC721 from "@/assets/abis/L2_ERC721.json"
import L2_ERC1155 from "@/assets/abis/L2_ERC1155.json"
import { ChainId, TOEKN_TYPE } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { useAsyncMemo } from "@/hooks"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { requireEnv } from "@/utils"

const GATEWAY_721_L1 = requireEnv("REACT_APP_L1_ERC721_GATEWAY_PROXY_ADDR")
const GATEWAY_721_L2 = requireEnv("REACT_APP_L2_ERC721_GATEWAY_PROXY_ADDR")

const GATEWAY_1155_L1 = requireEnv("REACT_APP_L1_ERC1155_GATEWAY_PROXY_ADDR")
const GATEWAY_1155_L2 = requireEnv("REACT_APP_L2_ERC1155_GATEWAY_PROXY_ADDR")

const NFTBridgeContext = createContext<any>({})

const NFTBridgeProvider = props => {
  const { children } = props
  const { provider, checkConnectedChainId } = useWeb3Context()

  const { contract } = useNFTBridgeStore()

  const isLayer1 = useMemo(() => checkConnectedChainId(ChainId.SCROLL_LAYER_1), [checkConnectedChainId])

  const tokenInstance = useAsyncMemo(async () => {
    if (provider) {
      const signer = await provider.getSigner(0)
      if (contract?.type === TOEKN_TYPE[721] && checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
        return new ethers.Contract(contract.l1 as string, L1_ERC721, signer)
      } else if (contract?.type === TOEKN_TYPE[721] && checkConnectedChainId(ChainId.SCROLL_LAYER_2)) {
        return new ethers.Contract(contract.l2 as string, L2_ERC721, signer)
      } else if (contract?.type === TOEKN_TYPE[1155] && checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
        return new ethers.Contract(contract.l1 as string, L1_ERC1155, signer)
      } else if (contract?.type === TOEKN_TYPE[1155] && checkConnectedChainId(ChainId.SCROLL_LAYER_2)) {
        return new ethers.Contract(contract.l2 as string, L2_ERC1155, signer)
      }
      return null
    }
    return null
  }, [provider, checkConnectedChainId, contract?.type])

  const gatewayAddress = useMemo(() => {
    if (contract?.type === TOEKN_TYPE[721] && checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
      return GATEWAY_721_L1
    } else if (contract?.type === TOEKN_TYPE[721] && checkConnectedChainId(ChainId.SCROLL_LAYER_2)) {
      return GATEWAY_721_L2
    } else if (contract?.type === TOEKN_TYPE[1155] && checkConnectedChainId(ChainId.SCROLL_LAYER_1)) {
      return GATEWAY_1155_L1
    } else if (contract?.type === TOEKN_TYPE[1155] && checkConnectedChainId(ChainId.SCROLL_LAYER_2)) {
      return GATEWAY_1155_L2
    }
    return ""
  }, [checkConnectedChainId, contract?.type])

  return <NFTBridgeContext.Provider value={{ tokenInstance, gatewayAddress, isLayer1 }}>{children}</NFTBridgeContext.Provider>
}

export function useNFTBridgeContext() {
  const ctx = useContext(NFTBridgeContext)
  if (ctx === undefined) {
    throw new Error("useNFTBridgeContext must be used within Web3Provider")
  }
  return ctx
}

export default NFTBridgeProvider
