import { create } from "zustand"

export enum BridgeSummaryType {
  Summary = "Summary",
  Selector = "Selector",
}

export enum DepositBatchMode {
  Fast = "Fast",
  Economy = "Economy",
}

type BatchDepositConfig = {
  feeAmountPerTx: bigint
  minAmountPerTx: bigint
  maxTxsPerBatch: bigint
  maxDelayPerBatch: bigint
  safeBridgeGasLimit: bigint
}

interface BatchBridgeStore {
  bridgeSummaryType: BridgeSummaryType
  depositBatchMode: DepositBatchMode
  batchDepositConfig: BatchDepositConfig
  depositAmountIsValid: boolean

  changeBridgeSummaryType: (depositType: BridgeSummaryType) => void
  changeDepositBatchMode: (depositBatchMode: DepositBatchMode) => void
  changeBatchDepositConfig: (batchDepositConfig: BatchDepositConfig) => void
  changeDepositAmountIsValid: (depositAmountIsValid: boolean) => void
}

const useBatchBridgeStore = create<BatchBridgeStore>()(set => ({
  bridgeSummaryType: BridgeSummaryType.Summary,
  depositBatchMode: DepositBatchMode.Fast,
  batchDepositConfig: {
    feeAmountPerTx: 0n,
    minAmountPerTx: 0n,
    maxTxsPerBatch: 0n,
    maxDelayPerBatch: 0n,
    safeBridgeGasLimit: 0n,
  },
  depositAmountIsValid: true,

  changeBridgeSummaryType: bridgeSummaryType => {
    set({
      bridgeSummaryType,
    })
  },

  changeDepositBatchMode: depositBatchMode => {
    set({
      depositBatchMode,
    })
  },
  changeBatchDepositConfig: batchDepositConfig => {
    set({
      batchDepositConfig,
    })
  },
  changeDepositAmountIsValid: depositAmountIsValid => {
    set({
      depositAmountIsValid,
    })
  },
}))

export default useBatchBridgeStore
