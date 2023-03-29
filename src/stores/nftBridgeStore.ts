import produce from "immer"
import create from "zustand"
import { persist } from "zustand/middleware"

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
}

interface TransfetToken {
  id: number
  amount?: number
}
interface NFTBridgeStore {
  contract: Contract
  viewingList: NFTToken[]
  selectedTokens: TransfetToken[]
  selectedTokenIds: () => number[]
  selectedList: () => NFTToken[]
  changeContract: (value) => void
  addViewingList: (token) => void
  removeViewingList: (id) => void
  clearViewingList: () => void
  clearSelectedList: () => void
  toggleSelectedTokens: (id) => void
  updateTransferAmount: (id, amount) => void
}

const useNFTBridgeStore = create<NFTBridgeStore>()(
  persist(
    (set, get) => ({
      contract: {},
      viewingList: [],
      selectedTokens: [],
      selectedTokenIds: () => get().selectedTokens.map(item => item.id),
      selectedList: () => get().viewingList.filter(item => get().selectedTokenIds().includes(item.id)),

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
          selectedTokens: [],
        })
      },

      toggleSelectedTokens: id => {
        const curSelectedList = get().selectedTokens

        if (curSelectedList.find(item => item.id === id)) {
          const nextSelectedList = curSelectedList.filter(item => item.id !== id)
          set({
            selectedTokens: nextSelectedList,
          })
        } else {
          const token = get().viewingList.find(item => item.id === id)
          set({
            selectedTokens: get().selectedTokens.concat({ id, amount: token?.amount }),
          })
        }
      },
      updateTransferAmount: (id, amount) => {
        set(
          produce(state => {
            const curToken = state.viewingList.find(item => item.id === id)
            curToken.transferAmount = amount
          }),
        )
      },
    }),
    {
      name: "nftBridgeStore",
    },
  ),
)

export default useNFTBridgeStore
