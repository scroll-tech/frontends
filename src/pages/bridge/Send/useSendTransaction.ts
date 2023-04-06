// import { HopBridge } from '@hop-protocol/sdk'
import { BigNumber } from "ethers"
import { useMemo, useState } from "react"

import { ChainId, GasLimit, networks } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { usePriceFee } from "@/hooks"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore from "@/stores/txStore"
import { amountToBN } from "@/utils"
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
  const { addTransaction, updateTransaction, addEstimatedTimeMap } = useTxStore()
  const { changeRecentTxVisible } = useBridgeStore()
  const [sending, setSending] = useState<boolean>(false)
  const { checkConnectedChainId } = useWeb3Context()
  const { getPriceFee } = usePriceFee()

  const parsedAmount = useMemo(() => {
    if (!fromTokenAmount || !selectedToken) return BigNumber.from(0)
    return amountToBN(fromTokenAmount, selectedToken.decimals)
  }, [fromTokenAmount, selectedToken?.decimals])

  const send = async () => {
    try {
      setError(null)

      const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
      if (!isNetworkConnected) return
      setSending(true)
      let tx
      try {
        if (fromNetwork.isLayer1) {
          tx = await sendl1ToL2()
        } else if (!fromNetwork.isLayer1 && toNetwork.isLayer1) {
          tx = await sendl2ToL1()
        }
        setSending(false)
        changeRecentTxVisible(true)
        handleTransaction(tx)
        const txResult = await tx.wait()
        handleTransaction(tx, {
          fromBlockNumber: txResult.blockNumber,
        })
        addEstimatedTimeMap(`from_${tx.hash}`, fromNetwork.isLayer1 ? Date.now() + (txResult.blockNumber - blockNumbers[0]) * 12 * 1000 : undefined)
      } catch (error) {
        console.log(error)
        setSendError(error)
        setSending(false)
      }
    } catch (err) {
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
      updateTransaction(tx, updateOpts)
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
    })
  }

  const depositETH = async () => {
    const fee = await getPriceFee(selectedToken, fromNetwork.isLayer1)
    return networksAndSigners[ChainId.SCROLL_LAYER_1].gateway["depositETH(uint256,uint256)"](parsedAmount, GasLimit.DEPOSIT_ETH, {
      value: parsedAmount.add(fee),
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
      value: parsedAmount.add(fee),
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
