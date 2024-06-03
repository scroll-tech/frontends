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
import { Chain, mainnet, scroll, scrollSepolia, sepolia } from "@wagmi/core/chains"
import { parseUnits } from "ethers"
import produce from "immer"

import { RPC_URL } from "@/constants"
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

const sepoliaChain = produce(sepolia, draft => {
  draft.rpcUrls.default.http = [RPC_URL.L1 as any]
  draft.fees = {
    // adopt MetaMask params
    baseFeeMultiplier: 1,
    defaultPriorityFee() {
      return parseUnits("1.5", "gwei")
    },
  }
})

const mainnetChain = produce(mainnet, draft => {
  draft.rpcUrls.default.http = [RPC_URL.L1 as any]
  draft.fees = {
    // adopt MetaMask params
    baseFeeMultiplier: 1,
    // defaultPriorityFee: parseUnits("0.05", "gwei"),
    defaultPriorityFee() {
      return parseUnits("0.05", "gwei")
    },
  }
})

export const config = getDefaultConfig({
  wallets,
  appName: "Scroll",
  projectId,
  chains: [mainnetChain, sepoliaChain as unknown as Chain, scroll, scrollSepolia],
})
