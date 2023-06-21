import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useIsMobile from "@/hooks/useIsMobile"

const useConnectWallet = () => {
  const { connectWallet } = useWeb3Context()
  const { isMobileDevice } = useIsMobile()

  const handleConnectWallet = () => {
    if (typeof window.ethereum === "undefined" && isMobileDevice) {
      const dappUrl = window.location.href
      if (dappUrl.startsWith("https://")) {
        const url = `https://metamask.app.link/dapp/` + dappUrl.replace("https://", "")
        window.open(url)
      } else {
        alert("The url needs to start with https://")
      }
    } else {
      connectWallet()
    }
  }
  return handleConnectWallet
}

export default useConnectWallet
