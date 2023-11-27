import { Chain, Wallet } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import {
  braveWallet,
  coinbaseWallet,
  frameWallet,
  imTokenWallet,
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { parseUnits } from "ethers"
import produce from "immer"
import { configureChains, mainnet, sepolia } from "wagmi"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"

import { CHAIN_ID, ETH_SYMBOL, L2_NAME, RPC_URL } from "@/constants"
import { networkType, requireEnv } from "@/utils"

interface WalletConfig {
  name: string
  wallet: Wallet
  visible: boolean
}

const createWalletConfig = (name: string, walletFunction: () => Wallet, condition: boolean): WalletConfig => {
  return {
    name,
    wallet: walletFunction(),
    visible: condition,
  }
}

export const scrollChain: Chain = {
  id: CHAIN_ID.L2,
  name: L2_NAME,
  network: L2_NAME,
  iconUrl: "https://scroll.io/logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: L2_NAME,
    symbol: ETH_SYMBOL,
  },
  rpcUrls: {
    default: {
      http: [RPC_URL.L2],
    },
    public: {
      http: [RPC_URL.L2],
    },
  },
  blockExplorers: {
    default: { name: "Scrollscan", url: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2") },
  },
}

const sepoliaChain = produce(sepolia, draft => {
  draft.rpcUrls.public.http = [RPC_URL.L1 as any]
  draft.fees = {
    // adopt MetaMask params
    baseFeeMultiplier: 1,
    defaultPriorityFee() {
      return parseUnits("1.5", "gwei")
    },
  }
})

const mainnetChain = produce(mainnet, draft => {
  draft.rpcUrls.public.http = [RPC_URL.L1 as any]
  draft.fees = {
    // adopt MetaMask params
    baseFeeMultiplier: 1,
    // defaultPriorityFee: parseUnits("0.05", "gwei"),
    defaultPriorityFee() {
      return parseUnits("0.05", "gwei")
    },
  }
})

const projectId = requireEnv("REACT_APP_CONNECT_WALLET_PROJECT_ID")

const { chains, publicClient } = configureChains(
  // ankr
  [mainnetChain, sepoliaChain, scrollChain],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ],
)

const walletConfigs: WalletConfig[] = [
  createWalletConfig("MetaMask", () => metaMaskWallet({ chains, projectId }), window.ethereum?.isMetaMask === true),
  createWalletConfig("Coinbase", () => coinbaseWallet({ appName: "Scroll", chains }), window.ethereum?.isCoinbaseWallet === true),
  createWalletConfig("Brave", () => braveWallet({ chains }), window.ethereum?.isBraveWallet === true),
  createWalletConfig("Rainbow", () => rainbowWallet({ chains, projectId }), window.ethereum?.isRainbow === true),
  createWalletConfig("Safe", () => safeWallet({ chains }), window.ethereum?.isSafeWallet === true),
  createWalletConfig("Frame", () => frameWallet({ chains }), window.ethereum?.isFrame === true),
  createWalletConfig("imToken", () => imTokenWallet({ chains, projectId }), window.ethereum?.isImToken === true),
  createWalletConfig("Okx Wallet", () => okxWallet({ chains, projectId }), window.okxwallet?.isOKExWallet || window.okxwallet?.isOkxWallet === true),
  createWalletConfig("Rabby", () => rabbyWallet({ chains }), window.ethereum?.isRabby && !window.ethereum?.isMetaMask === true),
  // Add any additional wallets here
]

const activeWallets: Wallet[] = walletConfigs.filter(wallet => wallet.visible).map(wallet => wallet.wallet)

const Wallets = [
  // TODO: rainbowkit/injectedWallet.ts "Browser Wallet" and "injectedWallet.svg" -> need to detect automaticlly
  ...activeWallets,
  injectedWallet({ chains }),
  walletConnectWallet({
    projectId,
    chains,
    options: {
      metadata: {
        name: "Scroll",
        description: `Get started with our ${networkType} now.`,
        url: "https://scroll.io/",
        icons: ["https://scroll.io/logo_walletconnect.png"],
      },
      qrModalOptions: {
        explorerRecommendedWalletIds: [
          // metamask
          "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
          // trust
          "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
          // uniswap
          "c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a",
        ],
      },
    },
  } as any),
]

export { Wallets, chains, publicClient }
