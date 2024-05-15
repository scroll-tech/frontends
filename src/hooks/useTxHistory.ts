import { useCallback, useEffect, useState } from "react"
import useSWR from "swr"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { BRIDGE_PAGE_SIZE, TX_STATUS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore from "@/stores/txStore"

export interface TxHistory {
  errorMessage: string
  refreshPageTransactions: (page) => void
  changeErrorMessage: (value) => void
}

const useTxHistory = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { pageTransactions, generateTransactions, comboPageTransactions, clearTransactions } = useTxStore()

  const [errorMessage, setErrorMessage] = useState("")

  const { historyVisible } = useBridgeStore()

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

  // fetch to hash/blockNumber from backend
  const { data } = useSWR<any>(
    () => {
      const needToRefreshTransactions = pageTransactions.filter(
        item => item.txStatus !== TX_STATUS.Relayed && item.txStatus !== TX_STATUS.BatchDepositRelayed,
      )

      if (needToRefreshTransactions.length && walletCurrentAddress && historyVisible) {
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
    if (data?.data?.results.length) {
      generateTransactions(walletCurrentAddress, data.data.results)
    }
  }, [data])

  return {
    errorMessage,
    refreshPageTransactions,
    changeErrorMessage: setErrorMessage,
  }
}

export default useTxHistory
