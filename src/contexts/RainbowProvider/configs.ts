import {
  bitgetWallet,
  coin98Wallet,
  coinbaseWallet,
  metaMaskWallet,
  nestWallet,
  okxWallet,
  rabbyWallet,
  tokenPocketWallet,
  trustWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { Chain, mainnet, scroll, scrollSepolia, sepolia } from "@wagmi/core/chains"
import { parseUnits } from "ethers"
import produce from "immer"

// import { RPC_URL } from "@/constants"
import { BinanceWallet } from "./walletConnectors/binanceWallet/binanceWallet"

const projectId = process.env.NEXT_PUBLIC_CONNECT_WALLET_PROJECT_ID

const RPC_URL = {
  L1: process.env.NEXT_PUBLIC_EXTERNAL_RPC_URI_L1,
  L2: process.env.NEXT_PUBLIC_EXTERNAL_RPC_URI_L2,
}

const wallets = [
  {
    groupName: "Popular",
    wallets: [metaMaskWallet, coinbaseWallet, rabbyWallet, okxWallet, zerionWallet, trustWallet, BinanceWallet],
  },
  {
    groupName: "More",
    wallets: [bitgetWallet, nestWallet, coin98Wallet, tokenPocketWallet, walletConnectWallet],
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

export const configs = {
  wallets,
  appName: "Scroll",
  projectId,
  chains: [mainnetChain, sepoliaChain as unknown as Chain, scroll, scrollSepolia],
  ssr: true,
}
