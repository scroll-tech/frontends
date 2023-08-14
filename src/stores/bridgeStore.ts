import { create } from "zustand"

type Mode = "Transaction" | "History"

type TransactionType = "Deposit" | "Withdraw"

interface TxResult {
  hash: string
  amount: string
}

interface BridgeStore {
  historyVisible: boolean
  changeHistoryVisible: (value) => void

  // new-bridge
  fromNetwork: Network
  toNetwork: Network
  mode: Mode
  txType: TransactionType
  txResult: TxResult | null

  changeFromNetwork: (network: Network) => void
  changeToNetwork: (network: Network) => void
  changeMode: (mode: Mode) => void
  changeTxType: (txType: TransactionType) => void
  changeTxResult: (txResult: TxResult | null) => void
}

const useBridgeStore = create<BridgeStore>()((set, get) => ({
  historyVisible: false,

  changeHistoryVisible: value => {
    set({
      historyVisible: value,
    })
  },

  // new-bridge

  fromNetwork: {},
  toNetwork: {},
  mode: "Transaction",
  txType: "Deposit",
  txResult: null,

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
  changeMode: mode => {
    set({
      mode,
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
}))

export default useBridgeStore
