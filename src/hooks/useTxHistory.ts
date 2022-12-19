import { useCallback, useEffect, useState } from "react"
import useSWR from "swr"
import { ChainId, BRIDGE_PAGE_SIZE } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
// import useBridgeStore from "@/stores/bridgeStore";
import useTxStore from "@/stores/txStore"
export interface TxHistory {
  blockNumbers: number[]
  errorMessage: string
  refreshPageTransactions: (page) => void
  changeErrorMessage: (value) => void
}

const useTxHistory = networksAndSigners => {
  const { chainId, walletCurrentAddress } = useWeb3Context()
  const { transactions, pageTransactions, generateTransactions, comboPageTransactions } = useTxStore()

  const [errorMessage, setErrorMessage] = useState("")

  const fetchTxList = useCallback(({ txs }) => {
    return fetch("/bridgeapi/txsbyhashes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txs }),
    }).then(res => {
      if (!res.ok) {
        throw new Error("Fail to refresh transactions, something wrong...")
      }
      return res.json()
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
    if (chainId) {
      const fetchL1blockNumber = networksAndSigners[ChainId.SCROLL_LAYER_1].provider.getBlockNumber()
      const fetchL2BlockNumber = networksAndSigners[ChainId.SCROLL_LAYER_2].provider.getBlockNumber()

      const blockNumbers = await Promise.allSettled([fetchL1blockNumber, fetchL2BlockNumber])

      return blockNumbers.map(item => (item.status === "fulfilled" ? item.value : -1))
    }
    return null
  }, [networksAndSigners, chainId])

  const { data: blockNumbers } = useSWR<any>("eth_blockNumber", fetchBlockNumber, {
    refreshInterval: 2000,
  })

  console.log(blockNumbers, "blockNumbers")

  const refreshPageTransactions = useCallback(
    page => {
      if (walletCurrentAddress) {
        try {
          comboPageTransactions(walletCurrentAddress, page, BRIDGE_PAGE_SIZE)
        } catch (e) {
          setErrorMessage((e as any).toString())
        }
      }
    },
    [walletCurrentAddress],
  )

  useEffect(() => {
    refreshPageTransactions(1)
  }, [refreshPageTransactions])

  useEffect(() => {
    if (data?.data?.result.length) {
      generateTransactions(data.data.result)
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
