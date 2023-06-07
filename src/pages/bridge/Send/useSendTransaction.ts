import { isError } from "ethers"
import { useMemo, useState } from "react"

import { ChainId, GasLimit, networks } from "@/constants"
import { TxStatus } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { usePriceFee } from "@/hooks"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore, { TxPosition, isValidOffsetTime } from "@/stores/txStore"
import { amountToBN, sentryDebug } from "@/utils"
import logger from "@/utils/logger"

export type TransactionHandled = {
  transaction: any
  txModel: any
}

export function useSendTransaction(props) {
  const { fromNetwork, fromTokenAmount, setError, setSendError, toNetwork, selectedToken } = props
  const {
    networksAndSigners,
    txHistory: { blockNumbers },
  } = useApp()
  const { addTransaction, updateTransaction, addEstimatedTimeMap, updateOrderedTxs, addAbnormalTransactions, removeFrontTransactions } = useTxStore()
  const { changeHistoryVisible } = useBridgeStore()
  const [sending, setSending] = useState<boolean>(false)
  const { checkConnectedChainId } = useWeb3Context()
  const { getPriceFee } = usePriceFee()

  const parsedAmount = useMemo(() => {
    if (!fromTokenAmount || !selectedToken) return BigInt(0)
    return amountToBN(fromTokenAmount, selectedToken.decimals)
  }, [fromTokenAmount, selectedToken?.decimals])

  const send = async () => {
    try {
      setError(null)

      const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
      if (!isNetworkConnected) return
      setSending(true)
      let tx, currentBlockNumber
      try {
        if (fromNetwork.isLayer1) {
          currentBlockNumber = await networksAndSigners[ChainId.SCROLL_LAYER_1].provider.getBlockNumber()
          tx = await sendl1ToL2()
        } else if (!fromNetwork.isLayer1 && toNetwork.isLayer1) {
          currentBlockNumber = await networksAndSigners[ChainId.SCROLL_LAYER_2].provider.getBlockNumber()
          tx = await sendl2ToL1()
        }
        // start to check tx replacement from current block number
        tx = tx.replaceableTransaction(currentBlockNumber)

        setSending(false)
        changeHistoryVisible(true)
        handleTransaction(tx)
        updateOrderedTxs(tx.hash, TxPosition.Frontend)
        tx.wait()
          .then(receipt => {
            console.log(receipt, "receipt")
            if (receipt?.status === 1) {
              handleTransaction(tx, {
                fromBlockNumber: receipt.blockNumber,
              })
              if (fromNetwork.isLayer1) {
                const estimatedOffsetTime = (receipt.blockNumber - blockNumbers[0]) * 12 * 1000
                if (isValidOffsetTime(estimatedOffsetTime)) {
                  addEstimatedTimeMap(`from_${tx.hash}`, Date.now() + estimatedOffsetTime)
                } else {
                  addEstimatedTimeMap(`from_${tx.hash}`, 0)
                  sentryDebug(`safe block number: ${blockNumbers[0]}`)
                }
              }
            }
          })
          .catch(error => {
            console.log(error, "replaced tx")
            sentryDebug(error.message)
            if (isError(error, "TRANSACTION_REPLACED")) {
              if (error.cancelled) {
                markTransactionAbnormal(tx, TxStatus.canceled, error.message)
                updateOrderedTxs(tx.hash, TxPosition.Abnormal)
              } else {
                const { blockNumber, hash: transactionHash } = error.receipt
                handleTransaction(tx, {
                  fromBlockNumber: blockNumber,
                  hash: transactionHash,
                })
                updateOrderedTxs(tx.hash, transactionHash)
                if (fromNetwork.isLayer1) {
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
              updateOrderedTxs(tx.hash, TxPosition.Abnormal)
              markTransactionAbnormal(tx, TxStatus.failed, error.message)
            }
          })
      } catch (error) {
        // reject && insufficient funds
        setSendError(error)
        setSending(false)
      }
    } catch (err) {
      // TODO: removed
      if (!/cancelled/gi.test(err.message)) {
        setError(err)
      } else {
        setError("cancel")
      }
      logger.error(err)
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
      isL1: fromNetwork.name === networks[0].name,
      symbolToken: selectedToken.address,
      timestamp: Date.now(),
    })
  }

  const markTransactionAbnormal = (tx, assumedStatus, errMsg) => {
    addAbnormalTransactions({
      hash: tx.hash,
      fromName: fromNetwork.name,
      toName: toNetwork.name,
      fromExplore: fromNetwork.explorer,
      toExplore: toNetwork.explorer,
      amount: parsedAmount.toString(),
      isL1: fromNetwork.name === networks[0].name,
      symbolToken: selectedToken.address,
      assumedStatus,
      errMsg,
    })
    removeFrontTransactions(tx.hash)
    updateTransaction(tx.hash, { assumedStatus })
  }

  const depositETH = async () => {
    const fee = await getPriceFee(selectedToken, fromNetwork.isLayer1)
    return networksAndSigners[ChainId.SCROLL_LAYER_1].gateway["depositETH(uint256,uint256)"](parsedAmount, GasLimit.DEPOSIT_ETH, {
      value: parsedAmount + fee,
    })
  }

  const depositERC20 = async () => {
    const fee = await getPriceFee(selectedToken, fromNetwork.isLayer1)
    return networksAndSigners[ChainId.SCROLL_LAYER_1].gateway["depositERC20(address,uint256,uint256)"](
      selectedToken.address,
      parsedAmount,
      GasLimit.DEPOSIT_ERC20,
      {
        value: fee,
      },
    )
  }

  const withdrawETH = async () => {
    const fee = await getPriceFee(selectedToken)
    return networksAndSigners[ChainId.SCROLL_LAYER_2].gateway["withdrawETH(uint256,uint256)"](parsedAmount, GasLimit.WITHDRAW_ETH, {
      value: parsedAmount + fee,
    })
  }

  const withdrawERC20 = async () => {
    const fee = await getPriceFee(selectedToken)
    return networksAndSigners[ChainId.SCROLL_LAYER_2].gateway["withdrawERC20(address,uint256,uint256)"](
      selectedToken.address,
      parsedAmount,
      GasLimit.WITHDRAW_ERC20,
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
    setSending,
  }
}
