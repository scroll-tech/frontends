import { ethers } from "ethers"
import useSWR from "swr"

import L1MessageQueue from "@/assets/abis/L1MessageQueue.json"
import L1ScrollMessenger from "@/assets/abis/L1ScrollMessenger.json"
import { CHAIN_ID } from "@/constants"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
// Fixed typo here
import { requireEnv } from "@/utils"

const REFRESH_INTERVAL_MS = 3000 // Clearer constant for refresh interval

const usePendingQueue = (msgHash, msgNonce = 111) => {
  const { networksAndSigners } = useBrigeContext() // Fixed typo here
  const { signer: deployer, provider } = networksAndSigners[CHAIN_ID.L1]

  const queue = new ethers.Contract(requireEnv("REACT_APP_L1_MESSAGE_QUEUE"), L1MessageQueue, deployer)
  const messenger = new ethers.Contract(requireEnv("REACT_APP_L1_SCROLL_MESSENGER"), L1ScrollMessenger, deployer)

  async function fetchPendingQueueIndex() {
    if (!provider) {
      // Return a default or null value when the provider is not available
      return null
    }
    try {
      const pendingQueueIndex = await queue.pendingQueueIndex()
      const [, lastIndex] = await messenger.replayStates(msgHash)
      const queueIndex = lastIndex ? lastIndex : BigInt(msgNonce)
      return pendingQueueIndex < queueIndex
    } catch (error) {
      console.error("Error fetching pending queue index:", error) // Error logging
      return null
    }
  }

  const { data, error, isValidating } = useSWR(provider ? "pendingQueueIndex" : null, fetchPendingQueueIndex, {
    refreshInterval: REFRESH_INTERVAL_MS,
  })

  return {
    loading: isValidating,
    isInPendingQueue: data,
    error,
  }
}

export default usePendingQueue
