import { parseUnits } from "ethers"
import { useMemo } from "react"

const useTransactionBuffer = selectedToken => {
  const transactionBuffer = useMemo(() => {
    if (selectedToken.native) {
      return selectedToken.chainId === 1 ? parseUnits("0.001", "ether") : parseUnits("0.001", "ether")
    }
    return BigInt(0)
  }, [selectedToken])

  return transactionBuffer
}

export default useTransactionBuffer
