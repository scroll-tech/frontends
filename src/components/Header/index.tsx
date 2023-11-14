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
  console.log(trigger, "trigger")
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Header() {
  const { isLandscape } = useCheckViewport()

  const [currentMenu, setCurrentMenu] = useState("")
  const { pathname } = useLocation()

  useEffect(() => {
    const rootMenu = findRootMenu(pathname, navigations)
    setCurrentMenu(rootMenu ?? "")
  }, [pathname])

  const findRootMenu = (pathname, menuList: Array<any>) => {
    for (const menuItem of menuList) {
      if (menuItem.href && pathname.includes(menuItem.href)) {
        return menuItem.rootKey || menuItem.key
      } else if (menuItem.children) {
        const key = findRootMenu(pathname, menuItem.children)
        if (key) {
          return key
        }
      }
    }
    return null
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
