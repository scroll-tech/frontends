import { ethers } from "ethers"
import { useEffect, useMemo } from "react"

import { CHAIN_ID } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import useBatchBridgeStore, { BridgeSummaryType, DepositBatchMode } from "@/stores/batchBridgeStore"
import useBridgeStore from "@/stores/bridgeStore"
import { BNToAmount } from "@/utils"

const batchDepositTokens = ["ETH", "wstETH"]

export default function useBatchDepositConfig(props) {
  const { selectedToken, amount } = props
  const { networksAndSigners } = useBridgeContext()
  const { txType, isNetworkCorrect } = useBridgeStore()
  const { batchDepositConfig, depositBatchMode, changeBatchDepositConfig, changeBridgeSummaryType } = useBatchBridgeStore()

  const getBatchDepositConfigsByToken = async selectedToken => {
    return networksAndSigners[CHAIN_ID.L1].batchBridgeGateway.configs(selectedToken.address || ethers.ZeroAddress)
  }

  useEffect(() => {
    console.log("batchDepositConfig", batchDepositConfig)
  }, [batchDepositConfig])

  const enableBatchDeposit = useMemo(() => {
    return batchDepositTokens.includes(selectedToken.symbol)
  }, [selectedToken])

  const depositAmountIsInvaild = useMemo(() => {
    const minAmount = BNToAmount(batchDepositConfig.minAmountPerTx, selectedToken.decimals)
    return amount && amount < minAmount && txType === "Deposit" && depositBatchMode === DepositBatchMode.Economy
  }, [batchDepositConfig, amount, txType, depositBatchMode])

  useEffect(() => {
    if (txType === "Deposit" && enableBatchDeposit) {
      changeBridgeSummaryType(BridgeSummaryType.Selector)
      if (networksAndSigners[CHAIN_ID.L1].provider) {
        getBatchDepositConfigsByToken(selectedToken).then(configs => {
          changeBatchDepositConfig(configs)
        })
      }
    } else {
      changeBridgeSummaryType(BridgeSummaryType.Summary)
    }
  }, [txType, isNetworkCorrect, enableBatchDeposit, networksAndSigners])

  return {
    getBatchDepositConfigsByToken,
    depositAmountIsInvaild,
  }
}
