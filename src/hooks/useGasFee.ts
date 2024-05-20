import { getPublicClient } from "@wagmi/core"
import { isNumber } from "lodash"
import { useState } from "react"
import { useBlockNumber } from "wagmi"

import { BATCH_DEPOSIT_TOKENS } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { DepositBatchMode } from "@/stores/batchBridgeStore"
import useBridgeStore from "@/stores/bridgeStore"
import { checkApproved, trimErrorMessage } from "@/utils"

import { useEstimateBatchDeposit } from "./useEstimateBatchDeposit"
import { useEstimateSendTransaction } from "./useEstimateSendTransaction"

const useGasFee = (selectedToken, needApproval) => {
  const { networksAndSigners } = useBridgeContext()
  const { fromNetwork, toNetwork } = useBridgeStore()
  const { estimateSend } = useEstimateSendTransaction({
    fromNetwork,
    toNetwork,
    selectedToken,
  })

  const { estimateSend: estimateBatchDeposit } = useEstimateBatchDeposit({
    fromNetwork,
    toNetwork,
    selectedToken,
  })

  const [gasFee, setGasFee] = useState<bigint | null>(null)
  const [batchDepositGasFee, setBatchDepositGasFee] = useState<bigint | null>(null)
  const [gasLimit, setGasLimit] = useState<bigint | null>(null)
  const [gasLimitBatch, setGasLimitBatch] = useState<bigint | null>(null)
  const [enlargedGasLimit, setEnlargedGasLimit] = useState<bigint | null>(null)
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
    const gasLimit = checkApproved(needApproval, DepositBatchMode.Fast) ? await estimateSend() : BigInt(0)

    const gasLimitBatch =
      checkApproved(needApproval, DepositBatchMode.Economy) && BATCH_DEPOSIT_TOKENS.includes(selectedToken.symbol)
        ? await estimateBatchDeposit()
        : BigInt(0)

    console.log("gasLimit/gasLimitBatch", gasLimit, gasLimitBatch)

    if (gasLimit === null) {
      return {
        gasLimit: null,
        gasLimitBatch: null,
        batchDepositGasFee: null,
        enlargedGasLimit: null,
        gasFee: null,
        gasPrice,
        maxPriorityFeePerGas: priorityFee,
      }
    }
    const estimatedGasCost = (gasLimit as bigint) * (gasPrice || BigInt(1e9))
    const estimatedBatchDepositGasCost = (gasLimitBatch as bigint) * (gasPrice || BigInt(1e9))
    const enlargedGasLimit = (gasLimit * BigInt(120)) / BigInt(100)
    return {
      gasLimit,
      gasLimitBatch,
      enlargedGasLimit,
      gasFee: estimatedGasCost,
      batchDepositGasFee: estimatedBatchDepositGasCost,
      gasPrice,
      maxPriorityFeePerGas: priorityFee,
    }
  }

  useBlockNumber({
    enabled: !!networksAndSigners[fromNetwork.chainId].provider && (needApproval === false || (isNumber(needApproval) && needApproval !== 3)),
    onBlock(blockNumber) {
      calculateGasFee()
        .then(value => {
          setGasFee(value.gasFee)
          setBatchDepositGasFee(value.batchDepositGasFee)
          setGasLimit(value.gasLimit)
          setGasLimitBatch(value.gasLimitBatch)
          setEnlargedGasLimit(value.enlargedGasLimit)
          setMaxFeePerGas(value.gasPrice)
          setMaxPriorityFeePerGas(value.maxPriorityFeePerGas)
          setError("")
        })
        .catch(error => {
          setGasFee(null)
          setBatchDepositGasFee(null)
          setGasLimit(null)
          setGasLimitBatch(null)
          setEnlargedGasLimit(null)
          setMaxFeePerGas(null)
          setMaxPriorityFeePerGas(null)
          setError(trimErrorMessage(error.message))
        })
    },
  })
  return { enlargedGasLimit, gasLimit, gasLimitBatch, gasFee, error, calculateGasFee, maxFeePerGas, maxPriorityFeePerGas, batchDepositGasFee }
}

export default useGasFee
