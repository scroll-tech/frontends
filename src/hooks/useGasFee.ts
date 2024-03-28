import { getPublicClient } from "@wagmi/core"
import { useEffect, useState } from "react"
import { useBlockNumber } from "wagmi"

import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { config } from "@/contexts/RainbowProvider/configs"
import useBridgeStore from "@/stores/bridgeStore"
import { trimErrorMessage } from "@/utils"

import { useEstimateSendTransaction } from "./useEstimateSendTransaction"

const useGasFee = (selectedToken, needApproval) => {
  const { fromNetwork, toNetwork } = useBridgeStore()
  const { networksAndSigners } = useBridgeContext()
  const { estimateSend } = useEstimateSendTransaction({
    fromNetwork,
    toNetwork,
    selectedToken,
  })

  const [gasFee, setGasFee] = useState<bigint | null>(null)
  const [gasLimit, setGasLimit] = useState<bigint | null>(null)
  const [enlargedGasLimit, setEnlargedGasLimit] = useState<bigint | null>(null)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | null>(null)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | null>(null)
  const [error, setError] = useState("")

  const calculateGasFee = async () => {
    let gasPrice
    let priorityFee
    // scroll not support EIP-1559

    if (fromNetwork.isL1) {
      const { maxFeePerGas, maxPriorityFeePerGas } = await getPublicClient(config, { chainId: fromNetwork.chainId })!.estimateFeesPerGas()
      gasPrice = maxFeePerGas as bigint
      priorityFee = maxPriorityFeePerGas as bigint
    } else {
      const { gasPrice: legacyGasPrice } = await getPublicClient(config, { chainId: fromNetwork.chainId })!.estimateFeesPerGas({ type: "legacy" })
      gasPrice = legacyGasPrice as bigint
      priorityFee = null
    }
    const gasLimit = await estimateSend()
    if (gasLimit === null) {
      return {
        gasLimit: null,
        enlargedGasLimit: null,
        gasFee: null,
        gasPrice,
        maxPriorityFeePerGas: priorityFee,
      }
    }
    const estimatedGasCost = (gasLimit as bigint) * (gasPrice || BigInt(1e9))
    const enlargedGasLimit = (gasLimit * BigInt(120)) / BigInt(100)
    return {
      gasLimit,
      enlargedGasLimit,
      gasFee: estimatedGasCost,
      gasPrice,
      maxPriorityFeePerGas: priorityFee,
    }
  }

  const { data: blockNumber } = useBlockNumber({ watch: true })
  // enabled: !!networksAndSigners[fromNetwork.chainId].provider && needApproval === false,

  useEffect(() => {
    if (!!networksAndSigners[fromNetwork.chainId].provider && needApproval === false)
      calculateGasFee()
        .then(value => {
          setGasFee(value.gasFee)
          setGasLimit(value.gasLimit)
          setEnlargedGasLimit(value.enlargedGasLimit)
          setMaxFeePerGas(value.gasPrice)
          setMaxPriorityFeePerGas(value.maxPriorityFeePerGas)
          setError("")
        })
        .catch(error => {
          setGasFee(null)
          setGasLimit(null)
          setEnlargedGasLimit(null)
          setMaxFeePerGas(null)
          setMaxPriorityFeePerGas(null)
          setError(trimErrorMessage(error.message))
          throw error
        })
  }, [blockNumber, needApproval, networksAndSigners, fromNetwork.chainId])

  return { enlargedGasLimit, gasLimit, gasFee, error, calculateGasFee, maxFeePerGas, maxPriorityFeePerGas }
}

export default useGasFee
