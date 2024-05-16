import { useMemo } from "react"
import { useLocation } from "react-router-dom"

import useScrollTrigger from "@mui/material/useScrollTrigger"

const TRANSPARENT_BG_PAGE_LIST = ["/story", "/sessions"]
// themeBackground
const CUSTOM_BG_PAGE_MAP = {
  "/brand-kit": "brand",
  "/join-us": "normal",
  "/sticker-vote": "brand",
  "/sticker-winners": "brand",
}

const useCheckCustomNavBarBg = (props = { isHover: false }) => {
  const { isHover } = props
  const isScrolling = useScrollTrigger({ disableHysteresis: true, threshold: 10 })

  const { pathname } = useLocation()
  const isNoBgPage = useMemo(() => TRANSPARENT_BG_PAGE_LIST.includes(pathname), [pathname])

  const navbarBg = useMemo(() => {
    if (isNoBgPage) {
      return isScrolling || isHover ? "" : "transparent"
    }
    return CUSTOM_BG_PAGE_MAP[pathname] || ""
  }, [isNoBgPage, isScrolling, pathname, isHover])
  return navbarBg
}

export default useCheckCustomNavBarBg
