import { useMemo } from "react"
import { useLocation, useMatch } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  // TODO:
  const isSkelly = useMatch("/scroll-skelly/*")
  // const isBadgeDetail = useMatch("/scroll-skelly/badge/:id")
  const dark = useMemo(() => {
    return (
      [
        "/developer-nft/check-eligibility",
        "/developer-nft/mint",
        "/scroll-skelly",
        "/scroll-skelly/mint",
        "/scroll-skelly/dashboard",
        "/scroll-skelly/badge",
      ].includes(pathname) || isSkelly
    )
  }, [pathname])

  return dark
}

export default useCheckTheme
