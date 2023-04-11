import produce from "immer"
import { isNumber } from "lodash"
import { readItem } from "squirrel-gill/lib/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { TxStatus, networks } from "@/constants"
import { sentryDebug, storageAvailable } from "@/utils"
import { BLOCK_NUMBERS, BRIDGE_TRANSACTIONS } from "@/utils/storageKey"

interface TxStore {
  page: number
  total: number
  loading: boolean
  estimatedTimeMap: object
  frontTransactions: Transaction[]
  abnormalTransactions: Transaction[]
  pageTransactions: Transaction[]
  orderedTxs: TimestampTx[]
  addTransaction: (tx) => void
  updateTransaction: (hash, tx) => void
  removeFrontTransactions: (hash) => void
  addEstimatedTimeMap: (key, value) => void
  generateTransactions: (transactions) => void
  comboPageTransactions: (address, page, rowsPerPage) => Promise<any>
  updateOrderedTxs: (hash, param) => void
  addAbnormalTransactions: (tx) => void
  clearTransactions: () => void
}

const enum ITxPosition {
  // desc: have not yet been synchronized to the backend,
  // status: pending
  Frontend = 1,
  // desc: abnormal transactions caught by the frontend, usually receipt.status !==1
  // status: failed | cancelled
  Abnormal = 2,
  // desc: backend data synchronized from the blockchain
  // status: successful
  // TODO: reflect the error of tx on destination network
  Backend = 3,
}

const TxPosition = {
  Frontend: ITxPosition.Frontend,
  Abnormal: ITxPosition.Abnormal,
  Backend: ITxPosition.Backend,
}

interface TimestampTx {
  hash: string
  timestamp: number
  // 1: front tx
  // 2: abnormal tx -> failed|canceled
  // 3: successful tx
  position: ITxPosition
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
  timestamp?: number

  assumedStatus?: string

  // added
  errMsg?: string
}

const MAX_OFFSET_TIME = 30 * 60 * 1000

const isValidOffsetTime = offsetTime => offsetTime < MAX_OFFSET_TIME

const formatBackTxList = (backList, estimatedTimeMap) => {
  const nextEstimatedTimeMap = { ...estimatedTimeMap }
  const blockNumbers = readItem(localStorage, BLOCK_NUMBERS)
  if (!backList.length) {
    return { txList: [], estimatedTimeMap: nextEstimatedTimeMap }
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
    }
  })

  return {
    txList,
    estimatedTimeMap: nextEstimatedTimeMap,
  }
}

// assume > 1h tx occurred an uncatchable error
const eliminateOvertimeTx = frontList => {
  return produce(frontList, draft => {
    draft.forEach(item => {
      if (!item.assumedStatus && Date.now() - item.timestamp >= 3600000) {
        item.assumedStatus = TxStatus.failed
        sentryDebug(`The backend has not synchronized data for this transaction(hash: ${item.hash}) for more than an hour.`)
      }
    })
  }) as any
}

const detailOrderdTxs = async (pageOrderdTxs, frontTransactions, abnormalTransactions, estimatedTimeMap) => {
  const needFetchTxs = pageOrderdTxs.filter(item => item.position === TxPosition.Backend).map(item => item.hash)

  let historyList = []
  let returnedEstimatedTimeMap = estimatedTimeMap
  if (needFetchTxs.length) {
    const { data } = await scrollRequest(fetchTxByHashUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txs: needFetchTxs }),
    })
    const { txList, estimatedTimeMap: nextEstimatedTimeMap } = formatBackTxList(data.result, estimatedTimeMap)
    historyList = txList
    returnedEstimatedTimeMap = nextEstimatedTimeMap
  }

  const pageTransactions = pageOrderdTxs
    .map(({ hash, position }) => {
      if (position === TxPosition.Backend) {
        return historyList.find((item: any) => item.hash === hash)
      } else if (position === TxPosition.Abnormal) {
        return abnormalTransactions.find(item => item.hash === hash)
      }
      return frontTransactions.find(item => item.hash === hash)
    })
    .filter(item => item) // TODO: fot test
  return { pageTransactions, estimatedTimeMap: returnedEstimatedTimeMap }
}

const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      // { hash: estimatedEndTime }
      estimatedTimeMap: {},
      frontTransactions: [],
      abnormalTransactions: [],
      loading: false,
      orderedTxs: [],
      pageTransactions: [],
      // when user send a transaction
      addTransaction: newTx =>
        set(state => ({
          frontTransactions: [newTx, ...state.frontTransactions],
        })),
      // wait transaction success in from network
      updateTransaction: (txHash, updateOpts) =>
        set(
          produce(state => {
            const frontTx = state.frontTransactions.find(item => item.hash === txHash)
            if (frontTx) {
              for (const key in updateOpts) {
                frontTx[key] = updateOpts[key]
              }
            }
            // for keep "bridge history" open
            const pageTx = state.pageTransactions.find(item => item.hash === txHash)
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
      generateTransactions: historyList => {
        const { frontTransactions, estimatedTimeMap: preEstimatedTimeMap, orderedTxs, pageTransactions } = get()
        const realHistoryList = historyList.filter(item => item)

        const untimedFrontList = eliminateOvertimeTx(frontTransactions)

        if (realHistoryList.length) {
          const { txList: formattedHistoryList, estimatedTimeMap } = formatBackTxList(realHistoryList, preEstimatedTimeMap)
          const formattedHistoryListHash = formattedHistoryList.map(item => item.hash)
          const formattedHistoryListMap = Object.fromEntries(formattedHistoryList.map(item => [item.hash, item]))
          const pendingFrontList = untimedFrontList.filter(item => !formattedHistoryListHash.includes(item.hash))

          const refreshPageTransaction = pageTransactions.map(item => {
            if (formattedHistoryListMap[item.hash]) {
              return formattedHistoryListMap[item.hash]
            }
            return item
          })

          const failedFrontTransactionListHash = untimedFrontList.map(item => item.assumedStatus === TxStatus.failed)
          const refreshOrderedTxs = orderedTxs.map(item => {
            if (formattedHistoryListHash.includes(item.hash)) {
              return {
                ...item,
                position: TxPosition.Backend,
              }
            } else if (failedFrontTransactionListHash.includes(item.hash)) {
              return { ...item, position: TxPosition.Abnormal }
            }
            return item
          })

          set({
            frontTransactions: pendingFrontList,
            pageTransactions: refreshPageTransaction,
            estimatedTimeMap,
            orderedTxs: refreshOrderedTxs,
          })
        } else {
          set({
            frontTransactions: untimedFrontList,
          })
        }
      },

      // page transactions
      comboPageTransactions: async (address, page, rowsPerPage) => {
        const { orderedTxs, frontTransactions, abnormalTransactions, estimatedTimeMap } = get()
        set({ loading: true })
        const pageOrderdTxs = orderedTxs.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        const { pageTransactions, estimatedTimeMap: nextEstimatedTimeMap } = await detailOrderdTxs(
          pageOrderdTxs,
          frontTransactions,
          abnormalTransactions,
          estimatedTimeMap,
        )
        set({
          pageTransactions,
          page,
          total: orderedTxs.length,
          loading: false,
          estimatedTimeMap: nextEstimatedTimeMap,
        })
      },

      // TODO: take into consideration
      clearTransactions: () => {
        set({
          frontTransactions: [],
          pageTransactions: [],
          estimatedTimeMap: {},
          page: 1,
          total: 0,
        })
      },
      removeFrontTransactions: hash =>
        set(
          produce(state => {
            const frontTxIndex = state.frontTransactions.findIndex(item => item.hash === hash)
            state.frontTransactions.splice(frontTxIndex, 1)
          }),
        ),
      addAbnormalTransactions: tx => {
        const { abnormalTransactions, orderedTxs } = get()
        if (storageAvailable("localStorage")) {
          set({
            abnormalTransactions: [tx, ...abnormalTransactions],
          })
        } else {
          const abandonedTxHashs = abnormalTransactions.slice(abnormalTransactions.length - 3).map(item => item.hash)
          set({
            orderedTxs: orderedTxs.filter(item => !abandonedTxHashs.includes(item.hash)),
            abnormalTransactions: [tx, ...abnormalTransactions.slice(0, abnormalTransactions.length - 3)],
          })
        }
      },

      updateOrderedTxs: (hash, param) =>
        set(
          produce(state => {
            // position: 1|2|3
            if (isNumber(param)) {
              const current = state.orderedTxs.find(item => item.hash === hash)
              if (current) {
                current.position = param
              } else if (storageAvailable("localStorage")) {
                state.orderedTxs.unshift({ hash, timestamp: Date.now(), position: param })
              } else {
                const abandonedTxHashs = state.orderedTxs.slice(state.orderedTxs.length - 3).map(item => item.hash)
                state.abnormalTransactions = state.abnormalTransactions.filter(item => !abandonedTxHashs.includes(item.hash))
                state.orderedTxs = state.orderedTxs.slice(0, state.orderedTxs.length - 3)
              }
            }
            // repriced tx
            else {
              state.orderedTxs.find(item => item.hash === hash).hash = param
            }
          }),
        ),
    }),
    {
      name: BRIDGE_TRANSACTIONS,
    },
  ),
)

export { isValidOffsetTime, TxPosition }

export default useTxStore
