import { Addresses } from "@/constants";

export const switchNetwork = (networkId) => {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [Addresses[networkId].autoconnect],
  });
};
