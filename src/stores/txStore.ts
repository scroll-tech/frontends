import produce from "immer"
import { isNumber } from "lodash"
import { readItem } from "squirrel-gill/lib/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { NETWORKS, TX_STATUS } from "@/constants"
import { BLOCK_NUMBERS, BRIDGE_TRANSACTIONS } from "@/constants/storageKey"
import { convertDateToTimestamp, sentryDebug, storageAvailable } from "@/utils"

interface OrderedTxDB {
  [key: string]: TimestampTx[]
}

interface TxStore {
  page: number
  total: number
  loading: boolean
  estimatedTimeMap: object
  frontTransactions: Transaction[]
  abnormalTransactions: Transaction[]
  pageTransactions: Transaction[]
  orderedTxDB: OrderedTxDB
  addTransaction: (tx) => void
  updateTransaction: (hash, tx) => void
  removeFrontTransactions: (hash) => void
  addEstimatedTimeMap: (key, value) => void
  generateTransactions: (walletAddress, transactions) => void
  combineClaimableTransactions: (walletAddress, transactions) => void
  comboPageTransactions: (walletAddress, page, rowsPerPage) => Promise<any>
  updateOrderedTxs: (walletAddress, hash, param, direction?) => void
  addAbnormalTransactions: (walletAddress, tx) => void
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
  Backend = 3,
}

const TxPosition = {
  Frontend: ITxPosition.Frontend,
  Abnormal: ITxPosition.Abnormal,
  Backend: ITxPosition.Backend,
}

const enum ITxDirection {
  Deposit = 1,
  Withdraw = 2,
}

const TxDirection = {
  Deposit: ITxDirection.Deposit,
  Withdraw: ITxDirection.Withdraw,
}

const MAX_LIMIT = 1000

interface TimestampTx {
  hash: string
  timestamp: number
  // 1: front tx
  // 2: abnormal tx -> failed|canceled
  // 3: successful tx
  position: ITxPosition
  // 1: deposit
  // 2: withdraw
  direction?: ITxDirection
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
  isClaimed?: boolean
  claimInfo?: object
  assumedStatus?: string
  errMsg?: string
  initiatedAt?: string
  finalisedAt?: string
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
    const fromName = NETWORKS[+!tx.isL1].name
    const fromExplore = NETWORKS[+!tx.isL1].explorer
    const toName = NETWORKS[+tx.isL1].name
    const toExplore = NETWORKS[+tx.isL1].explorer
    const toHash = tx.finalizeTx?.hash
    const initiatedAt = tx.blockTimestamp || tx.createdTime
    const finalisedAt = tx.finalizeTx?.blockTimestamp

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
      claimInfo: tx.claimInfo,
      isClaimed: tx.finalizeTx?.hash,
      initiatedAt,
      finalisedAt,
    }
  })

  // delete nextEstimatedTimeMap.to_undefined
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
        item.assumedStatus = TX_STATUS.failed
        sentryDebug(`The backend has not synchronized data for this transaction(hash: ${item.hash}) for more than an hour.`)
      }
    })
  }) as any
}

const detailOrderdTxs = async (pageOrderedTxs, frontTransactions, abnormalTransactions, estimatedTimeMap) => {
  const needFetchTxs = pageOrderedTxs.map(item => item.hash)

  let historyList: Transaction[] = []
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

  const allTransactions = [...historyList, ...abnormalTransactions, ...frontTransactions]
  const pageTransactions = pageOrderedTxs
    .map(({ hash }) => {
      return allTransactions.find(item => item.hash === hash)
    })
    .filter(item => item) // TODO: fot test
  return { pageTransactions, estimatedTimeMap: returnedEstimatedTimeMap }
}

const maxLengthAccount = (orderedTxDB: OrderedTxDB) => {
  const briefList = Object.entries(orderedTxDB).map(([key, value]) => [key, value.length])
  let maxLength = 0
  let address
  for (let i = 0; i < briefList.length; i++) {
    if (briefList[i][1] > maxLength) {
      maxLength = briefList[i][1] as number
      address = briefList[i][0]
    }
  }
  return address
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
      orderedTxDB: {},
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
      generateTransactions: (walletAddress, historyList) => {
        const { frontTransactions, estimatedTimeMap: preEstimatedTimeMap, orderedTxDB, pageTransactions } = get()
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

          const failedFrontTransactionListHash = untimedFrontList.filter(item => item.assumedStatus === TX_STATUS.failed).map(item => item.hash)
          const refreshOrderedDB = produce(orderedTxDB, draft => {
            draft[walletAddress].forEach(item => {
              if (formattedHistoryListHash.includes(item.hash)) {
                item.position = TxPosition.Backend
              } else if (failedFrontTransactionListHash.includes(item.hash)) {
                item.position = TxPosition.Abnormal
              }
            })
          })

          set({
            frontTransactions: pendingFrontList,
            pageTransactions: refreshPageTransaction,
            estimatedTimeMap,
            orderedTxDB: refreshOrderedDB,
          })
        } else {
          set({
            frontTransactions: untimedFrontList,
          })
        }
      },

      // page transactions
      comboPageTransactions: async (address, page, rowsPerPage) => {
        const { orderedTxDB, frontTransactions, abnormalTransactions, estimatedTimeMap } = get()
        const orderedTxs = orderedTxDB[address] ?? []
        set({ loading: true })
        const pageOrderedTxs = orderedTxs.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        const { pageTransactions, estimatedTimeMap: nextEstimatedTimeMap } = await detailOrderdTxs(
          pageOrderedTxs,
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
      // combine claimable transactions and sort
      combineClaimableTransactions: (walletAddress, claimableList) => {
        const { orderedTxDB } = get()
        const orderedTxs = orderedTxDB[walletAddress] ?? []
        const claimableTxs = claimableList.map(item => ({
          hash: item.hash,
          timestamp: convertDateToTimestamp(item.createdTime),
          position: TxPosition.Backend,
          direction: TxDirection.Withdraw,
        }))
        const txList = [...orderedTxs, ...claimableTxs]
          .map(tx => {
            // Ensure backward compatibility with old data, and add the direction attribute for transactions that haven't been claimed.
            if (claimableTxs.some(claimableTx => claimableTx.hash === tx.hash)) {
              return {
                ...tx,
                direction: TxDirection.Withdraw,
              }
            }
            return tx
          })
          .filter((v, i, a) => a.findIndex(t => t.hash === v.hash) === i)
        txList.sort((a, b) => {
          return b.timestamp - a.timestamp
        })
        set({
          orderedTxDB: { ...orderedTxDB, [walletAddress]: txList },
          total: txList.length,
        })
      },
      // when connect and disconnect
      clearTransactions: () => {
        set({
          pageTransactions: [],
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
      addAbnormalTransactions: (walletAddress, tx) => {
        const { abnormalTransactions, orderedTxDB } = get()
        const orderedTxs = orderedTxDB[walletAddress] ?? []
        if (storageAvailable("localStorage")) {
          set({
            abnormalTransactions: [tx, ...abnormalTransactions],
          })
        } else {
          const abandonedTxHashs = abnormalTransactions.slice(abnormalTransactions.length - 3).map(item => item.hash)
          set({
            orderedTxDB: { ...orderedTxDB, [walletAddress]: orderedTxs.filter(item => !abandonedTxHashs.includes(item.hash)) },
            abnormalTransactions: [tx, ...abnormalTransactions.slice(0, abnormalTransactions.length - 3)],
          })
        }
      },

      updateOrderedTxs: (walletAddress, hash, param, direction?) =>
        set(
          produce(state => {
            // position: 1|2|3
            if (isNumber(param)) {
              const current = state.orderedTxDB[walletAddress]?.find(item => item.hash === hash)
              if (current) {
                current.position = param
                current.direction = direction
              } else if (
                storageAvailable("localStorage") &&
                (!state.orderedTxDB[walletAddress] || state.orderedTxDB[walletAddress].length < MAX_LIMIT)
              ) {
                const newRecord = { hash, timestamp: Date.now(), position: param, direction }
                if (state.orderedTxDB[walletAddress]) {
                  state.orderedTxDB[walletAddress].unshift(newRecord)
                } else {
                  state.orderedTxDB[walletAddress] = [newRecord]
                }
              } else {
                // remove the oldest 3 records
                const address = maxLengthAccount(state.orderedTxDB)
                const abandonedTxHashs = state.orderedTxDB[address].slice(state.orderedTxDB[address].length - 3).map(item => item.hash)
                state.abnormalTransactions = state.abnormalTransactions.filter(item => !abandonedTxHashs.includes(item.hash))
                state.orderedTxDB[address] = state.orderedTxDB[address].slice(0, state.orderedTxDB[address].length - 3)

                const newRecord = { hash, timestamp: Date.now(), position: param, direction }
                if (state.orderedTxDB[walletAddress]) {
                  state.orderedTxDB[walletAddress].unshift(newRecord)
                } else {
                  state.orderedTxDB[walletAddress] = [newRecord]
                }
              }
            }
            // repriced tx
            else {
              state.orderedTxDB[walletAddress].find(item => item.hash === hash).hash = param
            }
          }),
        ),
    }),
    {
      name: BRIDGE_TRANSACTIONS,
    },
  ),
)

export { isValidOffsetTime, TxPosition, TxDirection, TimestampTx }

export default useTxStore
