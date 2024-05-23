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
  replayTxHash?: string
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
    //message_type: 1 =>  deposit  2 => withdraw  3 => batch deposit
    const amount = tx.message_type === 3 ? (tx.token_amounts[0] - tx.batch_deposit_fee).toString() : tx.token_amounts[0]
    const toHash = tx.counterpart_chain_tx?.hash
    const initiatedAt = tx.block_timestamp

    // 1. have no time to compute fromEstimatedEndTime
    // 2. compute toEstimatedEndTime from backend data
    // 3. when tx is marked success then remove estimatedEndTime to slim storage data
    // 4. estimatedTime is greater than 30 mins then warn but save
    // 5. if the second deal succeeded, then the first should succeed too.

    // deposit
    if (tx.message_type !== 2) {
      if (tx.block_number > blockNumbers[0] && blockNumbers[0] !== -1 && !nextEstimatedTimeMap[`from_${tx.hash}`]) {
        const estimatedOffsetTime = (tx.block_number - blockNumbers[0]) * 12 * 1000
        if (isValidOffsetTime(estimatedOffsetTime)) {
          nextEstimatedTimeMap[`from_${tx.hash}`] = Date.now() + estimatedOffsetTime
        } else if (!tx.counterpart_chain_tx?.block_number || tx.counterpart_chain_tx.block_number > blockNumbers[1]) {
          nextEstimatedTimeMap[`from_${tx.hash}`] = 0
          sentryDebug(`safe block number: ${blockNumbers[0]}`)
        }
      } else if (tx.blockNumber <= blockNumbers[0] && Object.keys(nextEstimatedTimeMap).includes(`from_${tx.hash}`)) {
        delete nextEstimatedTimeMap[`from_${tx.hash}`]
      }
    }

    return {
      hash: tx.hash,
      replayTxHash: tx.replay_tx_hash,
      fromBlockNumber: tx.block_number,
      toHash,
      toBlockNumber: tx.counterpart_chain_tx?.block_number,
      amount,
      isL1: tx.message_type !== 2,
      symbolToken: tx.message_type !== 2 ? tx.l1_token_address : tx.l2_token_address,
      claimInfo: tx.claim_info,
      initiatedAt,
      txStatus: tx.tx_status,
      msgHash: tx.message_hash,
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
