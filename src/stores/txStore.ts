import produce from "immer"
import create from "zustand"
import { persist } from "zustand/middleware"

import { fetchTxListUrl } from "@/apis/bridge"
import { networks } from "@/constants"
import { BRIDGE_TRANSACTIONS } from "@/utils/storageKey"

interface TxStore {
  page: number
  total: number
  loading: boolean
  estimatedTimeMap: object
  warningTip: string
  frontTransactions: Transaction[]
  transactions: Transaction[]
  pageTransactions: Transaction[]
  addTransaction: (tx) => void
  updateTransaction: (hash, tx) => void
  addEstimatedTimeMap: (key, value) => void
  generateTransactions: (transactions, safeBlockNumber) => void
  comboPageTransactions: (address, page, rowsPerPage, safeBlockNumber) => Promise<any>
  clearTransactions: () => void
  clearWarningTip: () => void
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

const formatBackTxList = (backList, estimatedTimeMap, safeBlockNumber) => {
  const nextEstimatedTimeMap = { ...estimatedTimeMap }
  let warningTip = ""
  if (!backList.length) {
    return { txList: [], estimatedTimeMap: nextEstimatedTimeMap, warningTip }
  }
  const txList = backList.map(tx => {
    const amount = tx.amount
    const fromName = networks[+!tx.isL1].name
    const fromExplore = networks[+!tx.isL1].explorer
    const toName = networks[+tx.isL1].name
    const toExplore = networks[+tx.isL1].explorer
    const toHash = tx.finalizeTx?.hash

    // 1. have no time to compute fromEstimatedEndTime
    // 2. compute toEstimatedEndTime from backend data
    // 3. when tx is marked success then remove estimatedEndTime to slim storage data
    // 4. estimatedTime is greater than 30 mins then warn but save
    const maxOffsetTime = 30 * 60 * 1000
    if (tx.isL1) {
      if (tx.blockNumber > safeBlockNumber && safeBlockNumber !== -1 && !nextEstimatedTimeMap[`from_${tx.hash}`]) {
        const estimatedOffsetTime = (tx.blockNumber - safeBlockNumber) * 12 * 1000
        if (estimatedOffsetTime > maxOffsetTime) {
          warningTip = `The estimated waiting time for the current transaction is greater than 30 minutes, and the current latest safe block number is ${safeBlockNumber}`
        }
        nextEstimatedTimeMap[`from_${tx.hash}`] = Date.now() + estimatedOffsetTime
      } else if (tx.blockNumber <= safeBlockNumber && nextEstimatedTimeMap[`from_${tx.hash}`]) {
        delete nextEstimatedTimeMap[`from_${tx.hash}`]
      }
    } else {
      if (
        tx.finalizeTx?.blockNumber &&
        safeBlockNumber !== -1 &&
        tx.finalizeTx.blockNumber > safeBlockNumber &&
        !nextEstimatedTimeMap[`to_${toHash}`]
      ) {
        const estimatedOffsetTime = (tx.finalizeTx.blockNumber - safeBlockNumber) * 12 * 1000
        if (estimatedOffsetTime > maxOffsetTime) {
          warningTip = `The estimated waiting time for the current transaction is greater than 30 minutes, and the current latest safe block number is ${safeBlockNumber}`
        }
        nextEstimatedTimeMap[`to_${toHash}`] = Date.now() + estimatedOffsetTime
      } else if (tx.finalizeTx?.blockNumber && tx.finalizeTx.blockNumber <= safeBlockNumber && nextEstimatedTimeMap[`to_${toHash}`]) {
        delete nextEstimatedTimeMap[`to_${toHash}`]
      }
    }

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

  return {
    txList,
    estimatedTimeMap: nextEstimatedTimeMap,
    warningTip,
  }
}

const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      // { hash: estimatedEndTime }
      estimatedTimeMap: {},
      warningTip: "",
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

      addEstimatedTimeMap: (key, value) => {
        const nextEstimatedTimeMap = { ...get().estimatedTimeMap, [key]: value }
        set({
          estimatedTimeMap: nextEstimatedTimeMap,
        })
      },

      // polling transactions
      // slim frontTransactions and keep the latest 3 backTransactions
      generateTransactions: (historyList, safeBlockNumber) => {
        const realHistoryList = historyList.filter(item => item)
        if (realHistoryList.length) {
          const {
            txList: formattedHistoryList,
            estimatedTimeMap,
            warningTip,
          } = formatBackTxList(realHistoryList, get().estimatedTimeMap, safeBlockNumber)
          const formattedHistoryListHash = formattedHistoryList.map(item => item.hash)
          const formattedHistoryListMap = Object.fromEntries(formattedHistoryList.map(item => [item.hash, item]))
          const frontListHash = get().frontTransactions.map(item => item.hash)
          const pendingFrontList = get().frontTransactions.filter(item => !formattedHistoryListHash.includes(item.hash))
          const pendingFrontListHash = pendingFrontList.map(item => item.hash)
          const nextTransactions = get()
            .frontTransactions.map(item => {
              if (pendingFrontListHash.includes(item.hash)) {
                return item
              }
              return formattedHistoryListMap[item.hash]
            })
            .concat(formattedHistoryList.filter(item => !frontListHash.includes(item.hash)))

          const refreshPageTransaction = get().pageTransactions.map(item => {
            if (formattedHistoryListMap[item.hash]) {
              return formattedHistoryListMap[item.hash]
            }
            return item
          })
          set({
            transactions: nextTransactions.slice(0, 2),
            frontTransactions: pendingFrontList,
            pageTransactions: refreshPageTransaction,
            estimatedTimeMap,
            warningTip,
          })
        }
      },
      clearTransactions: () => {
        set({
          frontTransactions: [],
          transactions: [],
          pageTransactions: [],
          estimatedTimeMap: {},
          page: 1,
          total: 0,
        })
      },

      clearWarningTip: () => {
        set({
          warningTip: "",
        })
      },
      // page transactions
      comboPageTransactions: async (address, page, rowsPerPage, safeBlockNumber) => {
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
            const {
              txList: backendTransactions,
              estimatedTimeMap,
              warningTip,
            } = formatBackTxList(data.data.result, get().estimatedTimeMap, safeBlockNumber)
            set({
              pageTransactions: [...frontTransactions, ...backendTransactions],
              total: data.data.total,
              page,
              loading: false,
              estimatedTimeMap,
              warningTip,
            })
            if (page === 1) {
              // keep transactions always frontList + the latest two history list
              set({
                transactions: [...frontTransactions, ...backendTransactions.slice(0, 2)],
              })
            }
          })
          .catch(() => {
            set({ loading: false })
            return Promise.reject("Failed to fetch transaction history")
          })
      },
    }),
    {
      name: BRIDGE_TRANSACTIONS,
    },
  ),
)

export default useTxStore
