import { RainbowKitProvider, useConnectModal } from "@rainbow-me/rainbowkit"
import { Chain, connectorsForWallets } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { coinbaseWallet, injectedWallet, metaMaskWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets"
import { type WalletClient } from "@wagmi/core"
import { BrowserProvider, ethers } from "ethers"
import { createContext, useCallback, useContext, useMemo } from "react"
import { WagmiConfig, configureChains, createConfig, useAccount, useDisconnect, useNetwork, useWalletClient } from "wagmi"
import { goerli } from "wagmi/chains"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"

import { ChainId, ETH_SYMBOL, RPCUrl, TESTNET_NAME } from "@/constants"
import { requireEnv } from "@/utils"

type RainbowContextProps = {
  provider: ethers.BrowserProvider | null
  walletCurrentAddress?: string
  chainId?: number
  connect: () => void
  disconnect: () => void
  walletName: string | undefined
  checkConnectedChainId: (chainId: number) => boolean
}

const scrollChain: Chain = {
  id: ChainId.SCROLL_LAYER_2,
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
      http: [RPCUrl.SCROLL_LAYER_2],
    },
    public: {
      http: [RPCUrl.SCROLL_LAYER_2],
    },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2") },
  },
  // testnet: true,
}

const projectId = requireEnv("REACT_APP_CONNECT_WALLET_PROJECT_ID")

const RainbowContext = createContext<RainbowContextProps | undefined>(undefined)

const { chains, publicClient } = configureChains(
  [goerli, scrollChain],
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
      injectedWallet({ chains }),
      coinbaseWallet({ appName: "Scroll", chains }),
      // metamask is belong to injected wallet
      metaMaskWallet({ chains, projectId }),
      // braveWallet({ chains }),
      walletConnectWallet({
        projectId,
        chains,
        options: {
          metadata: {
            name: "Scroll",
            description: "Get started with our testnet now.",
            url: "https://scroll.io/",
            icons: ["https://scroll.io/logo.png"],
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
  // const signer = new JsonRpcSigner(provider, account.address)
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

  // console.log(walletClient, "walletClient")
  // console.log(activeConnector, "activeConnector")
  // console.log(chain, "chain")
  // console.log(provider, "provider")

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
