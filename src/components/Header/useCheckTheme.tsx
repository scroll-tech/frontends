import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  const dark = useMemo(() => ["/developer-nft/check-eligibility", "/developer-nft/mint"].includes(pathname), [pathname])

  return dark
}

export default useCheckTheme
