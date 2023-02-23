import { addresses } from "@/constants"

export const switchNetwork = async (chainId: number) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + chainId.toString() }],
    })
    return true
  } catch (error) {
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [addresses.find(address => address.chainIdDec === chainId)!.autoconnect],
    })
  }
}
