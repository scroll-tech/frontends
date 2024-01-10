//  @ts-ignore
import { readItem } from "squirrel-gill/lib/storage"

import { fetchClaimableTxListUrl, fetchTxListUrl, fetchWithdrawalListUrl } from "@/apis/bridge"
import { BLOCK_NUMBERS } from "@/constants/storageKey"
import { TX_TYPE } from "@/constants/transaction"
import { sentryDebug } from "@/utils"

export interface FrontendTxDB {
  [key: string]: Transaction[]
}

export interface TxStore {
  page: number
  total: number
  loading: boolean
  estimatedTimeMap: object
  frontTransactions: FrontendTxDB
  pageTransactions: Transaction[]
  addTransaction: (walletAddress, tx) => void
  updateTransaction: (walletAddress, hash, tx) => void
  removeFrontTransactions: (walletAddress, hash?) => void
  addEstimatedTimeMap: (key, value) => void
  generateTransactions: (walletAddress, transactions) => void
  comboPageTransactions: (walletAddress, page, rowsPerPage) => Promise<any>
  clearTransactions: () => void
}

export interface ClaimStore {
  page: number
  total: number
  loading: boolean
  pageTransactions: Transaction[]
  generateTransactions: (walletAddress, transactions) => void
  comboPageTransactions: (walletAddress, page, rowsPerPage) => Promise<any>
  clearTransactions: () => void
}

export interface Transaction {
  hash: string
  toHash?: string
  fromBlockNumber?: number
  toBlockNumber?: number
  amount: string
  isL1: boolean
  symbolToken?: string
  timestamp?: number
  claimInfo?: object
  errMsg?: string
  initiatedAt?: string
  txStatus?: number
  msgHash?: string
}

export const MAX_OFFSET_TIME = 30 * 60 * 1000
export const CLAIM_OFFSET_TIME = 60 * 1000

export const isValidOffsetTime = offsetTime => offsetTime < MAX_OFFSET_TIME

export const formatBackTxList = (backList, estimatedTimeMap) => {
  const nextEstimatedTimeMap = { ...estimatedTimeMap }
  const blockNumbers = readItem(localStorage, BLOCK_NUMBERS)
  if (!backList || !backList.length) {
    return { txList: [], estimatedTimeMap: nextEstimatedTimeMap }
  }
  const txList = backList.map(tx => {
    const amount = tx.amount
    const toHash = tx.finalizeTx?.hash
    const initiatedAt = tx.blockTimestamp

    // 1. have no time to compute fromEstimatedEndTime
    // 2. compute toEstimatedEndTime from backend data
    // 3. when tx is marked success then remove estimatedEndTime to slim storage data
    // 4. estimatedTime is greater than 30 mins then warn but save
    // 5. if the second deal succeeded, then the first should succeed too.

    // deposit
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
    }

    return {
      hash: tx.hash,
      fromBlockNumber: tx.blockNumber,
      toHash,
      toBlockNumber: tx.finalizeTx?.blockNumber,
      amount,
      isL1: tx.isL1,
      symbolToken: tx.isL1 ? tx.l1Token : tx.l2Token,
      claimInfo: tx.claimInfo,
      initiatedAt,
      txStatus: tx.txStatus,
      msgHash: tx.msgHash,
    }
  })

  return {
    txList,
    estimatedTimeMap: nextEstimatedTimeMap,
  }
}

export const fetchOnChainTransactions = async (address, page, rowsPerPage, type) => {
  const requsetUrl = {
    [TX_TYPE.ALL]: `${fetchTxListUrl}?address=${address}&page=${page}&page_size=${rowsPerPage}`,
    [TX_TYPE.CLAIM]: `${fetchClaimableTxListUrl}?address=${address}&page=${page}&page_size=${rowsPerPage}`,
    [TX_TYPE.WITHDRAW]: `${fetchWithdrawalListUrl}?address=${address}&page=${page}&page_size=${rowsPerPage}`,
  }
  const response = await scrollRequest(requsetUrl[type])
  return response.data
}

export const updateFrontTransactions = (currentFrontTransactions, backendTransactions, walletAddress, removeFrontTransactions) => {
  const backendHashes = new Set(backendTransactions.map(tx => tx.hash))
  return currentFrontTransactions.filter(tx => {
    const isRecord = tx.initiatedAt <= backendTransactions[0]?.initiatedAt || backendHashes.has(tx.hash)
    if (isRecord) {
      removeFrontTransactions(walletAddress, tx.hash)
    }
    return !isRecord
  })
}
