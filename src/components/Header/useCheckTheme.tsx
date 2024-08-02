import { useMemo } from "react"
import { useLocation, useMatch } from "react-router-dom"

const useCheckTheme = () => {
  const { pathname } = useLocation()
  // TODO:
  const isCanvas = useMatch("/canvas/*")
  const dark = useMemo(() => {
    return ["/developer-nft/check-eligibility", "/developer-nft/mint", "/canvas-badge"].includes(pathname) || isCanvas
  }, [pathname])

  return dark
}

export default useCheckTheme
