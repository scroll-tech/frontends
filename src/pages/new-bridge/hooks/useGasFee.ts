import { getPublicClient } from "@wagmi/core"
import { useState } from "react"
import { useBlockNumber } from "wagmi"

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

  const [gasFee, setGasFee] = useState(BigInt(0))
  const [gasLimit, setGasLimit] = useState(BigInt(0))
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | null>(null)
  const [error, setError] = useState("")

  const calculateGasFee = async () => {
    let gasPrice
    // scroll not support EIP-1559

    if (fromNetwork.isL1) {
      const { maxFeePerGas } = await getPublicClient({ chainId: fromNetwork.chainId }).estimateFeesPerGas()
      gasPrice = maxFeePerGas as bigint
    } else {
      const { gasPrice: legacyGasPrice } = await getPublicClient({ chainId: fromNetwork.chainId }).estimateFeesPerGas({ type: "legacy" })
      gasPrice = legacyGasPrice as bigint
    }
    const limit = ((await estimateSend()) * BigInt(120)) / BigInt(100)
    const estimatedGasCost = BigInt(limit) * BigInt(gasPrice || 1e9)
    return { gasLimit: limit, gasFee: estimatedGasCost, gasPrice }
  }

  useBlockNumber({
    enabled: !!networksAndSigners[fromNetwork.chainId].provider,
    onBlock(blockNumber) {
      calculateGasFee()
        .then(value => {
          setGasFee(value.gasFee)
          setGasLimit(value.gasLimit)
          setMaxFeePerGas(value.gasPrice)
          setError("")
        })
        .catch(error => {
          setGasFee(BigInt(0))
          setGasLimit(BigInt(0))
          setMaxFeePerGas(null)
          setError(error.message)
        })
    },
  })
  return { gasLimit, gasFee, error, calculateGasFee, maxFeePerGas }
}

export default useGasFee
