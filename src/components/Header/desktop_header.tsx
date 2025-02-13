import { sendGAEvent } from "@next/third-parties/google"
import React, { useState } from "react"

import { Box, Container, Fade, Paper, Popper, Stack } from "@mui/material"

import LanguageSelect from "@/components/LanguageSelect"
import ScrollLink from "@/components/Link"
import Logo from "@/components/ScrollLogo"
import WalletToolkit from "@/components/WalletToolkit"
import useCheckViewport from "@/hooks/useCheckViewport"
import useShowLanguageSelect from "@/hooks/useShowLanguageSelect"
import useShowWalletConnector from "@/hooks/useShowWalletToolkit"

import MenuItem from "./MenuItem"
import NavbarItem from "./NavbarItem"
import Announcement from "./announcement"
// import { navigations } from "./constants"
import { navigations } from "./data"
import useCheckCustomNavBarBg from "./useCheckCustomNavBarBg"
import useCheckTheme from "./useCheckTheme"

const DesktopHeader = ({ currentMenu }) => {
  const [isHoveringNavbar, setIsHoveringNavbar] = useState(false)
  const navbarBg = useCheckCustomNavBarBg({ isHover: isHoveringNavbar })
  const { isDesktop } = useCheckViewport()
  const dark = useCheckTheme()

  const [hoveringNavbarItemKey, setHoveringNavbarItemKey] = useState("")

  const showWalletConnector = useShowWalletConnector()
  const showLanguageSelect = useShowLanguageSelect()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMouseEnter = (e, key) => {
    setHoveringNavbarItemKey(key)
    setAnchorEl(e.currentTarget)
  }

  const handleMouseLeave = () => {
    setHoveringNavbarItemKey("")
    setAnchorEl(null)
  }

  // console.log(currentMenu, "currentMenu")

  const handleClickMenuItem = label => {
    sendGAEvent("event", "click_menu", {
      label,
      device: "desktop",
    })
    setIsHoveringNavbar(false)
  }

  const renderNavigationItem = item => {
    if (item.children) {
      return (
        <>
          <NavbarItem
            isActive={currentMenu.includes(item.key)}
            isHovering={hoveringNavbarItemKey === item.key}
            dark={dark}
            href={item.href}
            onMouseEnter={e => handleMouseEnter(e, item.key)}
            onMouseLeave={handleMouseLeave}
          >
            {item.label}
            {item.key === hoveringNavbarItemKey && (
              <Popper open={true} anchorEl={anchorEl} placement="bottom-start" className="!-ml-[16px]" transition disablePortal>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper
                      sx={{
                        borderRadius: "1rem",
                        p: "16px",
                        zIndex: "var(--mui-zIndex-appBar)",
                        transformOrigin: "top",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      <Stack direction="column" onClick={handleMouseLeave}>
                        {item.children.map(({ key, label, href }) => (
                          <MenuItem key={key} isActive={key === currentMenu[0]} dark={dark} href={href} onClick={() => handleClickMenuItem(label)}>
                            {label}
                          </MenuItem>
                        ))}
                      </Stack>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            )}
          </NavbarItem>
        </>
      )
    }

    return (
      <NavbarItem isActive={currentMenu.includes(item.key)} dark={dark} href={item.href} onClick={() => handleClickMenuItem(item.label)}>
        {item.label}
      </NavbarItem>
    )
  }

  const renderNavigationList = () => {
    return (
      <Stack direction="row" spacing={isDesktop ? "4.4rem" : "2rem"} justifyContent="space-between" alignItems="center">
        {navigations.map(item => (
          <React.Fragment key={item.key}>{renderNavigationItem(item)}</React.Fragment>
        ))}
      </Stack>
    )
  }

  return (
    <Stack
      sx={{
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 10,
        backgroundColor: theme =>
          navbarBg
            ? theme.vars.palette.themeBackground[navbarBg]
            : dark
              ? theme.vars.palette.themeBackground.dark
              : theme.vars.palette.themeBackground.light,
      }}
      onMouseEnter={() => {
        setIsHoveringNavbar(true)
      }}
      onMouseLeave={e => {
        setIsHoveringNavbar(false)
      }}
    >
      <Announcement />
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <ScrollLink href="/" className="flex">
            <Logo light={dark} />
          </ScrollLink>
          <Stack direction="row" spacing={isDesktop ? "4.4rem" : "2rem"} alignItems="center">
            <Box>{renderNavigationList()}</Box>
            {showWalletConnector && <WalletToolkit dark={dark}></WalletToolkit>}
            {showLanguageSelect && <LanguageSelect></LanguageSelect>}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  )
}

export default DesktopHeader
