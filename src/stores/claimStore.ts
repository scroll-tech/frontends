import { readItem } from "squirrel-gill/lib/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { NETWORKS } from "@/constants"
import { CLAIM_TRANSACTIONS } from "@/constants/storageKey"
import { BRIDGE_TRANSACTIONS } from "@/constants/storageKey"
import { TxDirection, TxPosition } from "@/stores/txStore"

interface TxStore {
  page: number
  total: number
  loading: boolean
  pageTransactions: Transaction[]
  comboPageTransactions: (walletAddress, page, rowsPerPage) => Promise<any>
  generateTransactions: (transactions) => void
}

export const enum ClaimStatus {
  // Batch not finalized
  NOT_READY = 1,
  CLAIMABLE = 2,
  CLAIMING = 3,
  CLAIMED = 4,
  FAILED = 5,
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
}

const MAX_OFFSET_TIME = 30 * 60 * 1000

export const isValidOffsetTime = offsetTime => offsetTime < MAX_OFFSET_TIME

const formatTxList = async backList => {
  if (!backList.length) {
    return { txList: [] }
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
    }
  })

  return {
    txList,
  }
}

const detailOrderdTxs = async (pageOrderedTxs, frontTransactions, abnormalTransactions) => {
  const needFetchTxs = pageOrderedTxs.filter(item => item.position === TxPosition.Backend).map(item => item.hash)

  let historyList: Transaction[] = []
  if (needFetchTxs.length) {
    const { data } = await scrollRequest(fetchTxByHashUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txs: needFetchTxs }),
    })
    const { txList } = await formatTxList(data.result)
    historyList = txList
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
  return { pageTransactions }
}

const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      loading: false,
      pageTransactions: [],
      // polling transactions
      // slim frontTransactions and keep the latest 3 backTransactions
      generateTransactions: async historyList => {
        const { pageTransactions } = get()

        const realHistoryList = historyList.filter(item => item)

        if (realHistoryList.length) {
          const { txList: formattedHistoryList } = await formatTxList(realHistoryList)
          const formattedHistoryListMap = Object.fromEntries(formattedHistoryList.map(item => [item.hash, item]))

          const refreshPageTransaction = pageTransactions.map(item => {
            if (formattedHistoryListMap[item.hash]) {
              return formattedHistoryListMap[item.hash]
            }
            return item
          })

          set({
            pageTransactions: refreshPageTransaction,
          })
        }
      },
      comboPageTransactions: async (address, page, rowsPerPage) => {
        const { state } = readItem(localStorage, BRIDGE_TRANSACTIONS)
        const { orderedTxDB, frontTransactions, abnormalTransactions } = state

        const orderedTxs = orderedTxDB[address] ?? []
        set({ loading: true })
        const withdrawTx = orderedTxs.filter(tx => tx.direction === TxDirection.Withdraw)
        const pageOrderedTxs = withdrawTx.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        const { pageTransactions } = await detailOrderdTxs(pageOrderedTxs, frontTransactions, abnormalTransactions)
        set({
          pageTransactions,
          page,
          total: withdrawTx.length,
          loading: false,
        })
      },
    }),
    {
      name: CLAIM_TRANSACTIONS,
    },
  ),
)

export default useTxStore
