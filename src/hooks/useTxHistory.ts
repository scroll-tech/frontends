import { useCallback, useEffect, useState } from "react"
import useSWR from "swr"

import { fetchClaimableTxListUrl, fetchTxByHashUrl } from "@/apis/bridge"
import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTxStore from "@/stores/txStore"

export interface TxHistory {
  errorMessage: string
  refreshPageTransactions: (page) => void
  changeErrorMessage: (value) => void
}

const useTxHistory = networksAndSigners => {
  const { walletCurrentAddress } = useRainbowContext()
  const { pageTransactions, generateTransactions, comboPageTransactions, combineClaimableTransactions, orderedTxDB, clearTransactions } = useTxStore()

  const [errorMessage, setErrorMessage] = useState("")
  const [claimableTx, setclaimableTx] = useState<[] | null>(null)

  const fetchTxList = useCallback(({ txs }) => {
    return scrollRequest(fetchTxByHashUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txs }),
    }).then(data => data)
  }, [])

  useEffect(() => {
    clearTransactions()
  }, [])

  useEffect(() => {
    if (walletCurrentAddress) {
      try {
        scrollRequest(`${fetchClaimableTxListUrl}?address=${walletCurrentAddress}&page=1&page_size=100`).then(data => {
          setclaimableTx(data.data.result)
        })
      } catch (error) {}
    }
  }, [walletCurrentAddress])

  // fetch to hash/blockNumber from backend
  const { data } = useSWR<any>(
    () => {
      const needToRefreshTransactions = pageTransactions.filter(item => !item.toHash)

      if (needToRefreshTransactions.length && walletCurrentAddress) {
        const txs = needToRefreshTransactions.map(item => item.hash).filter((item, index, arr) => index === arr.indexOf(item))
        return { txs }
      }
      return null
    },
    fetchTxList,
    {
      onError: (error, key) => {
        setErrorMessage(`${error.status}:${error.message}`)
      },
      refreshInterval: 2000,
    },
  )

  const refreshPageTransactions = useCallback(
    page => {
      if (walletCurrentAddress) {
        comboPageTransactions(walletCurrentAddress, page, BRIDGE_PAGE_SIZE).catch(e => {
          setErrorMessage(e)
        })
      }
    },
    [walletCurrentAddress],
  )

  useEffect(() => {
    refreshPageTransactions(1)
  }, [refreshPageTransactions, orderedTxDB])

  useEffect(() => {
    if (data?.data?.result.length) {
      generateTransactions(walletCurrentAddress, data.data.result)
    }
  }, [data])

  useEffect(() => {
    if (claimableTx) {
      combineClaimableTransactions(walletCurrentAddress, claimableTx)
    }
  }, [claimableTx])

  return {
    errorMessage,
    refreshPageTransactions,
    changeErrorMessage: setErrorMessage,
  }
}

export default useTxHistory
