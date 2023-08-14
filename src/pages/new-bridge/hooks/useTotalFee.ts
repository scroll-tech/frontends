import { useMemo } from "react"

import { CHAIN_ID } from "@/constants"
import { useAsyncMemo, usePriceFee } from "@/hooks"

const useTotalFee = (selectedToken: any, estimatedGasCost?: bigint) => {
  const { getPriceFee } = usePriceFee()

  const isL1 = useMemo(() => selectedToken.chainId === CHAIN_ID.L1, [selectedToken])

  const fee = useAsyncMemo(async () => {
    const relayFee = await getPriceFee(selectedToken, isL1)
    return (estimatedGasCost ?? BigInt(0)) + relayFee
  }, [selectedToken, estimatedGasCost, isL1])

  return fee ?? BigInt(0)
}
export default useTotalFee
