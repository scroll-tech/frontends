import { isError } from "ethers"
import { useMemo, useState } from "react"

import { CHAIN_ID, GAS_LIMIT, NETWORKS } from "@/constants"
import { TX_STATUS } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { usePriceFee } from "@/hooks"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore, { TxPosition, isValidOffsetTime } from "@/stores/txStore"
import { amountToBN, sentryDebug } from "@/utils"

export type TransactionHandled = {
  transaction: any
  txModel: any
}

export function useSendTransaction(props) {
  const { fromNetwork, fromTokenAmount, setSendError, toNetwork, selectedToken } = props
  const { walletCurrentAddress } = useRainbowContext()
  const {
    networksAndSigners,
    txHistory: { blockNumbers },
  } = useApp()
  const { addTransaction, updateTransaction, addEstimatedTimeMap, updateOrderedTxs, addAbnormalTransactions, removeFrontTransactions } = useTxStore()
  const { changeHistoryVisible } = useBridgeStore()
  const [sending, setSending] = useState<boolean>(false)
  const { getPriceFee } = usePriceFee()

  const parsedAmount = useMemo(() => {
    if (!fromTokenAmount || !selectedToken) return BigInt(0)
    return amountToBN(fromTokenAmount, selectedToken.decimals)
  }, [fromTokenAmount, selectedToken?.decimals])

  const send = async () => {
    setSending(true)
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
      changeHistoryVisible(true)
      handleTransaction(tx)
      updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Frontend)
      tx.wait()
        .then(receipt => {
          if (receipt?.status === 1) {
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
            // Something failed in the EVM
            updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal)
            // EIP-658
            markTransactionAbnormal(tx, TX_STATUS.failed, "due to any operation that can cause the transaction or top-level call to revert")
          }
        })
        .catch(error => {
          // TRANSACTION_REPLACED or TIMEOUT
          sentryDebug(error.message)
          if (isError(error, "TRANSACTION_REPLACED")) {
            if (error.cancelled) {
              markTransactionAbnormal(tx, TX_STATUS.canceled, "transaction was cancelled")
              updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal)
              setSendError("cancel")
            } else {
              const { blockNumber, hash: transactionHash } = error.receipt
              handleTransaction(tx, {
                fromBlockNumber: blockNumber,
                hash: transactionHash,
              })
              updateOrderedTxs(walletCurrentAddress, tx.hash, transactionHash)
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
            // when the transaction execution failed (status is 0)
            updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal)
            markTransactionAbnormal(tx, TX_STATUS.failed, error.message)
          }
        })
        .finally(() => {
          setSending(false)
        })
    } catch (error) {
      setSending(false)
      // reject && insufficient funds(send error)
      if (!isError(error, "ACTION_REJECTED")) {
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
      fromName: fromNetwork.name,
      toName: toNetwork.name,
      fromExplore: fromNetwork.explorer,
      toExplore: toNetwork.explorer,
      amount: parsedAmount.toString(),
      isL1: fromNetwork.name === NETWORKS[0].name,
      symbolToken: selectedToken.address,
      timestamp: Date.now(),
    })
  }

  const markTransactionAbnormal = (tx, assumedStatus, errMsg) => {
    addAbnormalTransactions(walletCurrentAddress, {
      hash: tx.hash,
      fromName: fromNetwork.name,
      toName: toNetwork.name,
      fromExplore: fromNetwork.explorer,
      toExplore: toNetwork.explorer,
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
    const fee = await getPriceFee(selectedToken, fromNetwork.isL1)
    return networksAndSigners[CHAIN_ID.L1].gateway["depositETH(uint256,uint256)"](parsedAmount, GAS_LIMIT.DEPOSIT_ETH, {
      value: parsedAmount + fee,
    })
  }

  const depositERC20 = async () => {
    const fee = await getPriceFee(selectedToken, fromNetwork.isL1)
    return networksAndSigners[CHAIN_ID.L1].gateway["depositERC20(address,uint256,uint256)"](
      selectedToken.address,
      parsedAmount,
      GAS_LIMIT.DEPOSIT_ERC20,
      {
        value: fee,
      },
    )
  }

  const withdrawETH = async () => {
    const fee = await getPriceFee(selectedToken)
    return networksAndSigners[CHAIN_ID.L2].gateway["withdrawETH(uint256,uint256)"](parsedAmount, GAS_LIMIT.WITHDRAW_ETH, {
      value: parsedAmount + fee,
    })
  }

  const withdrawERC20 = async () => {
    const fee = await getPriceFee(selectedToken)
    return networksAndSigners[CHAIN_ID.L2].gateway["withdrawERC20(address,uint256,uint256)"](
      selectedToken.address,
      parsedAmount,
      GAS_LIMIT.WITHDRAW_ERC20,
      {
        value: fee,
      },
    )
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
    sending,
  }
}
