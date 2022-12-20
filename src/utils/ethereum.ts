import { Addresses } from "@/constants"

export const switchNetwork = chainId => {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [Addresses[chainId].autoconnect],
  })
}
