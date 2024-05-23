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
  depositAmountIsVaild: boolean

  changeBridgeSummaryType: (depositTpye: BridgeSummaryType) => void
  changeDepositBatchMode: (depositBatchMode: DepositBatchMode) => void
  changeBatchDepositConfig: (batchDepositConfig: BatchDepositConfig) => void
  changeDepositAmountIsVaild: (depositAmountIsVaild: boolean) => void
}

const useBatchBridgeStore = create<BatchBridgeStore>()((set, get) => ({
  bridgeSummaryType: BridgeSummaryType.Summary,
  depositBatchMode: DepositBatchMode.Fast,
  batchDepositConfig: {
    feeAmountPerTx: 0n,
    minAmountPerTx: 0n,
    maxTxsPerBatch: 0n,
    maxDelayPerBatch: 0n,
    safeBridgeGasLimit: 0n,
  },
  depositAmountIsVaild: true,

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
  changeDepositAmountIsVaild: depositAmountIsVaild => {
    set({
      depositAmountIsVaild,
    })
  },
}))

export default useBatchBridgeStore
