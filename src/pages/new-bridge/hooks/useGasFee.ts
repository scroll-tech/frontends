import { getPublicClient } from "@wagmi/core"
import { useState } from "react"
import { useBlockNumber } from "wagmi"

import { useApp } from "@/contexts/AppContextProvider"
import useBridgeStore from "@/stores/bridgeStore"

import { useEstimateSendTransaction } from "./useEstimateSendTransaction"

const useGasFee = (selectedToken, needApproval) => {
  const { networksAndSigners } = useApp()
  const { fromNetwork, toNetwork } = useBridgeStore()
  const { estimateSend } = useEstimateSendTransaction({
    fromNetwork,
    toNetwork,
    selectedToken,
  })

  const [gasFee, setGasFee] = useState<bigint | null>(null)
  const [displayedGasFee, setDisplayedGasFee] = useState<bigint | null>(null)
  const [gasLimit, setGasLimit] = useState<bigint | null>(null)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | null>(null)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | null>(null)
  const [error, setError] = useState("")

  const calculateGasFee = async () => {
    let gasPrice
    let priorityFee
    // scroll not support EIP-1559

    if (fromNetwork.isL1) {
      const { maxFeePerGas, maxPriorityFeePerGas } = await getPublicClient({ chainId: fromNetwork.chainId }).estimateFeesPerGas()
      gasPrice = maxFeePerGas as bigint
      priorityFee = maxPriorityFeePerGas as bigint
    } else {
      const { gasPrice: legacyGasPrice } = await getPublicClient({ chainId: fromNetwork.chainId }).estimateFeesPerGas({ type: "legacy" })
      gasPrice = legacyGasPrice as bigint
      priorityFee = null
    }

    const estimatedGasLimit = await estimateSend()
    if (estimatedGasLimit === null) {
      return {
        gasLimit: null,
        gasFee: null,
        gasPrice,
        maxPriorityFeePerGas: priorityFee,
        displayedGasFee: null,
      }
    }
    const enlargedGasLimit = (estimatedGasLimit * BigInt(120)) / BigInt(100)
    const displayedGasPrice = await getPublicClient({ chainId: fromNetwork.chainId }).getGasPrice()
    const estimatedGasCost = enlargedGasLimit * (gasPrice || BigInt(1e9))
    const displayedEstimatedGasCost = estimatedGasLimit * (displayedGasPrice || BigInt(1e9))
    return {
      gasLimit: enlargedGasLimit,
      gasFee: estimatedGasCost,
      gasPrice,
      maxPriorityFeePerGas: priorityFee,
      displayedGasFee: displayedEstimatedGasCost,
    }
  }

  useBlockNumber({
    enabled: !!networksAndSigners[fromNetwork.chainId].provider && needApproval === false,
    onBlock(blockNumber) {
      calculateGasFee()
        .then(value => {
          setGasFee(value.gasFee)
          setDisplayedGasFee(value.displayedGasFee)
          setGasLimit(value.gasLimit)
          setMaxFeePerGas(value.gasPrice)
          setMaxPriorityFeePerGas(value.maxPriorityFeePerGas)
          setError("")
        })
        .catch(error => {
          setGasFee(null)
          setDisplayedGasFee(null)
          setGasLimit(null)
          setMaxFeePerGas(null)
          setMaxPriorityFeePerGas(null)
          setError(error.message.split("(")[0].trim())
        })
    },
  })
  return { gasLimit, gasFee, error, calculateGasFee, maxFeePerGas, maxPriorityFeePerGas, displayedGasFee }
}

export default useGasFee
