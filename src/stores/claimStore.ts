import { readItem } from "squirrel-gill/lib/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { fetchLastBatchIndexesUrl } from "@/apis/rollupscan"
import { NETWORKS } from "@/constants"
import { BLOCK_NUMBERS, CLAIM_TRANSACTIONS } from "@/constants/storageKey"
import { BRIDGE_TRANSACTIONS } from "@/constants/storageKey"
import { TxDirection, TxPosition } from "@/stores/txStore"
import { sentryDebug } from "@/utils"

interface TxStore {
  page: number
  total: number
  loading: boolean
  estimatedTimeMap: object
  pageTransactions: Transaction[]
  claimingTransactionsMap: object
  comboPageTransactions: (walletAddress, page, rowsPerPage) => Promise<any>
  addEstimatedTimeMap: (key, value) => void
  generateTransactions: (transactions) => void
}

export const enum ClaimStatus {
  // Batch not finalized
  NOT_READY = 1,
  CLAIMABLE = 2,
  CLAIMING = 3,
  CLAIMED = 4,
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
  claimInfo?: object
  assumedStatus?: string
  errMsg?: string
  initiatedAt?: string
  finalisedAt?: string
  claimStatus: string
}

const MAX_OFFSET_TIME = 30 * 60 * 1000

export const isValidOffsetTime = offsetTime => offsetTime < MAX_OFFSET_TIME

const getLastFinalizedBatch = async () => {
  try {
    const { finalized_index: finalizedIndex } = await scrollRequest(`${fetchLastBatchIndexesUrl}`)
    return finalizedIndex
  } catch (error) {
    console.error("An error occurred while checking transaction status:", error)
  }

  return 0
}

const getTxStatus = (tx, claimingTransactionsMap, lastFinalizedBatch, nextEstimatedTimeMap) => {
  const blockNumbers = readItem(localStorage, BLOCK_NUMBERS)

  if (
    tx.finalizeTx?.blockNumber &&
    blockNumbers[0] !== -1 &&
    tx.finalizeTx.blockNumber > blockNumbers[0] &&
    !nextEstimatedTimeMap[`claim_${tx.hash}`]
  ) {
    const estimatedOffsetTime = (tx.finalizeTx.blockNumber - blockNumbers[0]) * 12 * 1000
    if (isValidOffsetTime(estimatedOffsetTime)) {
      nextEstimatedTimeMap[`claim_${tx.hash}`] = Date.now() + estimatedOffsetTime
    } else {
      nextEstimatedTimeMap[`claim_${tx.hash}`] = 0
      sentryDebug(`safe block number: ${blockNumbers[0]}`)
    }
  } else if (
    tx.finalizeTx?.blockNumber &&
    tx.finalizeTx.blockNumber <= blockNumbers[0] &&
    Object.keys(nextEstimatedTimeMap).includes(`claim_${tx.hash}`)
  ) {
    delete nextEstimatedTimeMap[`claim_${tx.hash}`]
  }

  let claimStatus = ClaimStatus.CLAIMABLE
  if (tx.finalizeTx?.hash && tx.finalizeTx.blockNumber <= blockNumbers[0]) {
    claimStatus = ClaimStatus.CLAIMED
  } else if (claimingTransactionsMap[tx.hash] && claimingTransactionsMap[tx.hash] + 1000 * 60 * 60 > +new Date()) {
    claimStatus = ClaimStatus.CLAIMING
  } else if (tx.claimInfo?.batch_index > lastFinalizedBatch) {
    claimStatus = ClaimStatus.NOT_READY
  }

  return claimStatus
}

const formatTxList = async (backList, estimatedTimeMap, claimingTransactionsMap) => {
  const nextEstimatedTimeMap = { ...estimatedTimeMap }
  if (!backList.length) {
    return { txList: [], estimatedTimeMap: nextEstimatedTimeMap }
  }

  const lastFinalizedBatch = await getLastFinalizedBatch()
  const txList = backList.map(tx => {
    const amount = tx.amount
    const fromName = NETWORKS[+!tx.isL1].name
    const fromExplore = NETWORKS[+!tx.isL1].explorer
    const toName = NETWORKS[+tx.isL1].name
    const toExplore = NETWORKS[+tx.isL1].explorer
    const toHash = tx.finalizeTx?.hash
    const initiatedAt = tx.blockTimestamp || tx.createdTime
    const finalisedAt = tx.finalizeTx?.blockTimestamp
    const claimStatus = getTxStatus(tx, claimingTransactionsMap, lastFinalizedBatch, nextEstimatedTimeMap)

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
      initiatedAt,
      finalisedAt,
      claimStatus,
    }
  })

  return {
    txList,
    estimatedTimeMap: nextEstimatedTimeMap,
  }
}

const detailOrderdTxs = async (pageOrderedTxs, frontTransactions, abnormalTransactions, estimatedTimeMap) => {
  const needFetchTxs = pageOrderedTxs.filter(item => item.position === TxPosition.Backend).map(item => item.hash)

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
    const { txList, estimatedTimeMap: nextEstimatedTimeMap } = await formatTxList(data.result, estimatedTimeMap, {})
    historyList = txList
    returnedEstimatedTimeMap = nextEstimatedTimeMap
  }

  const pageTransactions = pageOrderedTxs
    .map(({ hash, position }) => {
      if (position === TxPosition.Backend) {
        return historyList.find((item: any) => item.hash === hash)
      } else if (position === TxPosition.Abnormal) {
        return abnormalTransactions.find(item => item.hash === hash) || frontTransactions.find(item => item.hash === hash)
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
      estimatedTimeMap: {},
      loading: false,
      claimingTransactionsMap: {},
      pageTransactions: [],
      addEstimatedTimeMap: (key, value) => {
        const nextEstimatedTimeMap = { ...get().estimatedTimeMap, [key]: value }
        set({
          estimatedTimeMap: nextEstimatedTimeMap,
        })
      },
      // polling transactions
      // slim frontTransactions and keep the latest 3 backTransactions
      generateTransactions: async historyList => {
        const { state } = readItem(localStorage, BRIDGE_TRANSACTIONS)

        const { estimatedTimeMap: preEstimatedTimeMap, pageTransactions } = state
        const realHistoryList = historyList.filter(item => item)

        if (realHistoryList.length) {
          const { txList: formattedHistoryList, estimatedTimeMap } = await formatTxList(realHistoryList, preEstimatedTimeMap, {})
          const formattedHistoryListMap = Object.fromEntries(formattedHistoryList.map(item => [item.hash, item]))

          const refreshPageTransaction = pageTransactions.map(item => {
            if (formattedHistoryListMap[item.hash]) {
              return formattedHistoryListMap[item.hash]
            }
            return item
          })

          set({
            pageTransactions: refreshPageTransaction,
            estimatedTimeMap,
          })
        }
      },
      comboPageTransactions: async (address, page, rowsPerPage) => {
        const { state } = readItem(localStorage, BRIDGE_TRANSACTIONS)
        const { orderedTxDB, frontTransactions, abnormalTransactions, estimatedTimeMap } = state

        const orderedTxs = orderedTxDB[address] ?? []
        set({ loading: true })
        const withdrawTx = orderedTxs.filter(tx => tx.direction === TxDirection.Withdraw)
        const pageOrderedTxs = withdrawTx.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        const { pageTransactions, estimatedTimeMap: nextEstimatedTimeMap } = await detailOrderdTxs(
          pageOrderedTxs,
          frontTransactions,
          abnormalTransactions,
          estimatedTimeMap,
        )
        set({
          pageTransactions,
          page,
          total: withdrawTx.length,
          loading: false,
          estimatedTimeMap: nextEstimatedTimeMap,
        })
      },
    }),
    {
      name: CLAIM_TRANSACTIONS,
    },
  ),
)

export default useTxStore
