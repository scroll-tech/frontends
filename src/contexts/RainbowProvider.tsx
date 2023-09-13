import { Chain, RainbowKitProvider, connectorsForWallets, useConnectModal } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { braveWallet, coinbaseWallet, injectedWallet, metaMaskWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets"
import { type WalletClient } from "@wagmi/core"
import { BrowserProvider, ethers } from "ethers"
import produce from "immer"
import { createContext, useCallback, useContext, useMemo } from "react"
import { WagmiConfig, configureChains, createConfig, sepolia, useAccount, useDisconnect, useNetwork, useWalletClient } from "wagmi"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"

import { CHAIN_ID, ETH_SYMBOL, RPC_URL, TESTNET_NAME } from "@/constants"
import { requireEnv } from "@/utils"

type RainbowContextProps = {
  provider: ethers.BrowserProvider | null
  walletCurrentAddress?: `0x${string}`
  chainId?: number
  connect: () => void
  disconnect: () => void
  walletName: string | undefined
  checkConnectedChainId: (chainId: number) => boolean
}

export const scrollChain: Chain = {
  id: CHAIN_ID.L2,
  name: TESTNET_NAME,
  network: TESTNET_NAME,
  iconUrl: "https://scroll.io/logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: TESTNET_NAME,
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
    default: { name: "Blockscout", url: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2") },
  },
}

const sepoliaChain = produce(sepolia, draft => {
  draft.rpcUrls.public.http = [RPC_URL.L1 as any]
})

const projectId = requireEnv("REACT_APP_CONNECT_WALLET_PROJECT_ID")

const RainbowContext = createContext<RainbowContextProps | undefined>(undefined)

const { chains, publicClient } = configureChains(
  // ankr
  [sepoliaChain, scrollChain],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ],
)

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      // TODO: rainbowkit/injectedWallet.ts "Browser Wallet" and "injectedWallet.svg" -> need to detect automaticlly
      injectedWallet({ chains }),
      braveWallet({ chains }),
      coinbaseWallet({ appName: "Scroll", chains }),
      metaMaskWallet({ chains, projectId }),
      walletConnectWallet({
        projectId,
        chains,
        options: {
          metadata: {
            name: "Scroll",
            description: "Get started with our testnet now.",
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
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

function walletClientToSigner(walletClient: WalletClient) {
  const { chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  return provider
}

const RainbowProvider = props => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <Web3ContextProvider>{props.children}</Web3ContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

const Web3ContextProvider = props => {
  const { data: walletClient } = useWalletClient()

  const { openConnectModal } = useConnectModal()
  const { disconnect } = useDisconnect()

  const { connector: activeConnector, address, isConnected } = useAccount()
  const { chain } = useNetwork()

  const provider = useMemo(() => {
    if (walletClient) return walletClientToSigner(walletClient)
    return null
  }, [walletClient])

  const checkConnectedChainId = useCallback(
    chainId => {
      return isConnected && chain?.id === chainId
    },
    [isConnected, chain],
  )

  return (
    <RainbowContext.Provider
      value={{
        provider,
        walletCurrentAddress: address,
        walletName: activeConnector?.name,
        chainId: chain?.id,
        connect: openConnectModal as () => void,
        disconnect,
        checkConnectedChainId,
      }}
    >
      {props.children}
    </RainbowContext.Provider>
  )
}

export function useRainbowContext() {
  const ctx = useContext(RainbowContext)
  if (!ctx) {
    throw new Error("Rainbow error")
  }
  return ctx
}

export default RainbowProvider
