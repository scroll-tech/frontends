import useSWR from "swr"

import { useApp } from "@/contexts/AppContextProvider"
import useBridgeStore from "@/stores/bridgeStore"

import { useEstimateSendTransaction } from "./useEstimateSendTransaction"

const useGasFee = selectedToken => {
  const { networksAndSigners } = useApp()
  const { fromNetwork, toNetwork } = useBridgeStore()
  const { estimateSend } = useEstimateSendTransaction({
    fromNetwork,
    toNetwork,
    selectedToken,
  })

  const calculateGasFee = async ({ provider }) => {
    const { maxFeePerGas: gasPrice } = await provider.getFeeData()

    const gasLimit = await estimateSend()
    const estimatedGasCost = BigInt(gasLimit) * BigInt(gasPrice || 1e9)
    return estimatedGasCost
  }
  const { data } = useSWR(
    () => {
      const provider = networksAndSigners[fromNetwork.chainId].provider
      if (provider) {
        return {
          provider,
        }
      }
      return null
    },
    calculateGasFee,
    {
      refreshInterval: 1e3,
    },
  )
  return data
}

export default useGasFee
