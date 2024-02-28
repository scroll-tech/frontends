import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  // const isInvite = useMatch("/invite/:code")
  const dark = useMemo(() => {
    return [
      "/developer-nft/check-eligibility",
      "/developer-nft/mint",
      "/scroll-skelly",
      "/scroll-skelly/mint",
      "/scroll-skelly/dashboard",
      "/scroll-skelly/badge",
    ].includes(pathname)
    // || isInvite
  }, [pathname])

  return dark
}

export default useCheckTheme
