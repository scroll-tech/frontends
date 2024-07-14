import { useMemo } from "react"
import { useLocation, useMatch } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  // TODO:
  const isCanvas = useMatch("/canvas/*")
  // const isBadgeDetail = useMatch("/canvas/badge/:id")
  const dark = useMemo(() => {
    return ["/developer-nft/check-eligibility", "/developer-nft/mint"].includes(pathname) || isCanvas
  }, [pathname])

  return dark
}

export default useCheckTheme
