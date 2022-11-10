import create from "zustand";

interface VisibleStore {
  historyVisible: boolean;
  bridgeFormVisible: boolean;
  changeHistoryVisible: (value) => void;
  changeBridgeFormVisible: (value) => void;
}

const useBridgeVisibleStore = create<VisibleStore>()((set, get) => ({
  historyVisible: false,
  bridgeFormVisible: false,

  changeHistoryVisible: (value) => {
    set({
      historyVisible: value,
    });
  },

  changeBridgeFormVisible: (value) => {
    set({
      bridgeFormVisible: value,
    });
  },
}));

export default useBridgeVisibleStore;
