import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useShowWalletConnector = () => {
  const { pathname } = useLocation()

  const showWalletConnector = useMemo(
    () => pathname.startsWith("/developer-nft") || pathname.startsWith("/bridge") || pathname.startsWith("/sessions"),
    [pathname],
  )

  return showWalletConnector
}

export default useShowWalletConnector
