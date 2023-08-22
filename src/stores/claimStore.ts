import { readItem } from "squirrel-gill/lib/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { fetchClaimableTxListUrl } from "@/apis/bridge"
import { fetchLastBatchIndexesUrl } from "@/apis/rollupscan"
import { NETWORKS } from "@/constants"
import { BRIDGE_PAGE_SIZE } from "@/constants"
import { BLOCK_NUMBERS, CLAIM_TRANSACTIONS } from "@/constants/storageKey"
import { sentryDebug } from "@/utils"

interface TxStore {
  page: number
  total: number
  loading: boolean
  estimatedTimeMap: object
  claimableTransactions: Transaction[]
  claimingTransactionsMap: object
  getClaimableTransactions: (address, page) => Promise<any>
  updateTransactions: (transactions) => Promise<any>
  addClaimingTransaction: (transaction) => void
  addEstimatedTimeMap: (key, value) => void
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

const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      estimatedTimeMap: {},
      loading: false,
      claimableTransactions: [],
      claimingTransactionsMap: {},
      getClaimableTransactions: async (walletAddress, page) => {
        const { estimatedTimeMap: preEstimatedTimeMap, claimingTransactionsMap } = get()
        try {
          const {
            data: { total, result },
          } = await scrollRequest(`${fetchClaimableTxListUrl}?address=${walletAddress}&page=${page}&page_size=${BRIDGE_PAGE_SIZE}`)
          const { txList, estimatedTimeMap } = await formatTxList(result, preEstimatedTimeMap, claimingTransactionsMap)
          set({
            claimableTransactions: txList,
            estimatedTimeMap,
            page,
            total: total,
          })
        } catch (error) {}
      },
      addClaimingTransaction: transaction => {
        const { claimingTransactionsMap: preClaimingTransactionsMap } = get()
        set({
          claimingTransactionsMap: {
            ...preClaimingTransactionsMap,
            [transaction]: +new Date(),
          },
        })
      },
      addEstimatedTimeMap: (key, value) => {
        const nextEstimatedTimeMap = { ...get().estimatedTimeMap, [key]: value }
        set({
          estimatedTimeMap: nextEstimatedTimeMap,
        })
      },
      updateTransactions: async transactions => {
        const { claimableTransactions: preClaimableTransactions, estimatedTimeMap: preEstimatedTimeMap, claimingTransactionsMap } = get()
        const { txList, estimatedTimeMap } = await formatTxList(transactions, preEstimatedTimeMap, claimingTransactionsMap)

        const transactionsHash = {}
        txList.forEach(t => {
          transactionsHash[t.hash] = t
        })
        const result = preClaimableTransactions.map(transaction => transactionsHash[transaction.hash] || transaction)

        set({
          claimableTransactions: result,
          estimatedTimeMap,
        })
      },
    }),
    {
      name: CLAIM_TRANSACTIONS,
    },
  ),
)

export default useTxStore
