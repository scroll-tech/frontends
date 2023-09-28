import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { AppBar, Slide } from "@mui/material"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import { styled } from "@mui/system"

import useCheckViewport from "@/hooks/useCheckViewport"

import { navigations } from "./constants"
import DesktopNav from "./desktop_header"
import MobileNav from "./mobile_header"

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  position: "sticky",
  backgroundColor: "transparent",
  paddingRight: "0 !important",
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
  const { isLandscape } = useCheckViewport()

  const [currentMenu, setCurrentMenu] = useState("")
  const location = useLocation()

  useEffect(() => {
    const rootMenu = findRootMenu(location.pathname)

    if (rootMenu) {
      setCurrentMenu(rootMenu)
    } else {
      setCurrentMenu("")
    }
  }, [location.pathname])

  const findRootMenu = (href: string): string | null => {
    let rootMenu: string | null = null

    for (let i = 0; i < navigations.length; i++) {
      const nav = navigations[i]
      const { children } = nav
      if (!children) {
        if (nav.href === href) {
          rootMenu = nav.key
          break
        }
        break
      }

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

  if (isLandscape) {
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
