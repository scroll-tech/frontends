import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useShowWalletConnector = () => {
  const pathname = usePathname()

  const showWalletConnector = useMemo(() => pathname.startsWith("/developer-nft"), [pathname])
  return showWalletConnector
}

export default useShowWalletConnector
