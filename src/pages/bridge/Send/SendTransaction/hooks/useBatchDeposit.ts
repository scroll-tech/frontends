import { ethers } from "ethers"
import { useEffect, useMemo } from "react"

import { BATCH_DEPOSIT_TOKENS, CHAIN_ID } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import useBatchBridgeStore, { BridgeSummaryType } from "@/stores/batchBridgeStore"
import useBridgeStore from "@/stores/bridgeStore"
import { BNToAmount } from "@/utils"

export default function useBatchDeposit(props) {
  const { selectedToken, amount } = props
  const { networksAndSigners } = useBridgeContext()
  const { txType, isNetworkCorrect } = useBridgeStore()
  const { batchDepositConfig, changeBatchDepositConfig, changeBridgeSummaryType } = useBatchBridgeStore()

  const getBatchDepositConfigsByToken = async selectedToken => {
    return networksAndSigners[CHAIN_ID.L1].batchBridgeGateway.configs(selectedToken.address || ethers.ZeroAddress)
  }

  const enableBatchDeposit = useMemo(() => {
    return BATCH_DEPOSIT_TOKENS.includes(selectedToken.symbol)
  }, [selectedToken])

  // < 0.001 need special check for economy mode
  const depositAmountIsVaild = useMemo(() => {
    const minAmount = BNToAmount(batchDepositConfig.minAmountPerTx, selectedToken.decimals)
    if (amount && txType === "Deposit" && enableBatchDeposit) {
      return amount >= minAmount
    }
    return true
  }, [batchDepositConfig, amount, selectedToken, txType, enableBatchDeposit])

  useEffect(() => {
    if (txType === "Deposit" && enableBatchDeposit) {
      changeBridgeSummaryType(BridgeSummaryType.Selector)
      if (networksAndSigners[CHAIN_ID.L1].signer) {
        getBatchDepositConfigsByToken(selectedToken)
          .then(configs => {
            changeBatchDepositConfig(configs)
          })
          .catch(err => {
            console.error("getBatchDepositConfigsByToken", err)
          })
      }
    } else {
      changeBridgeSummaryType(BridgeSummaryType.Summary)
    }
  }, [txType, isNetworkCorrect, enableBatchDeposit, networksAndSigners, selectedToken])

  return {
    getBatchDepositConfigsByToken,
    depositAmountIsVaild,
  }
}
