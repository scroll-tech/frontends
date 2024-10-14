import { getWalletClient } from "@wagmi/core"
import { isError } from "ethers"
import { isNumber } from "lodash"

import { CHAIN_ID } from "@/constants"
import { config } from "@/contexts/RainbowProvider/configs"
import { DepositBatchMode } from "@/stores/batchBridgeStore"

export const switchNetwork = async (chainId: number) => {
  const walletClient = await getWalletClient(config)
  try {
    await walletClient?.switchChain({
      id: chainId,
    })
  } catch (error) {
    // 4902 or -32603 mean chain doesn't exist
    if (~error.message.indexOf("wallet_addEthereumChain") || error.code === 4902 || error.code === -32603) {
      // const { chains } = getNetwork()
      const chains = config.chains
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

export function generateTypedData(address, sha256 = "", nftContract = "0x0000000000000000000000000000000000000000", tokenID = "", timestamp) {
  const domain = {
    name: "Scroll Avatar",
    version: "1",
    chainId: CHAIN_ID.L2,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  }

  const types = {
    Avatar: [
      { name: "address", type: "address" },
      { name: "sha256", type: "string" },
      { name: "nftContract", type: "address" },
      { name: "tokenID", type: "string" },
      { name: "timestamp", type: "string" },
    ],
  }

  return {
    domain,
    types,
    account: address,
    primaryType: "Avatar",
    message: {
      address,
      nftContract,
      sha256,
      tokenID,
      timestamp,
    },
  }
}
