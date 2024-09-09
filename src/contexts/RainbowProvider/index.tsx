"use client"

import { RainbowKitProvider, getDefaultConfig, useConnectModal } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserProvider } from "ethers"
import { createContext, useCallback, useContext, useMemo } from "react"
import { type Config, WagmiProvider, useAccount, useConnectorClient, useDisconnect } from "wagmi"

import { configs } from "./configs"

type RainbowContextProps = {
  provider: BrowserProvider | null
  walletCurrentAddress?: `0x${string}`
  chainId?: number
  connect: () => void
  disconnect: () => void
  walletName: string | undefined
  checkConnectedChainId: (_chainId: number) => boolean
}

export const defaultConfig = getDefaultConfig(configs)

const RainbowContext = createContext<RainbowContextProps | undefined>(undefined)

const queryClient = new QueryClient()

function clientToProvider(walletClient) {
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
    <WagmiProvider config={defaultConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en" modalSize="compact">
          <Web3ContextProvider>{props.children}</Web3ContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

const Web3ContextProvider = props => {
  const { connector: activeConnector, address, isConnected, chainId } = useAccount()
  const { data: client } = useConnectorClient<Config>({ chainId })

  const { openConnectModal } = useConnectModal()
  const { disconnect } = useDisconnect()

  const provider = useMemo(() => {
    if (client && chainId && chainId === client.chain?.id) return clientToProvider(client)
    return null
  }, [client, chainId])

  const checkConnectedChainId = useCallback(
    id => {
      return isConnected && chainId === id
    },
    [isConnected, chainId],
  )

  return (
    <RainbowContext.Provider
      value={{
        provider,
        walletCurrentAddress: address,
        walletName: activeConnector?.name,
        chainId,
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
