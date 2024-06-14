import { RainbowKitProvider, useConnectModal } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserProvider, ethers } from "ethers"
import { createContext, useCallback, useContext, useMemo } from "react"
import { WagmiProvider, useAccount, useDisconnect, useWalletClient } from "wagmi"

import { config } from "./configs"

type RainbowContextProps = {
  provider: ethers.BrowserProvider | null
  walletCurrentAddress?: `0x${string}`
  chainId?: number
  connect: () => void
  disconnect: () => void
  walletName: string | undefined
  checkConnectedChainId: (chainId: number) => boolean
}

const RainbowContext = createContext<RainbowContextProps | undefined>(undefined)

const queryClient = new QueryClient()

function walletClientToSigner(walletClient) {
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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en" modalSize="compact">
          <Web3ContextProvider>{props.children}</Web3ContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

const Web3ContextProvider = props => {
  const { data: walletClient } = useWalletClient()

  const { openConnectModal } = useConnectModal()
  const { disconnect } = useDisconnect()

  const { connector: activeConnector, address, isConnected, chain } = useAccount()

  const provider = useMemo(() => {
    if (walletClient && chain && chain.id === walletClient.chain.id) return walletClientToSigner(walletClient)
    return null
  }, [walletClient, chain])

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
