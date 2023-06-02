import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { AppBar, Slide } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import { styled } from "@mui/system"

import { navigations } from "./constants"
import DesktopNav from "./desktop_header"
import MobileNav from "./mobile_header"

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  position: "sticky",
  background: "#ffffff",
}))

interface Props {
  window?: () => Window
  children: React.ReactElement
}

function HideOnScroll(props: Props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Header() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

  const [currentMenu, setCurrentMenu] = useState("")
  const location = useLocation()

  useEffect(() => {
    const rootMenu = findRootMenu(location.pathname)

    if (rootMenu) {
      setCurrentMenu(rootMenu)
    }
  }, [location.pathname])

  const findRootMenu = (href: string): string | null => {
    let rootMenu: string | null = null

    for (let i = 0; i < navigations.length; i++) {
      const nav = navigations[i]
      const { children } = nav

      for (let j = 0; j < children.length; j++) {
        const child = children[j]
        const subChildren = child.children

        for (let k = 0; k < subChildren.length; k++) {
          if (subChildren[k].href === href) {
            rootMenu = nav.key
            break
          }
        }

        if (rootMenu) break
      }

      if (rootMenu) break
    }

    return rootMenu
  }

  if (isDesktop) {
    return (
      <HideOnScroll>
        <AppBarStyled>
          <DesktopNav currentMenu={currentMenu} />
        </AppBarStyled>
      </HideOnScroll>
    )
  } else {
    return (
      <AppBarStyled>
        <MobileNav currentMenu={currentMenu} />
      </AppBarStyled>
    )
  }
}
