import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
  bitgetWallet,
  coinbaseWallet,
  metaMaskWallet,
  nestWallet,
  okxWallet,
  rabbyWallet,
  trustWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets"

import { CHAIN_ID, ETH_SYMBOL, EXPLORER_URL, L1_NAME, L2_NAME, RPC_URL } from "@/constants/common"
import { requireEnv } from "@/utils"

const projectId = requireEnv("REACT_APP_CONNECT_WALLET_PROJECT_ID")

const wallets = [
  {
    groupName: "Popular",
    wallets: [metaMaskWallet, coinbaseWallet, rabbyWallet, okxWallet, zerionWallet, trustWallet],
  },
  {
    groupName: "More",
    wallets: [bitgetWallet, nestWallet, walletConnectWallet],
  },
]

const BaseChain = {
  id: CHAIN_ID.L1,
  name: L1_NAME,
  nativeCurrency: {
    name: "Ether",
    symbol: ETH_SYMBOL,
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [RPC_URL.L1],
    },
  },
  blockExplorers: {
    default: {
      name: L1_NAME + "Explorer",
      url: EXPLORER_URL.L1,
    },
  },
}

const RollupChain = {
  id: CHAIN_ID.L2,
  name: L2_NAME,
  nativeCurrency: {
    name: "Ether",
    symbol: ETH_SYMBOL,
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [RPC_URL.L2],
    },
  },
  blockExplorers: {
    default: {
      name: L2_NAME + "Explorer",
      url: EXPLORER_URL.L2,
    },
  },
}

export const config = getDefaultConfig({
  wallets,
  appName: L1_NAME,
  projectId,
  chains: [RollupChain, BaseChain],
})
