import produce from "immer"
import { readItem } from "squirrel-gill/lib/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { fetchTxListUrl } from "@/apis/bridge"
import { fetchBatchDetailUrl, searchUrl } from "@/apis/rollupscan"
import { networks } from "@/constants"
import { sentryDebug } from "@/utils"
import { BLOCK_NUMBERS, BRIDGE_TRANSACTIONS } from "@/utils/storageKey"

interface TxStore {
  page: number
  total: number
  loading: boolean
  estimatedTimeMap: object
  frontTransactions: Transaction[]
  transactions: Transaction[]
  pageTransactions: Transaction[]
  addTransaction: (tx) => void
  updateTransaction: (hash, tx) => void
  addEstimatedTimeMap: (key, value) => void
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

const MAX_OFFSET_TIME = 30 * 60 * 1000

const isValidOffsetTime = offsetTime => offsetTime < MAX_OFFSET_TIME

const formatBackTxList = async (backList, estimatedTimeMap) => {
  const nextEstimatedTimeMap = { ...estimatedTimeMap }
  const blockNumbers = readItem(localStorage, BLOCK_NUMBERS)
  if (!backList.length) {
    return { txList: [], estimatedTimeMap: nextEstimatedTimeMap }
  }
  const txList = await Promise.all(
    backList.map(async tx => {
      const amount = tx.amount
      const fromName = networks[+!tx.isL1].name
      const fromExplore = networks[+!tx.isL1].explorer
      const toName = networks[+tx.isL1].name
      const toExplore = networks[+tx.isL1].explorer
      const toHash = tx.finalizeTx?.hash
      let isFinalized = false

      // await ;

      // 1. have no time to compute fromEstimatedEndTime
      // 2. compute toEstimatedEndTime from backend data
      // 3. when tx is marked success then remove estimatedEndTime to slim storage data
      // 4. estimatedTime is greater than 30 mins then warn but save
      // 5. if the second deal succeeded, then the first should succeed too.
      if (tx.isL1) {
        if (tx.blockNumber > blockNumbers[0] && blockNumbers[0] !== -1 && !nextEstimatedTimeMap[`from_${tx.hash}`]) {
          const estimatedOffsetTime = (tx.blockNumber - blockNumbers[0]) * 12 * 1000
          if (isValidOffsetTime(estimatedOffsetTime)) {
            nextEstimatedTimeMap[`from_${tx.hash}`] = Date.now() + estimatedOffsetTime
          } else if (!tx.finalizeTx?.blockNumber || tx.finalizeTx.blockNumber > blockNumbers[1]) {
            nextEstimatedTimeMap[`from_${tx.hash}`] = 0
            sentryDebug(`safe block number: ${blockNumbers[0]}`)
          }
        } else if (tx.blockNumber <= blockNumbers[0] && Object.keys(nextEstimatedTimeMap).includes(`from_${tx.hash}`)) {
          delete nextEstimatedTimeMap[`from_${tx.hash}`]
        }
      } else {
        if (!tx.isL1) {
          const { batch_index } = await scrollRequest(`${searchUrl}?keyword=${tx.blockNumber}`)
          const {
            batch: { rollup_status },
          } = await scrollRequest(`${fetchBatchDetailUrl}?index=${batch_index}`)
          console.log("rollup_status", rollup_status)
          isFinalized = rollup_status === "finalized" || rollup_status === "skipped"
        }

        if (
          tx.finalizeTx?.blockNumber &&
          blockNumbers[0] !== -1 &&
          tx.finalizeTx.blockNumber > blockNumbers[0] &&
          !nextEstimatedTimeMap[`to_${toHash}`]
        ) {
          const estimatedOffsetTime = (tx.finalizeTx.blockNumber - blockNumbers[0]) * 12 * 1000
          if (isValidOffsetTime(estimatedOffsetTime)) {
            nextEstimatedTimeMap[`to_${toHash}`] = Date.now() + estimatedOffsetTime
          } else {
            nextEstimatedTimeMap[`to_${toHash}`] = 0
            sentryDebug(`safe block number: ${blockNumbers[0]}`)
          }
        } else if (
          tx.finalizeTx?.blockNumber &&
          tx.finalizeTx.blockNumber <= blockNumbers[0] &&
          Object.keys(nextEstimatedTimeMap).includes(`to_${toHash}`)
        ) {
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
        isFinalized: isFinalized,
        claimInfo: tx.claimInfo,
        isClaimed: tx.finalizeTx?.hash,
      }
    }),
  )

  return {
    txList,
    estimatedTimeMap: nextEstimatedTimeMap,
  }
}

const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      // { hash: estimatedEndTime }
      estimatedTimeMap: {},
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
      generateTransactions: async historyList => {
        const realHistoryList = historyList.filter(item => item)
        if (realHistoryList.length) {
          const { txList: formattedHistoryList, estimatedTimeMap } = await formatBackTxList(realHistoryList, get().estimatedTimeMap)
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
          .then(async data => {
            const { txList: backendTransactions, estimatedTimeMap } = await formatBackTxList(data.data.result, get().estimatedTimeMap)
            set({
              pageTransactions: [...frontTransactions, ...backendTransactions],
              total: data.data.total,
              page,
              loading: false,
              estimatedTimeMap,
            })
            if (page === 1) {
              // keep transactions always frontList + the latest two history list
              set({
                transactions: [...frontTransactions, ...backendTransactions.slice(0, 2)],
              })
            }
          })
          .catch(error => {
            set({ loading: false })
            return Promise.reject(`${error.status}:${error.message}`)
          })
      },
    }),
    {
      name: BRIDGE_TRANSACTIONS,
    },
  ),
)

export { isValidOffsetTime }

export default useTxStore
