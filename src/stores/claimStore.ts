// @ts-ignore
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { CLAIM_TRANSACTIONS_V2 } from "@/constants/storageKey"
import { TX_TYPE } from "@/constants/transaction"
import useTxStore from "@/stores/txStore"

import { ClaimStore, fetchOnChainTransactions, formatBackTxList, updateFrontTransactions } from "./utils"

const useClaimStore = create<ClaimStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      loading: false,
      pageTransactions: [],

      // polling transactions
      generateTransactions: (walletAddress, historyList) => {
        const { pageTransactions } = get()
        const { frontTransactions, estimatedTimeMap: preEstimatedTimeMap, removeFrontTransactions } = useTxStore.getState()
        const { txList: backendTransactions, estimatedTimeMap } = formatBackTxList(
          historyList.filter(item => item),
          preEstimatedTimeMap,
        )

        const currentFrontTransactions = frontTransactions[walletAddress] ?? []

        const nextFrontTransactions = updateFrontTransactions(currentFrontTransactions, backendTransactions, walletAddress, removeFrontTransactions)

        const refreshPageTransaction = pageTransactions.map(item => {
          return backendTransactions.find(tx => tx.hash === item.hash) || item
        })

        set({
          pageTransactions: refreshPageTransaction,
        })
        useTxStore.setState({
          estimatedTimeMap,
          frontTransactions: { ...frontTransactions, [walletAddress]: nextFrontTransactions },
        })
      },

      // page transactions
      comboPageTransactions: async (walletAddress, page, rowsPerPage) => {
        set({ loading: true })
        try {
          const { results, total } = await fetchOnChainTransactions(walletAddress, page, rowsPerPage, TX_TYPE.CLAIM)
          const { frontTransactions, estimatedTimeMap: preEstimatedTimeMap, removeFrontTransactions } = useTxStore.getState()
          const { txList: backendTransactions, estimatedTimeMap } = formatBackTxList(results, preEstimatedTimeMap)
          const currentFrontTransactions = frontTransactions[walletAddress]?.filter(tx => !tx.isL1) ?? []
          const nextFrontTransactions = updateFrontTransactions(currentFrontTransactions, backendTransactions, walletAddress, removeFrontTransactions)
          const pageTransactions = page === 1 ? [...nextFrontTransactions, ...backendTransactions] : backendTransactions
          set({
            pageTransactions,
            page,
            total,
            loading: false,
          })
          useTxStore.setState({
            estimatedTimeMap,
            frontTransactions: { ...frontTransactions, [walletAddress]: nextFrontTransactions },
          })
        } catch (error) {
          console.log(error, "error")
          set({ loading: false })
        }
      },
      // when connect and disconnect
      clearTransactions: () => {
        set({
          pageTransactions: [],
          page: 1,
          total: 0,
        })
      },
    }),
    {
      name: CLAIM_TRANSACTIONS_V2,
    },
  ),
)
export default useClaimStore
