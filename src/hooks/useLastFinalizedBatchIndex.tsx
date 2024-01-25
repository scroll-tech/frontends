import { ethers } from "ethers"
import useSWR from "swr"

import ScrollChain from "@/assets/abis/ScrollChain.json"
import { CHAIN_ID } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { requireEnv } from "@/utils"

const useLastFinalizedBatchIndex = () => {
  const { networksAndSigners } = useBridgeContext()

  async function fetchLastFinalizedBatchIndex() {
    const provider = networksAndSigners[CHAIN_ID.L1].provider
    try {
      if (!provider) {
        return null
      }
      const scrollChain = new ethers.Contract(requireEnv("REACT_APP_SCROLL_CHAIN"), ScrollChain, provider)
      return await scrollChain.lastFinalizedBatchIndex()
    } catch (error) {}
  }

  const { data, error, isLoading } = useSWR(() => "lastFinalizedBatchIndex", fetchLastFinalizedBatchIndex, {
    refreshInterval: 3e3,
  })
  return {
    loading: isLoading,
    lastFinalizedBatchIndex: data || 0,
    error,
  }
}

export default useLastFinalizedBatchIndex
