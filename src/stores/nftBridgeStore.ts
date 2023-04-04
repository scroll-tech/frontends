import produce from "immer"
import create from "zustand"

interface NFTToken {
  id: number
  amount: number
  name?: string
  image?: string
  description?: string
  transferAmount?: number
}

interface Contract {
  type?: string
  l1?: string
  l2?: string
  faucet?: string
}

interface NFTBridgeStore {
  fromNetwork: any
  toNetwork: any
  contract: Contract
  viewingList: NFTToken[]
  selectedList: NFTToken[]
  promptMessage: string
  selectedTokenIds: () => number[]
  selectedTokenAmount: () => number
  changeContract: (value) => void
  changeFromNetwork: (value) => void
  changeToNetwork: (value) => void
  addViewingList: (token) => void
  removeViewingList: (id) => void
  clearViewingList: () => void
  clearSelectedList: () => void
  toggleSelectedList: (id) => void
  updateSelectedList: (id, params) => void
  exciseSelected: () => void
  updatePromptMessage: (value) => void
}

const useNFTBridgeStore = create<NFTBridgeStore>()((set, get) => ({
  contract: {},
  fromNetwork: { chainId: 0 },
  toNetwork: { chainId: 0 },
  promptMessage: "",
  viewingList: [],
  selectedList: [],
  selectedTokenIds: () => get().selectedList.map(item => item.id),

  selectedTokenAmount: () => get().selectedList.reduce((pre, cur: any) => pre + (cur.transferAmount ?? 0), 0),

  changeFromNetwork: value => {
    set({
      fromNetwork: value,
    })
  },
  changeToNetwork: value => {
    set({
      toNetwork: value,
    })
  },
  changeContract: contract => {
    set({
      contract: contract || {},
    })
  },

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

  clearViewingList: () => {
    set({
      viewingList: [],
    })
  },

  clearSelectedList: () => {
    set({
      selectedList: [],
    })
  },

  toggleSelectedList: id => {
    const curSelectedList = get().selectedList
    const tokenIndex = curSelectedList.findIndex(item => item.id === id)
    if (tokenIndex > -1) {
      const nextSelectedList = [...curSelectedList]
      nextSelectedList.splice(tokenIndex, 1)
      set({
        selectedList: nextSelectedList,
      })
    } else {
      const token = get().viewingList.find(item => item.id === id)
      set({
        selectedList: get().selectedList.concat(token as NFTToken),
      })
    }
  },
  exciseSelected: () => {
    const selectedTokenIds = get().selectedTokenIds()
    const nextViewingList = get().viewingList.filter(item => !selectedTokenIds.includes(item.id))
    set({
      viewingList: nextViewingList,
      selectedList: [],
    })
  },
  updateSelectedList: (id, params) => {
    set(
      produce(state => {
        const curToken = state.selectedList.find(item => item.id === id)
        for (let key of Object.keys(params)) {
          curToken[key] = params[key]
        }
      }),
    )
  },
  updatePromptMessage: promptMessage => {
    set({ promptMessage })
  },
}))

export default useNFTBridgeStore
