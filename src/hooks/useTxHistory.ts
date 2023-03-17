import { useCallback, useEffect, useState } from "react"
import useStorage from "squirrel-gill"
import useSWR from "swr"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { BRIDGE_PAGE_SIZE, ChainId } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useTxStore from "@/stores/txStore"

export interface TxHistory {
  blockNumbers: number[]
  errorMessage: string
  refreshPageTransactions: (page) => void
  changeErrorMessage: (value) => void
}

const useTxHistory = networksAndSigners => {
  const { walletCurrentAddress } = useWeb3Context()
  const { transactions, pageTransactions, generateTransactions, comboPageTransactions } = useTxStore()
  const [blockNumbers, setBlockNumbers] = useStorage(localStorage, "blockNumbers", [-1, -1])

  const [errorMessage, setErrorMessage] = useState("")

  const fetchTxList = useCallback(({ txs }) => {
    return scrollRequest(fetchTxByHashUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txs }),
    })
      .then(data => data)
      .catch(e => {
        throw new Error("Fail to refresh transactions, something wrong...")
      })
  }, [])

  // fetch to hash/blockNumber from backend
  const { data } = useSWR<any>(
    () => {
      const recentAndHistoryTransactions = [...transactions, ...pageTransactions]
      const needToRefreshTransactions = recentAndHistoryTransactions.filter(item => !item.toHash)

      if (needToRefreshTransactions.length && walletCurrentAddress) {
        const txs = needToRefreshTransactions.map(item => item.hash).filter((item, index, arr) => index === arr.indexOf(item))
        return { txs }
      }
      return null
    },
    fetchTxList,
    {
      onError: (error, key) => {
        setErrorMessage(error.message)
      },
      refreshInterval: 2000,
    },
  )

  const fetchBlockNumber = useCallback(async () => {
    if (networksAndSigners[`${ChainId.SCROLL_LAYER_1}ForSafeBlock`].provider && networksAndSigners[ChainId.SCROLL_LAYER_2].provider) {
      const fetchL1BlockNumber = networksAndSigners[`${ChainId.SCROLL_LAYER_1}ForSafeBlock`].provider.getBlock("safe")
      const fetchL2BlockNumber = networksAndSigners[ChainId.SCROLL_LAYER_2].provider.getBlock("latest")

      const blockNumbers = await Promise.allSettled([fetchL1BlockNumber, fetchL2BlockNumber])

      return blockNumbers.map(item => (item.status === "fulfilled" ? item.value.number : -1))
    }
    return null
  }, [networksAndSigners])

  const { data: blockNumbersRes } = useSWR<any>("eth_blockNumber", fetchBlockNumber, {
    refreshInterval: 2000,
  })

  // in order to be compatible with unstable rpc
  useEffect(() => {
    if (blockNumbersRes) {
      setBlockNumbers([
        blockNumbersRes[0] > -1 ? blockNumbersRes[0] : blockNumbers[0],
        blockNumbersRes[1] > -1 ? blockNumbersRes[1] : blockNumbers[1],
      ])
    }
  }, [blockNumbersRes])

  const refreshPageTransactions = useCallback(
    page => {
      if (walletCurrentAddress) {
        comboPageTransactions(walletCurrentAddress, page, BRIDGE_PAGE_SIZE, blockNumbers[0]).catch(e => {
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
      generateTransactions(data.data.result, blockNumbers[0])
    }
  }, [data])

  return {
    blockNumbers,
    errorMessage,
    refreshPageTransactions,
    changeErrorMessage: setErrorMessage,
  }
}

export default useTxHistory
