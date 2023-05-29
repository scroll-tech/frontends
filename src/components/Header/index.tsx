import * as React from "react"

import { AppBar, Slide } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import { styled } from "@mui/system"

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

  if (isDesktop) {
    return (
      <HideOnScroll>
        <AppBarStyled>
          <DesktopNav />
        </AppBarStyled>
      </HideOnScroll>
    )
  } else {
    return (
      <AppBarStyled>
        <MobileNav />
      </AppBarStyled>
    )
  }
}
