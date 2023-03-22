import create from "zustand"

interface NFTToken {
  name?: string
  id: number
  image: string
  description?: string
}

interface NFTBridgeStore {
  viewingList: NFTToken[]
  selectedList: number[]
  addViewingList: (token) => void
  removeViewingList: (id) => void
  addSelectedList: (id) => void
  removeSelectedList: (id) => void
}

const useNFTBridgeStore = create<NFTBridgeStore>()((set, get) => ({
  viewingList: [],
  selectedList: [],

  addViewingList: token => {
    set({
      viewingList: get().viewingList.concat(token),
    })
  },

  removeViewingList: id => {
    const curViewingList = get().viewingList
    const nextViewingList = curViewingList.filter(item => item.id !== id)
    set({
      viewingList: nextViewingList,
    })
  },

  addSelectedList: id => {
    set({
      selectedList: get().selectedList.concat(id),
    })
  },

  removeSelectedList: id => {
    const curSelectedList = get().selectedList
    const nextSelectedList = curSelectedList.filter(item => item !== id)
    set({
      selectedList: nextSelectedList,
    })
  },
}))

export default useNFTBridgeStore
