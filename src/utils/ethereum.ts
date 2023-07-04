import { getNetwork, getWalletClient } from "@wagmi/core"

export const switchNetwork = async (chainId: number) => {
  const walletClient = await getWalletClient()
  try {
    await walletClient?.switchChain({
      id: chainId,
    })
  } catch (error) {
    // 4001 means user rejected the request
    if (error.code === 4001) {
      throw error
    }
    // 4902 or -32603 mean chain doesn't exist
    if (~error.message.indexOf("wallet_addEthereumChain") || error.code === 4902 || error.code === -32603) {
      const { chains } = getNetwork()
      await walletClient?.addChain({
        chain: chains.find(item => item.id === chainId)!,
      })
    }
  }
}
