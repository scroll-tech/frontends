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

  const [gasFee, setGasFee] = useState<null | bigint>(null)
  const [gasLimit, setGasLimit] = useState<null | bigint>(null)
  const [error, setError] = useState("")

  const calculateGasFee = async () => {
    const { maxFeePerGas, gasPrice: rawGasPrice } = await networksAndSigners[fromNetwork.chainId].provider.getFeeData()

    const estimateLimit = await estimateSend()
    if (estimateLimit === null) {
      return { gasLimit: null, gasFee: null }
    }

    const limit = (estimateLimit * BigInt(120)) / BigInt(100)
    // scroll not support EIP-1559
    const gasPrice = fromNetwork.isL1 ? maxFeePerGas : rawGasPrice
    const estimatedGasCost = BigInt(limit) * BigInt(gasPrice || 1e9)
    return { gasLimit: limit, gasFee: estimatedGasCost }
  }

  useBlockNumber({
    enabled: !!networksAndSigners[fromNetwork.chainId].provider && needApproval === false,
    onBlock(blockNumber) {
      calculateGasFee()
        .then(value => {
          setGasFee(value.gasFee)
          setGasLimit(value.gasLimit)
          setError("")
        })
        .catch(error => {
          setGasFee(null)
          setGasLimit(null)
          setError(error.message.split("(")[0].trim())
        })
    },
  })
  return { gasLimit, gasFee, error, calculateGasFee }
}

export default useGasFee
