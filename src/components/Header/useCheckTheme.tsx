import { useMemo } from "react"
import { useLocation, useMatch } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  const isInvite = useMatch("/scroll-skelly/invite/:code")

  const isBadgeDetail = useMatch("/scroll-skelly/badge/:badgeContract/:id")
  const dark = useMemo(() => {
    return (
      [
        "/developer-nft/check-eligibility",
        "/developer-nft/mint",
        "/scroll-skelly",
        "/scroll-skelly/mint",
        "/scroll-skelly/dashboard",
        "/scroll-skelly/badge",
      ].includes(pathname) ||
      isInvite ||
      isBadgeDetail
    )
  }, [pathname])

  return dark
}

export default useCheckTheme
