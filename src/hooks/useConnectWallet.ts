import { isMobile } from "react-device-detect"

import { useRainbowContext } from "@/contexts/RainbowProvider"

const useConnectWallet = () => {
  const { connect } = useRainbowContext()

  const handleConnectWallet = () => {
    if (typeof window.ethereum === "undefined" && isMobile) {
      const dappUrl = window.location.href
      if (dappUrl.startsWith("https://")) {
        const url = `https://metamask.app.link/dapp/` + dappUrl.replace("https://", "")
        window.open(url)
      } else {
        alert("The url needs to start with https://")
      }
    } else {
      connect()
    }
  }
  return handleConnectWallet
}

export default useConnectWallet
