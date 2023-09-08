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

  const calculateGasFee = async () => {
    const rawlimit = await estimateSend()
    const limit = (rawlimit * BigInt(120)) / BigInt(100)
    let gasPrice
    if (fromNetwork.isL1) {
      const { maxFeePerGas } = await getPublicClient({ chainId: fromNetwork.chainId }).estimateFeesPerGas()
      gasPrice = maxFeePerGas as bigint
    } else {
      const { gasPrice: legacyGasPrice } = await getPublicClient({ chainId: fromNetwork.chainId }).estimateFeesPerGas({ type: "legacy" })
      gasPrice = legacyGasPrice as bigint
    }
    const estimatedGasCost = BigInt(limit) * BigInt(gasPrice)
    console.log(gasPrice, limit, "gas price/limit")
    return { gasLimit: limit, gasFee: estimatedGasCost }
  }

  useBlockNumber({
    enabled: !!networksAndSigners[fromNetwork.chainId].provider,
    onBlock(blockNumber) {
      calculateGasFee()
        .then(value => {
          setGasFee(value.gasFee)
          setGasLimit(value.gasLimit)
        })
        .catch(error => {
          // console.log(error, "useGasFee limit error")
          setGasFee(BigInt(0))
          setGasLimit(BigInt(0))
        })
    },
  })
  return { gasLimit, gasFee }
}

export default useGasFee
