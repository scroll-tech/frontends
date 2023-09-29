import { create } from "zustand"

import { NETWORKS } from "@/constants"

type TransactionType = "Deposit" | "Withdraw"

type WithDrawStep = "1" | "2"

interface TxResult {
  hash: string
  amount: string
}
interface TxError {
  hash?: string
  message: string
}
interface BridgeStore {
  historyVisible: boolean
  changeHistoryVisible: (value) => void

  // new-bridge
  fromNetwork: Network
  toNetwork: Network
  txType: TransactionType
  withDrawStep: WithDrawStep
  txResult: TxResult | null
  txError: TxError | null
  isNetworkCorrect: boolean

  changeFromNetwork: (network: Network) => void
  changeToNetwork: (network: Network) => void
  changeTxType: (txType: TransactionType) => void
  changeTxResult: (txResult: TxResult | null) => void
  changeTxError: (txError: TxError | null) => void
  changeWithdrawStep: (withDrawStep: WithDrawStep) => void
  changeIsNetworkCorrect: (isNetworkCorrect: boolean) => void
}

const useBridgeStore = create<BridgeStore>()((set, get) => ({
  historyVisible: false,

  changeHistoryVisible: value => {
    set({
      historyVisible: value,
    })
  },

  // new-bridge

  fromNetwork: NETWORKS[0],
  toNetwork: NETWORKS[1],
  txType: "Deposit",
  withDrawStep: "1",
  txResult: null,
  txError: null,
  isNetworkCorrect: true,

  changeFromNetwork: network => {
    set({
      fromNetwork: network,
    })
  },
  changeToNetwork: network => {
    set({
      toNetwork: network,
    })
  },
  changeTxType: txType => {
    set({
      txType,
    })
  },

  changeTxResult: txResult => {
    set({
      txResult,
    })
  },

  changeTxError: txError => {
    set({
      txError,
    })
  },

  changeWithdrawStep: withDrawStep => {
    set({
      withDrawStep,
    })
  },

  changeIsNetworkCorrect: isNetworkCorrect => {
    set({
      isNetworkCorrect,
    })
  },
}))

export default useBridgeStore
