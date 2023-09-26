import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useCheckShowWalletConnector = () => {
  const { pathname } = useLocation()

  const showWalletConnector = useMemo(() => pathname.startsWith("/developer-nft"), [pathname])

  return showWalletConnector
}

export default useCheckShowWalletConnector
