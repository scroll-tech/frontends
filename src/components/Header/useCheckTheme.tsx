import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  const dark = useMemo(() => pathname === "/developer-nft/coming-soon", [pathname])

  return dark
}

export default useCheckTheme
