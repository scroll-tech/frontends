import { getNetwork, getWalletClient } from "@wagmi/core"
import { isError } from "ethers"
import { isNumber } from "lodash"

import { DepositBatchMode } from "@/stores/batchBridgeStore"

export const switchNetwork = async (chainId: number) => {
  const walletClient = await getWalletClient()
  try {
    await walletClient?.switchChain({
      id: chainId,
    })
  } catch (error) {
    // 4902 or -32603 mean chain doesn't exist
    if (~error.message.indexOf("wallet_addEthereumChain") || error.code === 4902 || error.code === -32603) {
      const { chains } = getNetwork()
      await walletClient?.addChain({
        chain: chains.find(item => item.id === chainId)!,
      })
    }
  }
}

export const checkApproved = (needApproval, mode: DepositBatchMode) => {
  const flag = mode === DepositBatchMode.Economy ? 1 : 2
  return (isNumber(needApproval) && !(needApproval & flag)) || needApproval === false
}

export const isUserRejected = error => {
  return isError(error, "ACTION_REJECTED")
}
