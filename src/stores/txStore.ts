import produce from "immer"
import create from "zustand"
import { persist } from "zustand/middleware"

import { fetchTxListUrl } from "@/apis/bridge"
import { networks } from "@/constants"
import { toTokenDisplay } from "@/utils"

interface TxStore {
  page: number
  total: number
  loading: boolean
  frontTransactions: Transaction[]
  transactions: Transaction[]
  pageTransactions: Transaction[]
  addTransaction: (tx) => void
  updateTransaction: (hash, tx) => void
  generateTransactions: (transactions) => void
  comboPageTransactions: (address, page, rowsPerPage) => Promise<any>
  clearTransactions: () => void
}
interface Transaction {
  hash: string
  toHash?: string
  fromName: string
  toName: string
  fromExplore: string
  toExplore: string
  fromBlockNumber?: number
  toBlockNumber?: number
  amount: string
  isL1: boolean
  symbolToken?: string
}

const formatBackTxList = backList => {
  if (!backList.length) {
    return []
  }
  return backList.map(tx => {
    const amount = toTokenDisplay(tx.amount)
    const fromName = networks[+!tx.isL1].name
    const fromExplore = networks[+!tx.isL1].explorer
    const toName = networks[+tx.isL1].name
    const toExplore = networks[+tx.isL1].explorer
    const toHash = tx.finalizeTx?.hash
    return {
      hash: tx.hash,
      amount,
      fromName,
      fromExplore,
      fromBlockNumber: tx.blockNumber,
      toHash,
      toName,
      toExplore,
      toBlockNumber: tx.finalizeTx?.blockNumber,
      isL1: tx.isL1,
      symbolToken: tx.isL1 ? tx.l1Token : tx.l2Token,
    }
  })
}

const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      frontTransactions: [],
      loading: false,
      // frontTransactions + backendTransactions.slice(0, 2)
      transactions: [],
      pageTransactions: [],
      // when user send a transaction
      addTransaction: newTx =>
        set(state => ({
          frontTransactions: [newTx, ...state.frontTransactions],
          transactions: [newTx, ...state.transactions],
        })),
      // wait transaction success in from network
      updateTransaction: (oldTx, updateOpts) =>
        set(
          produce(state => {
            const frontTx = state.frontTransactions.find(item => item.hash === oldTx.hash)
            if (frontTx) {
              for (const key in updateOpts) {
                frontTx[key] = updateOpts[key]
              }
            }
            // for stay on "recent tx" page
            const recentTx = state.transactions.find(item => item.hash === oldTx.hash)
            if (recentTx) {
              for (const key in updateOpts) {
                recentTx[key] = updateOpts[key]
              }
            }
            // for keep "bridge history" open
            const pageTx = state.pageTransactions.find(item => item.hash === oldTx.hash)
            if (pageTx) {
              for (const key in updateOpts) {
                pageTx[key] = updateOpts[key]
              }
            }
          }),
        ),
      // polling transactions
      // slim frontTransactions and keep the latest 3 backTransactions
      generateTransactions: historyList => {
        const realHistoryList = historyList.filter(item => item)
        if (realHistoryList.length) {
          const formattedHistoryList = formatBackTxList(realHistoryList)
          const formattedHistoryListHash = formattedHistoryList.map(item => item.hash)
          const formattedHistoryListMap = Object.fromEntries(formattedHistoryList.map(item => [item.hash, item]))
          const pendingFrontList = get().frontTransactions.filter(item => !formattedHistoryListHash.includes(item.hash))
          const pendingFrontListHash = pendingFrontList.map(item => item.hash)
          const syncList = formattedHistoryList.filter(item => !pendingFrontListHash.includes(item.hash))
          const restList = get().transactions.filter(item => item.toHash)

          const refreshPageTransaction = get().pageTransactions.map(item => {
            if (formattedHistoryListMap[item.hash]) {
              return formattedHistoryListMap[item.hash]
            }
            return item
          })
          set({
            transactions: pendingFrontList.concat([...syncList, ...restList].slice(0, 2)),
            frontTransactions: pendingFrontList,
            pageTransactions: refreshPageTransaction,
          })
        }
      },
      clearTransactions: () => {
        set({
          frontTransactions: [],
          transactions: [],
          pageTransactions: [],
          page: 1,
          total: 0,
        })
      },

      // page transactions
      comboPageTransactions: async (address, page, rowsPerPage) => {
        const frontTransactions = get().frontTransactions
        set({ loading: true })
        const offset = (page - 1) * rowsPerPage
        // const offset = gap > 0 ? gap : 0;
        if (frontTransactions.length >= rowsPerPage + offset) {
          set({
            pageTransactions: frontTransactions.slice(offset, offset + rowsPerPage),
            page,
            loading: false,
          })
          return
        }

        const currentPageFrontTransactions = frontTransactions.slice((page - 1) * rowsPerPage)
        const gap = (page - 1) * rowsPerPage - frontTransactions.length
        const relativeOffset = gap > 0 ? gap : 0
        const limit = rowsPerPage - currentPageFrontTransactions.length

        return scrollRequest(`${fetchTxListUrl}?address=${address}&offset=${relativeOffset}&limit=${limit}`)
          .then(data => {
            set({
              pageTransactions: [...frontTransactions, ...formatBackTxList(data.data.result)],
              total: data.data.total,
              page,
              loading: false,
            })
            if (page === 1) {
              // keep transactions always frontList + the latest two history list
              set({
                transactions: [...frontTransactions, ...formatBackTxList(data.data.result).slice(0, 2)],
              })
            }
          })
          .catch(() => {
            set({ loading: false })
            return Promise.reject("Fail to fetch transactions, something wrong...")
          })
      },
    }),
    {
      name: "bridgeTransactions",
    },
  ),
)

export default useTxStore
