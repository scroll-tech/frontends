//  @ts-ignore
import produce from "immer"
// import _ from "lodash"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { BRIDGE_TRANSACTIONS_V2 } from "@/constants/storageKey"
import { TX_TYPE } from "@/constants/transaction"

import { TxStore, fetchOnChainTransactions, formatBackTxList, updateFrontTransactions } from "./utils"

const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      estimatedTimeMap: {},
      frontTransactions: {},
      loading: false,
      pageTransactions: [],
      // when user send a transaction
      addTransaction: (walletAddress, newTx) => {
        const frontTransactions = get().frontTransactions
        let txList = frontTransactions[walletAddress] ?? []
        if (!Object.isExtensible(txList)) {
          txList = [...txList]
        }
        txList.unshift(newTx)
        set({
          frontTransactions: { ...frontTransactions, [walletAddress]: txList },
        })
      },

      // wait transaction success in from network
      updateTransaction: (walletAddress, txHash, updateOpts) =>
        set(
          produce(state => {
            const frontTx = (state.frontTransactions[walletAddress] ?? []).find(item => item.hash === txHash)
            if (frontTx) {
              for (const key in updateOpts) {
                frontTx[key] = updateOpts[key]
              }
            }
          }),
        ),

      addEstimatedTimeMap: (key, value) => {
        const nextEstimatedTimeMap = { ...get().estimatedTimeMap, [key]: value }
        set({
          estimatedTimeMap: nextEstimatedTimeMap,
        })
      },

      // polling transactions
      generateTransactions: (walletAddress, historyList) => {
        const { frontTransactions, estimatedTimeMap: preEstimatedTimeMap, pageTransactions } = get()
        const { txList: backendTransactions, estimatedTimeMap } = formatBackTxList(
          historyList.filter(item => item),
          preEstimatedTimeMap,
        )

        const currentFrontTransactions = frontTransactions[walletAddress] ?? []

        const nextFrontTransactions = updateFrontTransactions(
          currentFrontTransactions,
          backendTransactions,
          walletAddress,
          get().removeFrontTransactions,
        )

        const refreshPageTransaction = pageTransactions.map(item => {
          return backendTransactions.find(tx => tx.hash === item.hash) || item
        })

        set({
          frontTransactions: { ...frontTransactions, [walletAddress]: nextFrontTransactions },
          pageTransactions: refreshPageTransaction,
          estimatedTimeMap,
        })
      },

      // page transactions
      comboPageTransactions: async (walletAddress, page, rowsPerPage) => {
        set({ loading: true })
        try {
          const { results, total } = await fetchOnChainTransactions(walletAddress, page, rowsPerPage, TX_TYPE.ALL)
          const { txList: backendTransactions, estimatedTimeMap } = formatBackTxList(results, get().estimatedTimeMap)
          const currentFrontTransactions = get().frontTransactions[walletAddress] ?? []
          const nextFrontTransactions = updateFrontTransactions(
            currentFrontTransactions,
            backendTransactions,
            walletAddress,
            get().removeFrontTransactions,
          )
          const pageTransactions = page === 1 ? [...nextFrontTransactions, ...backendTransactions] : backendTransactions
          set({
            frontTransactions: { ...get().frontTransactions, [walletAddress]: nextFrontTransactions },
            pageTransactions,
            page,
            total,
            loading: false,
            estimatedTimeMap,
          })
        } catch (error) {
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
      removeFrontTransactions: (walletAddress, hash) =>
        set(
          produce(state => {
            const frontTransactions = state.frontTransactions[walletAddress]
            if (frontTransactions) {
              const frontTxIndex = frontTransactions.findIndex(item => item.hash === hash)
              frontTransactions.splice(frontTxIndex, 1)
            }
          }),
        ),
    }),
    {
      name: BRIDGE_TRANSACTIONS_V2,
    },
  ),
)

export default useTxStore
