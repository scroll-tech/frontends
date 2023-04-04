import { ethers } from "ethers"
import { useMemo } from "react"

import L1GasPriceOracle from "@/assets/abis/L1GasPriceOracle.json"
import L2GasPriceOracle from "@/assets/abis/L2GasPriceOracle.json"
import { ChainId, GasLimit } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useNFTBridgeStore from "@/stores/nftBridgeStore"
import { requireEnv } from "@/utils"

import useAsyncMemo from "./useAsyncMemo"

const L1_PRICE_ORACLE = requireEnv("REACT_APP_L2_GAS_PRICE_ORACLE")
const L2_PRICE_ORACLE = requireEnv("REACT_APP_L1_GAS_PRICE_ORACLE")

const useNFTGasFee = () => {
  const { checkConnectedChainId } = useWeb3Context()
  const { networksAndSigners } = useApp()
  const selectedTokenAmount = useNFTBridgeStore(state => state.selectedTokenAmount())

  const gasPrice = useAsyncMemo(async () => {
    let instance
    if (checkConnectedChainId(ChainId.SCROLL_LAYER_1) && networksAndSigners[ChainId.SCROLL_LAYER_1].signer) {
      instance = new ethers.Contract(L1_PRICE_ORACLE, L2GasPriceOracle, networksAndSigners[ChainId.SCROLL_LAYER_1].signer)
      return await instance.l2BaseFee()
    } else if (checkConnectedChainId(ChainId.SCROLL_LAYER_2) && networksAndSigners[ChainId.SCROLL_LAYER_2].signer) {
      instance = new ethers.Contract(L2_PRICE_ORACLE, L1GasPriceOracle, networksAndSigners[ChainId.SCROLL_LAYER_2].signer)
      return await instance.l1BaseFee()
    }
    return null
  }, [networksAndSigners, checkConnectedChainId])

  const gasLimit = useMemo(() => {
    return selectedTokenAmount * GasLimit.BASE_NFT
  }, [selectedTokenAmount])

  const gasFee = useMemo(() => {
    if (gasPrice) {
      return gasPrice.mul(gasLimit)
    }
    return null
  }, [gasLimit, gasPrice])

  return { gasLimit, gasFee }
}

export default useNFTGasFee
