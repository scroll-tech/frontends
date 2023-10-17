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
  const [error, setError] = useState("")

  const calculateGasFee = async () => {
    const { maxFeePerGas, gasPrice: rawGasPrice } = await networksAndSigners[fromNetwork.chainId].provider.getFeeData()
    const limit = ((await estimateSend()) * BigInt(120)) / BigInt(100)
    // scroll not support EIP-1559
    const gasPrice = fromNetwork.isL1 ? maxFeePerGas : rawGasPrice
    const estimatedGasCost = BigInt(limit) * BigInt(gasPrice || 1e9)
    return { gasLimit: limit, gasFee: estimatedGasCost }
  }

  useBlockNumber({
    enabled: !!networksAndSigners[fromNetwork.chainId].provider,
    onBlock(blockNumber) {
      calculateGasFee()
        .then(value => {
          setGasFee(value.gasFee)
          setGasLimit(value.gasLimit)
          setError("")
        })
        .catch(error => {
          setGasFee(BigInt(0))
          setGasLimit(BigInt(0))
          setError(error.message)
        })
    },
  })
  return { gasLimit, gasFee, error, calculateGasFee }
}

export default useGasFee
