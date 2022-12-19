import React, { useEffect, useState, useContext, createContext } from "react"
import LC from "leancloud-storage"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

export const WalletConnectedStatus = {
  INITIALIZING: "initializing",
  UNAVAILABLE: "unavailable",
  NOT_CONNECTED: "notConnected",
  CONNECTING: "connecting",
  CONNECTED: "connected",
}

export interface WhitelistContextProps {
  hasPermission: boolean
  loading: boolean
}
interface Props {
  fallback: (hasPermission: boolean, loading: boolean) => React.ReactElement
  children: React.ReactNode
}

const WhitelistContext = createContext<WhitelistContextProps>({
  hasPermission: false,
  loading: false,
})

export const WhitelistContextProvider = (props: Props) => {
  const { walletCurrentAddress } = useWeb3Context()
  const [hasPermission, setHasPermission] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // LC.init({
    //   appId: "hvIeDclG2pt2nzAdbKWM0qms-MdYXbMMI",
    //   appKey: "lKObgvpdxLT2JK839oxSM4Fn",
    //   serverURL: "https://leancloud.scroll.io",
    //   serverURLs: "https://leancloud.scroll.io",
    // });
  }, [])

  useEffect(() => {
    if (walletCurrentAddress) {
      setHasPermission(true)
    } else {
      setHasPermission(false)
    }
  }, [walletCurrentAddress])
  if (!hasPermission) {
    return props.fallback(hasPermission, loading)
  }

  return <WhitelistContext.Provider value={{ hasPermission, loading }}>{props.children}</WhitelistContext.Provider>
}

export const useFaucet = () => useContext(WhitelistContext)
