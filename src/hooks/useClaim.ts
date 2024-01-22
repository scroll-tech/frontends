import { ethers } from "ethers"
import { useState } from "react"

import L1ScrollMessenger from "@/assets/abis/L1ScrollMessenger.json"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTxStore from "@/stores/txStore"
import { CLAIM_OFFSET_TIME } from "@/stores/utils"
import { requireEnv } from "@/utils"

export function useClaim(props) {
  const { tx } = props
  const { networksAndSigners } = useBridgeContext()
  const [loading, setLoading] = useState(false)
  const { addEstimatedTimeMap } = useTxStore()
  const { chainId } = useRainbowContext()

  const relayMessageWithProof = async () => {
    const contract = new ethers.Contract(requireEnv("REACT_APP_L1_SCROLL_MESSENGER"), L1ScrollMessenger, networksAndSigners[chainId as number].signer)
    const {
      from,
      to,
      value,
      nonce,
      message,
      proof: { batch_index, merkle_proof },
    } = tx.claimInfo

    try {
      setLoading(true)
      addEstimatedTimeMap(`progress_${tx.hash}`, Date.now() + CLAIM_OFFSET_TIME)
      const result = await contract.relayMessageWithProof(from, to, value, nonce, message, {
        batchIndex: batch_index,
        merkleProof: merkle_proof,
      })
      result
        .wait()
        .then(() => {
          addEstimatedTimeMap(`progress_${tx.hash}`, Date.now() + CLAIM_OFFSET_TIME)
        })
        .catch(error => {
          // TRANSACTION_REPLACED or TIMEOUT
          addEstimatedTimeMap(`progress_${tx.hash}`, 0)
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      addEstimatedTimeMap(`progress_${tx.hash}`, 0)
      setLoading(false)
    }
  }

  return {
    relayMessageWithProof,
    loading,
  }
}
