import { addresses } from "@/constants"

export const switchNetwork = (chainId: number) => {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [addresses.find(address => address.chainIdDec === chainId)!.autoconnect],
  })
}
