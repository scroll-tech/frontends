import { useCallback, useEffect, useMemo, useState } from "react"
import useSWR from "swr"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { CLAIM_TABLE_PAGE_SIZE, TX_STATUS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"
import useClaimHistoryStore from "@/stores/claimStore"

export interface TxHistory {
  errorMessage: string
  refreshPageTransactions: (page) => void
  changeErrorMessage: (value) => void
}

const useClaimHistory = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { txType, withDrawStep, historyVisible } = useBridgeStore()

  const { comboPageTransactions, pageTransactions, generateTransactions } = useClaimHistoryStore()

  const isOnClaimPage = useMemo(() => {
    return !historyVisible && txType === "Withdraw" && withDrawStep === "2"
  }, [historyVisible, txType, withDrawStep])

  const [errorMessage, setErrorMessage] = useState("")

  const fetchTxList = useCallback(({ txs }) => {
    return scrollRequest(fetchTxByHashUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txs }),
    }).then(data => data)
  }, [])

  const { data } = useSWR<any>(
    () => {
      const needToRefreshTransactions = pageTransactions.filter(item => item.txStatus !== TX_STATUS.Relayed)
      if (needToRefreshTransactions.length && walletCurrentAddress && isOnClaimPage) {
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
        comboPageTransactions(walletCurrentAddress, page, CLAIM_TABLE_PAGE_SIZE).catch(e => {
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

export default useClaimHistory
