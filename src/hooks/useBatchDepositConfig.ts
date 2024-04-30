import { ethers } from "ethers"

import { CHAIN_ID } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"

export function useBatchDepositConfig() {
  const { networksAndSigners } = useBridgeContext()

  const getBatchDepositConfigsByToken = async selectedToken => {
    return networksAndSigners[CHAIN_ID.L1].batchBridgeGateway.configs(selectedToken.address || ethers.ZeroAddress)
  }

  return {
    getBatchDepositConfigsByToken,
  }
}
