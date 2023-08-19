import { useCallback, useEffect, useState } from "react"
import useStorage from "squirrel-gill"
import useSWR from "swr"

import { fetchClaimableTxListUrl, fetchTxByHashUrl } from "@/apis/bridge"
import { BRIDGE_PAGE_SIZE, CHAIN_ID } from "@/constants"
import { BLOCK_NUMBERS } from "@/constants/storageKey"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTxStore from "@/stores/txStore"

export interface TxHistory {
  blockNumbers: number[]
  errorMessage: string
  refreshPageTransactions: (page) => void
  changeErrorMessage: (value) => void
}

const useTxHistory = networksAndSigners => {
  const { walletCurrentAddress } = useRainbowContext()
  const { pageTransactions, generateTransactions, comboPageTransactions, combineClaimableTransactions } = useTxStore()
  const [blockNumbers, setBlockNumbers] = useStorage(localStorage, BLOCK_NUMBERS, [-1, -1])

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
      const needToRefreshTransactions = pageTransactions.filter(item => !item.toHash && !item.assumedStatus)

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

  const fetchBlockNumber = useCallback(async () => {
    if (networksAndSigners[`${CHAIN_ID.L1}ForSafeBlock`].provider && networksAndSigners[CHAIN_ID.L2].provider) {
      const fetchL1BlockNumber = networksAndSigners[`${CHAIN_ID.L1}ForSafeBlock`].provider.getBlock("safe")
      const fetchL2BlockNumber = networksAndSigners[CHAIN_ID.L2].provider.getBlock("latest")

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
        comboPageTransactions(walletCurrentAddress, page, BRIDGE_PAGE_SIZE).catch(e => {
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
      generateTransactions(walletCurrentAddress, data.data.result)
    }
  }, [data])

  useEffect(() => {
    if (claimableTx) {
      combineClaimableTransactions(walletCurrentAddress, claimableTx)
    }
  }, [claimableTx])

  return {
    blockNumbers,
    errorMessage,
    refreshPageTransactions,
    changeErrorMessage: setErrorMessage,
  }
}

export default useTxHistory
