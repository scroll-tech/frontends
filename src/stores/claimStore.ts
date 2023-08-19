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
  getClaimableTransactions: (address, page) => Promise<any>
  updateTransactions: (transactions) => Promise<any>
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
  isFinalized?: boolean
  isClaimed?: boolean
  claimInfo?: object
  assumedStatus?: string
  errMsg?: string
  initiatedAt?: string
  finalisedAt?: string
}

const MAX_OFFSET_TIME = 30 * 60 * 1000

const isValidOffsetTime = offsetTime => offsetTime < MAX_OFFSET_TIME

const getLastFinalizedBatch = async () => {
  try {
    const { finalized_index: finalizedIndex } = await scrollRequest(`${fetchLastBatchIndexesUrl}`)
    return finalizedIndex
  } catch (error) {
    console.error("An error occurred while checking transaction status:", error)
  }

  return 0
}

const formatTxList = async (backList, estimatedTimeMap) => {
  const nextEstimatedTimeMap = { ...estimatedTimeMap }
  const blockNumbers = readItem(localStorage, BLOCK_NUMBERS)
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

    const isFinalized = tx.claimInfo?.batch_index <= lastFinalizedBatch

    if (
      tx.finalizeTx?.blockNumber &&
      blockNumbers[0] !== -1 &&
      tx.finalizeTx.blockNumber > blockNumbers[0] &&
      !nextEstimatedTimeMap[`claim_${toHash}`]
    ) {
      const estimatedOffsetTime = (tx.finalizeTx.blockNumber - blockNumbers[0]) * 12 * 1000
      if (isValidOffsetTime(estimatedOffsetTime)) {
        nextEstimatedTimeMap[`claim_${toHash}`] = Date.now() + estimatedOffsetTime
      } else {
        nextEstimatedTimeMap[`claim_${toHash}`] = 0
        sentryDebug(`safe block number: ${blockNumbers[0]}`)
      }
    } else if (
      tx.finalizeTx?.blockNumber &&
      tx.finalizeTx.blockNumber <= blockNumbers[0] &&
      Object.keys(nextEstimatedTimeMap).includes(`claim_${toHash}`)
    ) {
      delete nextEstimatedTimeMap[`claim_${toHash}`]
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
      isFinalized,
      claimInfo: tx.claimInfo,
      isClaimed: tx.finalizeTx?.hash,
      initiatedAt,
      finalisedAt,
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
      getClaimableTransactions: async (walletAddress, page) => {
        const { estimatedTimeMap: preEstimatedTimeMap } = get()
        try {
          const {
            data: { total, result },
          } = await scrollRequest(`${fetchClaimableTxListUrl}?address=${walletAddress}&page=${page}&page_size=${BRIDGE_PAGE_SIZE}`)
          const { txList, estimatedTimeMap } = await formatTxList(result, preEstimatedTimeMap)
          set({
            claimableTransactions: txList,
            estimatedTimeMap,
            page,
            total: total,
          })
        } catch (error) {}
      },
      updateTransactions: async transactions => {
        const { claimableTransactions: preClaimableTransactions } = get()
        const transactionsHash = {}
        transactions.forEach(t => {
          transactionsHash[t.hash] = t
        })
        const result = preClaimableTransactions.map(transaction => transactionsHash[transaction.hash] || transaction)

        set({
          claimableTransactions: result,
        })
      },
    }),
    {
      name: CLAIM_TRANSACTIONS,
    },
  ),
)

export default useTxStore
