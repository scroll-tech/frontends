import { addresses } from "@/constants"

export const switchNetwork = async (chainId: number) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + chainId.toString(16) }],
    })
    return true
  } catch (error) {
    // 4902 or -32603 mean chain doesn't exist
    if (~error.message.indexOf("wallet_addEthereumChain") || error.code === 4902 || error.code === -32603) {
      return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [addresses.find(address => address.chainIdDec === chainId)!.autoconnect],
      })
    }
  }
}
