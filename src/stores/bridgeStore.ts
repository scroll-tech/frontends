import create from "zustand";

interface VisibleStore {
  historyVisible: boolean;
  recentTxVisible: boolean;
  changeHistoryVisible: (value) => void;
  changeRecentTxVisible: (value) => void;
}

const useBridgeStore = create<VisibleStore>()((set, get) => ({
  historyVisible: false,
  recentTxVisible: false,

  changeHistoryVisible: (value) => {
    set({
      historyVisible: value,
    });
  },

  changeRecentTxVisible: (value) => {
    set({
      recentTxVisible: value,
    });
  },
}));

export default useBridgeStore;
