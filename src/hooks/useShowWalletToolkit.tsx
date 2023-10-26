import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useShowWalletConnector = () => {
  const { pathname } = useLocation()

  const showWalletConnector = useMemo(() => pathname === "/developer-nft/check-eligibility" || pathname.startsWith("/bridge"), [pathname])

  return showWalletConnector
}

export default useShowWalletConnector
