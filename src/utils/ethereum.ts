import { getWalletClient } from "@wagmi/core"

import { USER_TOKEN_LIST } from "@/constants/storageKey"
import { config } from "@/contexts/RainbowProvider/configs"
import { isAlternativeGasTokenEnabled } from "@/utils"
import { loadState } from "@/utils/localStorage"

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
      const chainToAdd = {
        ...chains.find(item => item.id === chainId)!,
      }

      if (isAlternativeGasTokenEnabled) {
        const currentUserTokens = loadState(USER_TOKEN_LIST) || []
        const nativeCurrency = currentUserTokens.find(item => item.chainId === chainId && item.native)!
        if (nativeCurrency) {
          chainToAdd.nativeCurrency = nativeCurrency
        }
      }

      await walletClient?.addChain({
        chain: chainToAdd,
      })
    }
  }
}
