"use client"

import { RainbowKitProvider, connectorsForWallets, useConnectModal } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { type WalletClient } from "@wagmi/core"
import { BrowserProvider, ethers } from "ethers"
import { createContext, useCallback, useContext, useMemo } from "react"
import { WagmiConfig, createConfig, useAccount, useDisconnect, useNetwork, useWalletClient } from "wagmi"

import { Wallets, chains, publicClient } from "./configs"

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

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: Wallets,
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
