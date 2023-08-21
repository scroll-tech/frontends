import { useCallback, useEffect, useState } from "react"
import useSWR from "swr"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useClaimStore from "@/stores/claimStore"

export interface TxHistory {
  errorMessage: string
  refreshPageTransactions: (page) => void
  changeErrorMessage: (value) => void
}

const useClaim = networksAndSigners => {
  const { walletCurrentAddress } = useRainbowContext()

  const { getClaimableTransactions, claimableTransactions, updateTransactions, claimingTransactionsMap } = useClaimStore()

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
      const needToRefreshTransactions = claimableTransactions.filter(item => !item.toHash && !item.assumedStatus)
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
        getClaimableTransactions(walletCurrentAddress, page).catch(e => {
          setErrorMessage(e)
        })
      }
    },
    [walletCurrentAddress],
  )

  useEffect(() => {
    refreshPageTransactions(1)
  }, [refreshPageTransactions])

  useEffect(() => {
    if (data?.data?.result.length) {
      updateTransactions(data.data.result)
    }
  }, [data, claimingTransactionsMap])

  return {
    errorMessage,
    refreshPageTransactions,
    changeErrorMessage: setErrorMessage,
  }
}

export default useClaim
