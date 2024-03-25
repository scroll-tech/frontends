import { useMemo } from "react"
import { useLocation, useMatch } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  // TODO:
  const isCanvas = useMatch("/scroll-canvas/*")
  // const isBadgeDetail = useMatch("/scroll-canvas/badge/:id")
  const dark = useMemo(() => {
    return (
      [
        "/developer-nft/check-eligibility",
        "/developer-nft/mint",
        "/scroll-canvas",
        "/scroll-canvas/mint",
        "/scroll-canvas/dashboard",
        "/scroll-canvas/badge",
      ].includes(pathname) || isCanvas
    )
  }, [pathname])

  return dark
}

export default useCheckTheme
