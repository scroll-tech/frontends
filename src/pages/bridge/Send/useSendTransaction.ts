// import { HopBridge } from '@hop-protocol/sdk'
import { BigNumber, ethers } from "ethers"
import { useMemo, useState } from "react"

import L1GasPriceOracle from "@/assets/abis/L1GasPriceOracle.json"
import L2GasPriceOracle from "@/assets/abis/L2GasPriceOracle.json"
import { ChainId, networks } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore from "@/stores/txStore"
import { amountToBN } from "@/utils"
import { requireEnv } from "@/utils"
import logger from "@/utils/logger"

export type TransactionHandled = {
  transaction: any
  txModel: any
}

export enum ChainIdEnum {
  GOERLI = 5,
  SCROLL_ALPHA = 534353,
}

const gasLimit = 40000

export function useSendTransaction(props) {
  const { fromNetwork, fromTokenAmount, setError, setSendError, toNetwork, selectedToken } = props

  const { networksAndSigners } = useApp()
  const { addTransaction, updateTransaction } = useTxStore()
  const { changeRecentTxVisible } = useBridgeStore()
  const [sending, setSending] = useState<boolean>(false)
  const { checkConnectedChainId } = useWeb3Context()
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
      amount: fromTokenAmount,
      isL1: fromNetwork.name === networks[0].name,
      symbolToken: selectedToken.address,
    })
  }

  const depositETH = async () => {
    const fee = await getL1Fee()
    if (ChainId.SCROLL_LAYER_1 === ChainIdEnum.GOERLI) {
      return networksAndSigners[ChainId.SCROLL_LAYER_1].gateway["depositETH(uint256,uint256)"](parsedAmount, gasLimit, {
        value: BigNumber.from(parsedAmount.toString()).add(BigNumber.from(fee.toString())),
      })
    }
    return networksAndSigners[ChainId.SCROLL_LAYER_1].gateway["depositETH(uint256)"](gasLimit, {
      value: parsedAmount,
    })
  }

  const withdrawETH = async () => {
    const fee = await getL2Fee()
    if (ChainId.SCROLL_LAYER_2 === ChainIdEnum.SCROLL_ALPHA) {
      return networksAndSigners[ChainId.SCROLL_LAYER_2].gateway["withdrawETH(uint256,uint256)"](parsedAmount, gasLimit, {
        value: BigNumber.from(parsedAmount.toString()).add(BigNumber.from(fee.toString())),
        // gasPrice,
      })
    }
    return networksAndSigners[ChainId.SCROLL_LAYER_2].gateway["withdrawETH(uint256)"](gasLimit, {
      value: parsedAmount,
    })
  }

  const sendl1ToL2 = () => {
    if (selectedToken.native) {
      return depositETH()
    } else {
      return networksAndSigners[ChainId.SCROLL_LAYER_1].gateway["depositERC20(address,uint256,uint256)"](selectedToken.address, parsedAmount, 0)
    }
  }

  const sendl2ToL1 = () => {
    if (selectedToken.native) {
      return withdrawETH()
    } else {
      return networksAndSigners[ChainId.SCROLL_LAYER_2].gateway["withdrawERC20(address,uint256,uint256)"](selectedToken.address, parsedAmount, 0)
    }
  }

  const getL1Fee = async () => {
    const L2GasPriceOracleContract = new ethers.Contract(
      requireEnv("REACT_APP_L2_GAS_PRICE_ORACLE"),
      L2GasPriceOracle,
      networksAndSigners[ChainId.SCROLL_LAYER_1].signer,
    )
    const fee = await L2GasPriceOracleContract.l2BaseFee()
    return fee.toNumber() * gasLimit
  }

  const getL2Fee = async () => {
    const L1GasPriceOracleContract = new ethers.Contract(
      requireEnv("REACT_APP_L1_GAS_PRICE_ORACLE"),
      L1GasPriceOracle,
      networksAndSigners[ChainId.SCROLL_LAYER_2].signer,
    )
    const fee = await L1GasPriceOracleContract.l1BaseFee()
    return fee.toNumber() * gasLimit
  }

  return {
    send,
    sending,
    setSending,
  }
}
