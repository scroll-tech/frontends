import { create } from "zustand"

interface VisibleStore {
  historyVisible: boolean
  changeHistoryVisible: (value) => void
}

const useBridgeStore = create<VisibleStore>()((set, get) => ({
  historyVisible: false,

  changeHistoryVisible: value => {
    set({
      historyVisible: value,
    })
  },
}))

export default useBridgeStore
