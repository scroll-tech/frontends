import { create } from "zustand"

interface GlobalStore {
  aiModalVisible: boolean

  changeAIModalVisible: (visible: boolean) => void
}

const useGlobalStore = create<GlobalStore>()((set, get) => ({
  aiModalVisible: false,

  changeAIModalVisible: visible => {
    set({
      aiModalVisible: visible,
    })
  },
}))

export default useGlobalStore
