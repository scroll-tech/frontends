import { isError } from "ethers"
import { useMemo, useState } from "react"

import { BATCH_BRIDGE_GATEWAY_PROXY_ADDR, CHAIN_ID, NETWORKS, SCROLL_MESSENGER_ADDR, TX_STATUS } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBatchBridgeStore, { BridgeSummaryType, DepositBatchMode } from "@/stores/batchBridgeStore"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore from "@/stores/txStore"
import { isValidOffsetTime } from "@/stores/utils"
import { amountToBN, isSepolia, sentryDebug } from "@/utils"

import useGasFee from "./useGasFee"

type TxOptions = {
  value: bigint
  maxFeePerGas?: bigint | null
  maxPriorityFeePerGas?: bigint | null
  gasLimit?: number | null
}

const LOWER_BOUND = 1e5

export function useSendTransaction(props) {
  const { amount: fromTokenAmount, selectedToken, receiver, needApproval } = props
  const { walletCurrentAddress, provider } = useRainbowContext()
  const { networksAndSigners, blockNumbers } = useBridgeContext()
  const { enlargedGasLimit: txGasLimit, maxFeePerGas, maxPriorityFeePerGas, gasLimitBatch } = useGasFee(selectedToken, needApproval)
  const { addTransaction, addEstimatedTimeMap, removeFrontTransactions, updateTransaction } = useTxStore()
  const { fromNetwork, toNetwork, changeTxResult, changeWithdrawStep } = useBridgeStore()
  const { bridgeSummaryType, depositBatchMode, batchDepositConfig } = useBatchBridgeStore()

  const { gasLimit, gasPrice } = usePriceFeeContext()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sendError, setSendError] = useState<any>()

  const parsedAmount = useMemo(() => {
    if (!fromTokenAmount || !selectedToken) return BigInt(0)
    return amountToBN(fromTokenAmount, selectedToken.decimals)
  }, [fromTokenAmount, selectedToken?.decimals])

  const checkIsContract = async contractAddress => {
    if (!provider) throw new Error("provider is not defined")
    const code = await provider.getCode(contractAddress)
    if (code === "0x") throw new Error("You are connected to the wrong network. Please switch to the correct network and refresh.")
  }

  const send = async () => {
    setIsLoading(true)
    let tx
    const isBatchMode = bridgeSummaryType === BridgeSummaryType.Selector && depositBatchMode === DepositBatchMode.Economy
    // let currentBlockNumber
    try {
      if (isBatchMode) {
        // currentBlockNumber = await networksAndSigners[CHAIN_ID.L1].provider.getBlockNumber()
        tx = await batchSendL1ToL2()
      } else if (fromNetwork.isL1) {
        // currentBlockNumber = await networksAndSigners[CHAIN_ID.L1].provider.getBlockNumber()
        tx = await sendl1ToL2()
      } else if (!fromNetwork.isL1 && toNetwork.isL1) {
        // currentBlockNumber = await networksAndSigners[CHAIN_ID.L2].provider.getBlockNumber()
        tx = await sendl2ToL1()
      }

      // start to check tx replacement from current block number
      // TODO: shouldn't add it here(by @ricmoo)
      // tx = tx.replaceableTransaction(currentBlockNumber)

      handleTransaction(tx)
      tx.wait()
        .then(receipt => {
          if (receipt?.status === 1) {
            changeTxResult({ code: 1 })
            if (!tx.isL1) {
              changeWithdrawStep("2")
            }
            handleTransaction(tx, {
              fromBlockNumber: receipt.blockNumber,
            })
            if (fromNetwork.isL1) {
              const estimatedOffsetTime = isBatchMode
                ? (receipt.blockNumber - blockNumbers[0]) * 12 * 1000 + 1000 * 60 * 10
                : (receipt.blockNumber - blockNumbers[0]) * 12 * 1000
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
            // EIP-658
            removeFrontTransactions(tx.hash)
          }
        })
        .catch(error => {
          // TRANSACTION_REPLACED or TIMEOUT
          sentryDebug(error.message)
          if (isError(error, "TRANSACTION_REPLACED")) {
            if (error.cancelled) {
              removeFrontTransactions(tx.hash)
              setSendError("cancel")
            } else {
              const { blockNumber, hash: transactionHash } = error.receipt
              handleTransaction(tx, {
                fromBlockNumber: blockNumber,
                hash: transactionHash,
              })
              if (fromNetwork.isL1) {
                const estimatedOffsetTime = isBatchMode
                  ? (blockNumber - blockNumbers[0]) * 12 * 1000 + 1000 * 60 * 10
                  : (blockNumber - blockNumbers[0]) * 12 * 1000
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
            removeFrontTransactions(tx.hash)
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
        console.log(error, "error")
        setSendError(error)
      }
    }
  }

  const handleTransaction = (tx, updateOpts?) => {
    if (updateOpts) {
      updateTransaction(walletCurrentAddress, tx.hash, updateOpts)
      return
    }
    addTransaction(walletCurrentAddress, {
      hash: tx.hash,
      amount: parsedAmount.toString(),
      isL1: fromNetwork.name === NETWORKS[0].name,
      symbolToken: selectedToken.address,
      timestamp: Date.now(),
      initiatedAt: Math.floor(new Date().getTime() / 1000),
      txStatus: TX_STATUS.Unknown,
    })
  }

  const depositETH = async () => {
    const fee = gasPrice * gasLimit
    const options: TxOptions = {
      value: parsedAmount + fee,
    }

    // set maxFeePerGas for testnet
    if (maxFeePerGas && maxPriorityFeePerGas && isSepolia) {
      options.maxFeePerGas = maxFeePerGas
      options.maxPriorityFeePerGas = maxPriorityFeePerGas
    }

    return networksAndSigners[CHAIN_ID.L1].scrollMessenger["sendMessage(address,uint256,bytes,uint256)"](
      receiver || walletCurrentAddress,
      parsedAmount,
      "0x",
      gasLimit,
      options,
    )
  }

  const depositERC20 = async () => {
    const fee = gasPrice * gasLimit
    const options: TxOptions = {
      value: fee,
    }

    if (maxFeePerGas && maxPriorityFeePerGas && isSepolia) {
      options.maxFeePerGas = maxFeePerGas
      options.maxPriorityFeePerGas = maxPriorityFeePerGas
    }

    if (receiver) {
      return networksAndSigners[CHAIN_ID.L1].gateway["depositERC20(address,address,uint256,uint256)"](
        selectedToken.address,
        receiver,
        parsedAmount,
        gasLimit,
        options,
      )
    }

    return networksAndSigners[CHAIN_ID.L1].gateway["depositERC20(address,uint256,uint256)"](selectedToken.address, parsedAmount, gasLimit, options)
  }

  const withdrawETH = async () => {
    await checkIsContract(SCROLL_MESSENGER_ADDR[CHAIN_ID.L2])

    return networksAndSigners[CHAIN_ID.L2].scrollMessenger["sendMessage(address,uint256,bytes,uint256)"](
      receiver || walletCurrentAddress,
      parsedAmount,
      "0x",
      0,
      {
        value: parsedAmount,
        gasLimit: txGasLimit,
      },
    )
  }

  const withdrawERC20 = async () => {
    if (receiver) {
      return networksAndSigners[CHAIN_ID.L2].gateway["withdrawERC20(address,address,uint256,uint256)"](
        selectedToken.address,
        receiver,
        parsedAmount,
        0,
        {
          gasLimit: txGasLimit,
        },
      )
    }
    return networksAndSigners[CHAIN_ID.L2].gateway["withdrawERC20(address,uint256,uint256)"](selectedToken.address, parsedAmount, 0, {
      gasLimit: txGasLimit,
    })
  }

  const batchDepositETH = async () => {
    await checkIsContract(BATCH_BRIDGE_GATEWAY_PROXY_ADDR[CHAIN_ID.L1])

    const options: TxOptions = {
      value: parsedAmount + batchDepositConfig.feeAmountPerTx,
      gasLimit: Math.max(Number(gasLimitBatch), LOWER_BOUND),
    }

    return networksAndSigners[CHAIN_ID.L1].batchBridgeGateway.depositETH(options)
  }

  const batchDepositERC20 = async () => {
    // const options: TxOptions = {
    //   value: batchDepositConfig.feeAmountPerTx,
    // }
    return networksAndSigners[CHAIN_ID.L1].batchBridgeGateway.depositERC20(selectedToken.address, parsedAmount + batchDepositConfig.feeAmountPerTx)
  }

  const batchSendL1ToL2 = () => {
    if (selectedToken.native) {
      return batchDepositETH()
    } else {
      return batchDepositERC20()
    }
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
