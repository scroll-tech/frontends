import { getPublicClient } from "@wagmi/core"
import { useCallback, useEffect, useState } from "react"
import { useBlockNumber } from "wagmi"

// import { useBridgeContext } from "@/contexts/BridgeContextProvider"
// import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { config } from "@/contexts/RainbowProvider/configs"
import useBridgeStore from "@/stores/bridgeStore"
import { trimErrorMessage } from "@/utils"

import { useEstimateSendTransaction } from "./useEstimateSendTransaction"

const useGasFee = (selectedToken, needApproval) => {
  const { fromNetwork, toNetwork } = useBridgeStore()
  const { gasLimit: priceFeeGasLimit, gasPrice: priceFeeGasPrice } = usePriceFeeContext()

  const { estimateSend, instance } = useEstimateSendTransaction({
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

  const { data: blockNumber } = useBlockNumber({ watch: true })

  const calculateGasFee = useCallback(async () => {
    if (needApproval === false && instance && ((priceFeeGasPrice && priceFeeGasLimit) || !fromNetwork.isL1) && blockNumber) {
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
    return {
      gasLimit: null,
      enlargedGasLimit: null,
      gasFee: null,
      gasPrice: null,
      maxPriorityFeePerGas: null,
    }
  }, [blockNumber, needApproval, priceFeeGasPrice, priceFeeGasLimit, instance])

  useEffect(() => {
    calculateGasFee()
      .then(({ gasLimit, enlargedGasLimit, gasFee, gasPrice, maxPriorityFeePerGas }) => {
        setGasLimit(gasLimit)
        setEnlargedGasLimit(enlargedGasLimit)
        setGasFee(gasFee)
        setMaxFeePerGas(gasPrice)
        setMaxPriorityFeePerGas(maxPriorityFeePerGas)
        setError("")
      })
      .catch(error => {
        setGasLimit(null)
        setEnlargedGasLimit(null)
        setGasFee(null)
        setMaxFeePerGas(null)
        setMaxPriorityFeePerGas(null)
        setError(trimErrorMessage(error.message))
        throw error
      })
  }, [calculateGasFee])

  return { enlargedGasLimit, gasLimit, gasFee, error, calculateGasFee, maxFeePerGas, maxPriorityFeePerGas }
}

export default useGasFee
