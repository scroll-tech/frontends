import { useMemo } from "react"

import { ClaimStatus } from "@/stores/claimStore"
import useTxStore from "@/stores/txStore"

import useLastFinalizedBatchIndex from "./useLastFinalizedBatchIndex"

const useCheckClaimStatus = tx => {
  const { lastFinalizedBatchIndex } = useLastFinalizedBatchIndex()

  const { estimatedTimeMap } = useTxStore()

  const claimStatus = useMemo(() => {
    const { assumedStatus, toBlockNumber, claimInfo } = tx

    if (assumedStatus) {
      return ClaimStatus.FAILED
    }
    if (toBlockNumber) {
      return ClaimStatus.CLAIMED
    }
    // The estimated claim time will not exceed 5 minutes.
    if (estimatedTimeMap[`claim_${tx.hash}`] + 1000 * 60 * 5 > Date.now()) {
      return ClaimStatus.CLAIMING
    }
    if (+claimInfo?.batch_index && claimInfo?.batch_index <= lastFinalizedBatchIndex) {
      return ClaimStatus.CLAIMABLE
    }
    return ClaimStatus.NOT_READY
  }, [tx, lastFinalizedBatchIndex, estimatedTimeMap])

  const claimTip = useMemo(() => {
    if (claimStatus === ClaimStatus.FAILED) {
      return "-"
    } else if (claimStatus === ClaimStatus.CLAIMABLE) {
      return "Ready to be claimed"
    } else if (claimStatus === ClaimStatus.NOT_READY) {
      return "Pending..."
    }

    return ""
  }, [claimStatus])

  return { claimStatus, claimTip }
}

export default useCheckClaimStatus
