import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  const dark = useMemo(() => pathname.startsWith("/developer-nft"), [pathname])

  return dark
}

export default useCheckTheme
