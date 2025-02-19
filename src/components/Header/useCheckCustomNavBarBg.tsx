import { usePathname } from "next/navigation"
import { useEffect, useMemo } from "react"

import { useTheme } from "@mui/material"
import useScrollTrigger from "@mui/material/useScrollTrigger"

import useCheckTheme from "./useCheckTheme"

const TRANSPARENT_BG_PAGE_LIST = ["/", "/ecosystem", "/sessions"]
// themeBackground
const CUSTOM_BG_PAGE_MAP = {
  "/brand-kit": "brand",
  "/join-us": "normal",
  "/sticker-vote": "brand",
  "/sticker-winners": "brand",
}

const useCheckCustomNavBarBg = (props = { isHover: false }) => {
  const { isHover } = props
  const theme = useTheme()
  const dark = useCheckTheme()
  const isScrolling = useScrollTrigger({ disableHysteresis: true, threshold: 10 })

  const pathname = usePathname()

  useEffect(() => {
    let themeBg = theme.vars.palette.themeBackground.light
    if (CUSTOM_BG_PAGE_MAP[pathname]) {
      themeBg = theme.vars.palette.themeBackground[CUSTOM_BG_PAGE_MAP[pathname]]
    } else if (dark) {
      themeBg = theme.vars.palette.themeBackground.dark
    }

    let navbarBg = themeBg

    if (TRANSPARENT_BG_PAGE_LIST.includes(pathname!)) {
      navbarBg = isScrolling || isHover ? themeBg : "transparent"
    }

    const root: any = document.querySelector(":root")

    root!.style.setProperty("--theme-bg", themeBg)
    root!.style.setProperty("--navbar-bg", navbarBg)
  }, [pathname, isScrolling, isHover])
}

export default useCheckCustomNavBarBg
