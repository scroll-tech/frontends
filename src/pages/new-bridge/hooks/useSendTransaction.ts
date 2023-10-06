import { isError } from "ethers"
import { useMemo, useState } from "react"

import { CHAIN_ID, NETWORKS } from "@/constants"
import { TX_STATUS } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore, { TxDirection, TxPosition, isValidOffsetTime } from "@/stores/txStore"
import { amountToBN, sentryDebug } from "@/utils"

import useGasFee from "./useGasFee"

export function useSendTransaction(props) {
  const { amount: fromTokenAmount, selectedToken } = props
  const { walletCurrentAddress } = useRainbowContext()
  const { networksAndSigners, blockNumbers } = useApp()
  const { gasLimit: txGasLimit } = useGasFee(selectedToken)
  const { addTransaction, updateTransaction, addEstimatedTimeMap, updateOrderedTxs, addAbnormalTransactions, removeFrontTransactions } = useTxStore()
  const { fromNetwork, toNetwork, changeTxResult } = useBridgeStore()
  const { gasLimit, gasPrice } = usePriceFeeContext()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sendError, setSendError] = useState<any>()

  const parsedAmount = useMemo(() => {
    if (!fromTokenAmount || !selectedToken) return BigInt(0)
    return amountToBN(fromTokenAmount, selectedToken.decimals)
  }, [fromTokenAmount, selectedToken?.decimals])

  const send = async () => {
    setIsLoading(true)
    const txDirection = fromNetwork.isL1 ? TxDirection.Deposit : TxDirection.Withdraw
    let tx
    let currentBlockNumber
    try {
      if (fromNetwork.isL1) {
        currentBlockNumber = await networksAndSigners[CHAIN_ID.L1].provider.getBlockNumber()
        tx = await sendl1ToL2()
      } else if (!fromNetwork.isL1 && toNetwork.isL1) {
        currentBlockNumber = await networksAndSigners[CHAIN_ID.L2].provider.getBlockNumber()
        tx = await sendl2ToL1()
      }
      // start to check tx replacement from current block number
      // TODO: shouldn't add it here(by @ricmoo)
      tx = tx.replaceableTransaction(currentBlockNumber)

      handleTransaction(tx)
      updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Frontend, txDirection)
      tx.wait()
        .then(receipt => {
          if (receipt?.status === 1) {
            changeTxResult({ hash: tx.hash, amount: fromTokenAmount })

            handleTransaction(tx, {
              fromBlockNumber: receipt.blockNumber,
            })
            if (fromNetwork.isL1) {
              const estimatedOffsetTime = (receipt.blockNumber - blockNumbers[0]) * 12 * 1000
              if (isValidOffsetTime(estimatedOffsetTime)) {
                addEstimatedTimeMap(`from_${tx.hash}`, Date.now() + estimatedOffsetTime)
              } else {
                addEstimatedTimeMap(`from_${tx.hash}`, 0)
                sentryDebug(`safe block number: ${blockNumbers[0]}`)
              }
            }
          } else {
            const errorMessage = "due to any operation that can cause the transaction or top-level call to revert"
            setSendError({ code: 0, message: errorMessage })

            // Something failed in the EVM
            updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal, txDirection)
            // EIP-658
            markTransactionAbnormal(tx, TX_STATUS.failed, errorMessage)
          }
        })
        .catch(error => {
          // TRANSACTION_REPLACED or TIMEOUT
          sentryDebug(error.message)
          if (isError(error, "TRANSACTION_REPLACED")) {
            if (error.cancelled) {
              markTransactionAbnormal(tx, TX_STATUS.canceled, "transaction was cancelled")
              updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal, txDirection)
              setSendError("cancel")
            } else {
              const { blockNumber, hash: transactionHash } = error.receipt
              handleTransaction(tx, {
                fromBlockNumber: blockNumber,
                hash: transactionHash,
              })
              updateOrderedTxs(walletCurrentAddress, tx.hash, transactionHash, txDirection)
              if (fromNetwork.isL1) {
                const estimatedOffsetTime = (blockNumber - blockNumbers[0]) * 12 * 1000
                if (isValidOffsetTime(estimatedOffsetTime)) {
                  addEstimatedTimeMap(`from_${transactionHash}`, Date.now() + estimatedOffsetTime)
                } else {
                  addEstimatedTimeMap(`from_${transactionHash}`, 0)
                  sentryDebug(`safe block number: ${blockNumbers[0]}`)
                }
              }
            }
          } else {
            setSendError(error)
            // when the transaction execution failed (status is 0)
            updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal, txDirection)
            markTransactionAbnormal(tx, TX_STATUS.failed, error.message)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
      // reject && insufficient funds(send error)
      if (isError(error, "ACTION_REJECTED")) {
        setSendError("reject")
      } else {
        setSendError(error)
      }
    }
  }

  const handleTransaction = (tx, updateOpts?) => {
    if (updateOpts) {
      updateTransaction(tx.hash, updateOpts)
      return
    }
    addTransaction({
      hash: tx.hash,
      amount: parsedAmount.toString(),
      isL1: fromNetwork.name === NETWORKS[0].name,
      symbolToken: selectedToken.address,
      timestamp: Date.now(),
    })
  }

  const markTransactionAbnormal = (tx, assumedStatus, errMsg) => {
    addAbnormalTransactions(walletCurrentAddress, {
      hash: tx.hash,
      amount: parsedAmount.toString(),
      isL1: fromNetwork.name === NETWORKS[0].name,
      symbolToken: selectedToken.address,
      assumedStatus,
      errMsg,
    })
    removeFrontTransactions(tx.hash)
    updateTransaction(tx.hash, { assumedStatus })
  }

  const depositETH = async () => {
    const fee = gasPrice * gasLimit
    return networksAndSigners[CHAIN_ID.L1].gateway["depositETH(uint256,uint256)"](parsedAmount, gasLimit, {
      value: parsedAmount + fee,
    })
  }

  const depositERC20 = async () => {
    const fee = gasPrice * gasLimit
    return networksAndSigners[CHAIN_ID.L1].gateway["depositERC20(address,uint256,uint256)"](selectedToken.address, parsedAmount, gasLimit, {
      value: fee,
    })
  }

  const withdrawETH = async () => {
    return networksAndSigners[CHAIN_ID.L2].gateway["withdrawETH(uint256,uint256)"](parsedAmount, 0, {
      value: parsedAmount,
      gasLimit: txGasLimit,
    })
  }

  const withdrawERC20 = async () => {
    return networksAndSigners[CHAIN_ID.L2].gateway["withdrawERC20(address,uint256,uint256)"](selectedToken.address, parsedAmount, 0, {
      gasLimit: txGasLimit,
    })
  }

  const sendl1ToL2 = () => {
    if (selectedToken.native) {
      return depositETH()
    } else {
      return depositERC20()
    }
  }

  const sendl2ToL1 = () => {
    if (selectedToken.native) {
      return withdrawETH()
    } else {
      return withdrawERC20()
    }
  }

  return {
    send,
    isLoading,
    error: sendError,
  }
}
