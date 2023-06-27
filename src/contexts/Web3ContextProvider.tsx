import injectedModule from "@web3-onboard/injected-wallets"
import { init, useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react"
import { ethers, getAddress } from "ethers"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { networks } from "@/constants"
import useTxStore from "@/stores/txStore"
import { convertHexadecimal, toHexadecimal } from "@/utils"
import { loadState, saveState } from "@/utils/localStorage"
import logger from "@/utils/logger"
import { CONNECTED_WALLETS as cacheKey } from "@/utils/storageKey"

type Props = {
  onboard: any
  provider: ethers.BrowserProvider | undefined
  walletCurrentAddress?: string
  balance?: bigint
  chainId?: number
  connectWallet: () => void
  disconnectWallet: () => void
  walletName: string | undefined
  checkConnectedChainId: (chainId: number) => boolean
}

const Web3Context = createContext<Props | undefined>(undefined)

const injected = injectedModule()

// const INFURA_ID = "84842078b09946638c03157f83405213";

const web3Onboard = init({
  wallets: [injected],
  chains: networks.map(({ chainId, nativeTokenSymbol, name, rpcUrl, imageUrl }) => ({
    id: toHexadecimal(chainId),
    token: nativeTokenSymbol as string,
    label: name,
    rpcUrl: rpcUrl as string,
  })),
  appMetadata: {
    name: "Scroll",
    icon: "/logo.svg",
    description: "Scroll Portal",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "BlockWallet", url: "https://blockwallet.io" },
    ],
  },
  // i18n: {
  //   en: {
  //     connect: {
  //       selectingWallet: {
  //         header: "select Wallet",
  //       },
  //     },
  //   },
  // },
  connect: {
    showSidebar: false,
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
})

const Web3ContextProvider = ({ children }: any) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | undefined>()
  const [walletConnected, setWalletConnected] = useState(false)

  const [onboard, setOnboard] = useState<any>(null)

  const [{ wallet }, connect, disconnect] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()
  const connectedWallets = useWallets()

  const { clearTransactions } = useTxStore()

  const checkWalletConnected = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum, "any")
      try {
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setWalletConnected(true)
        } else {
          setWalletConnected(false)
        }
      } catch (err) {
        setWalletConnected(false)
      }
    } else {
      setWalletConnected(false)
    }
  }

  useEffect(() => {
    checkWalletConnected()
    setOnboard(web3Onboard)
  }, [])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label)
    saveState(cacheKey, connectedWalletsLabelArray)
  }, [connectedWallets])

  useEffect(() => {
    if (!wallet?.provider) {
      setProvider(undefined)
    } else {
      const ethersProvider = new ethers.BrowserProvider(wallet.provider, "any")
      setProvider(ethersProvider)
    }
  }, [wallet])

  useEffect(() => {
    const previouslyConnectedWallets = loadState(cacheKey)
    if (walletConnected && previouslyConnectedWallets?.length) {
      const setWalletFromLocalStorage = async () => {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        })
      }
      setWalletFromLocalStorage()
    } else {
      clearTransactions()
    }
  }, [onboard, connect, walletConnected])

  const connectWallet = () => {
    try {
      clearTransactions()
      connect()
      setTimeout(() => {
        let shadowRoot = (document as any).querySelector("onboard-v2").shadowRoot
        let svgBox = shadowRoot.querySelector(".svg-box")
        svgBox.style.display = "flex"
        let noticeContainer = shadowRoot.querySelector(".notice-container")
        noticeContainer.style.flex = "unset"
      }, 0)
    } catch (err) {
      logger.error(err)
    }
  }

  const disconnectWallet = () => {
    try {
      clearTransactions()
      wallet && disconnect(wallet)
      localStorage.removeItem("connectedWallets")
    } catch (error) {
      logger.error(error)
    }
  }

  const checkConnectedChainId = useCallback(
    (chainId: number): boolean => {
      if (connectedChain && chainId === convertHexadecimal(connectedChain.id)) {
        return true
      }
      return false
    },
    [connectedChain],
  )

  const walletCurrentAddress = useMemo(() => (wallet?.accounts[0]?.address ? getAddress(wallet.accounts[0].address) : undefined), [wallet])

  return (
    <Web3Context.Provider
      value={{
        onboard,
        provider,
        walletCurrentAddress,
        chainId: connectedChain ? convertHexadecimal(connectedChain.id) : undefined,
        connectWallet,
        disconnectWallet,
        walletName: wallet?.label,
        checkConnectedChainId,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useRainbowContext() {
  const ctx = useContext(Web3Context)
  if (ctx === undefined) {
    throw new Error("useApp must be used within Web3Provider")
  }
  return ctx
}

export default Web3ContextProvider
