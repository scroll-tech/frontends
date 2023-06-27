import React, { createContext, useEffect, useState } from "react"

import { useRainbowContext } from "@/contexts/RainbowProvider"

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
  const { walletCurrentAddress } = useRainbowContext()
  const [hasPermission, setHasPermission] = useState(false)
  const [loading] = useState(false)

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
