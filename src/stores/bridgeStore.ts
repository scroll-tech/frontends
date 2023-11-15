import { create } from "zustand"

import { NETWORKS } from "@/constants"

type TransactionType = "Deposit" | "Withdraw"

type WithDrawStep = "1" | "2"

interface TxSuccess {
  code: 1
}
export interface TxError {
  code: 0
  message: string
}

type TxResult = TxSuccess | TxError | null
interface BridgeStore {
  historyVisible: boolean
  changeHistoryVisible: (value) => void

  // new-bridge
  fromNetwork: Network
  toNetwork: Network
  txType: TransactionType
  withDrawStep: WithDrawStep
  txResult: TxResult
  isNetworkCorrect: boolean

  changeFromNetwork: (network: Network) => void
  changeToNetwork: (network: Network) => void
  changeTxType: (txType: TransactionType) => void
  changeTxResult: (txResult: TxResult | null) => void
  changeWithdrawStep: (withDrawStep: WithDrawStep) => void
  changeIsNetworkCorrect: (isNetworkCorrect: boolean) => void
}

const useBridgeStore = create<BridgeStore>()((set, get) => ({
  historyVisible: false,
  fromNetwork: NETWORKS[0],
  toNetwork: NETWORKS[1],
  txType: "Deposit",
  withDrawStep: "1",
  txResult: null,
  isNetworkCorrect: true,

  changeHistoryVisible: value => {
    set({
      historyVisible: value,
    })
  },
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
