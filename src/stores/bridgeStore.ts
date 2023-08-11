import { create } from "zustand"

type Mode = "Transaction" | "History"

type TransactionType = "Deposit" | "Withdraw"

interface BridgeStore {
  historyVisible: boolean
  changeHistoryVisible: (value) => void

  // new-bridge
  fromNetwork: Network
  toNetwork: Network
  mode: Mode
  txType: TransactionType
  isL1: () => boolean

  changeFromNetwork: (network: Network) => void
  changeToNetwork: (network: Network) => void
  changeMode: (mode: Mode) => void
  changeTxType: (txType: TransactionType) => void
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
  isL1: () => !!get().fromNetwork.isL1,

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
}))

export default useBridgeStore
