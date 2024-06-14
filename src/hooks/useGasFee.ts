import { getPublicClient } from "@wagmi/core"
import { isNumber } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { useBlockNumber } from "wagmi"

import { BATCH_DEPOSIT_TOKENS } from "@/constants"
// import { useBridgeContext } from "@/contexts/BridgeContextProvider"
// import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { config } from "@/contexts/RainbowProvider/configs"
import { DepositBatchMode } from "@/stores/batchBridgeStore"
import useBridgeStore from "@/stores/bridgeStore"
import { checkApproved, trimErrorMessage } from "@/utils"

import { useEstimateBatchDeposit } from "./useEstimateBatchDeposit"
import { useEstimateSendTransaction } from "./useEstimateSendTransaction"

const useGasFee = (selectedToken, needApproval) => {
  const { fromNetwork, toNetwork } = useBridgeStore()
  const { gasLimit: priceFeeGasLimit, gasPrice: priceFeeGasPrice } = usePriceFeeContext()

  const { estimateSend, instance } = useEstimateSendTransaction({
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

  const { data: blockNumber } = useBlockNumber({ watch: true })

  const calculateGasFee = useCallback(async () => {
    if (
      (needApproval === false || (isNumber(needApproval) && needApproval !== 3)) &&
      instance &&
      ((priceFeeGasPrice && priceFeeGasLimit) || !fromNetwork.isL1) &&
      blockNumber
    ) {
      let gasPrice
      let priorityFee
      let gasLimitBatch
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
      const gasLimit = checkApproved(needApproval, DepositBatchMode.Fast) ? await estimateSend() : BigInt(0)

      try {
        gasLimitBatch =
          checkApproved(needApproval, DepositBatchMode.Economy) && BATCH_DEPOSIT_TOKENS.includes(selectedToken.symbol)
            ? await estimateBatchDeposit()
            : BigInt(0)
      } catch (error) {
        gasLimitBatch = 100000n
      }

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
    return {
      gasLimit: null,
      gasLimitBatch: null,
      enlargedGasLimit: null,
      gasFee: null,
      batchDepositGasFee: null,
      gasPrice: null,
      maxPriorityFeePerGas: null,
    }
  }, [blockNumber, needApproval, priceFeeGasPrice, priceFeeGasLimit, instance])

  useEffect(() => {
    calculateGasFee()
      .then(({ gasLimit, enlargedGasLimit, gasFee, gasPrice, maxPriorityFeePerGas, batchDepositGasFee, gasLimitBatch }) => {
        setGasLimit(gasLimit)
        setGasLimitBatch(gasLimitBatch)
        setEnlargedGasLimit(enlargedGasLimit)
        setGasFee(gasFee)
        setBatchDepositGasFee(batchDepositGasFee)
        setMaxFeePerGas(gasPrice)
        setMaxPriorityFeePerGas(maxPriorityFeePerGas)
        setError("")
      })
      .catch(error => {
        setGasLimit(null)
        setGasLimitBatch(null)
        setEnlargedGasLimit(null)
        setGasFee(null)
        setBatchDepositGasFee(null)
        setMaxFeePerGas(null)
        setMaxPriorityFeePerGas(null)
        setError(trimErrorMessage(error.message))
        throw error
      })
  }, [calculateGasFee])

  return { enlargedGasLimit, gasLimit, gasLimitBatch, gasFee, error, calculateGasFee, maxFeePerGas, maxPriorityFeePerGas, batchDepositGasFee }
}

export default useGasFee
