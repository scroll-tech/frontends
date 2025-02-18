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
import { isSepolia } from "@/utils"

import GasPriceViewer from "./GasPriceViewer"
import MenuItem from "./MenuItem"
import NavbarItem from "./NavbarItem"
import { navigations } from "./data"
import useCheckCustomNavBarBg from "./useCheckCustomNavBarBg"
import useCheckTheme from "./useCheckTheme"
import useShowGasPriceViewer from "./useShowGasPriceViewer"

const DesktopHeader = ({ currentMenu }) => {
  const [isHoveringNavbar, setIsHoveringNavbar] = useState(false)
  useCheckCustomNavBarBg({ isHover: isHoveringNavbar })
  const { isDesktop, isLandscape } = useCheckViewport()
  const dark = useCheckTheme()

  const gasPriceViewerVisible = useShowGasPriceViewer()

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
            isNew={item.new}
            dark={dark}
            onMouseEnter={e => handleMouseEnter(e, item.key)}
            onMouseLeave={handleMouseLeave}
          >
            {item.label}
            {item.key === hoveringNavbarItemKey && (
              <Popper
                open={true}
                anchorEl={anchorEl}
                sx={{ zIndex: theme => theme.zIndex.appBar }}
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [-24, 0],
                    },
                  },
                ]}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper
                      sx={{
                        borderRadius: "1rem",
                        p: "16px",
                        transformOrigin: "top",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      <Stack direction="column" onClick={handleMouseLeave}>
                        {item.children.map(({ key, label, href, reload }) => (
                          <MenuItem
                            mode="desktop"
                            key={key}
                            sx={{ p: "0.8rem" }}
                            isActive={key === currentMenu[0]}
                            label={label}
                            dark={isLandscape ? false : dark}
                            href={href}
                            reloadDocument={reload}
                          >
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
      <ScrollLink href={item.href} reloadDocument={item.reload} external={item.href?.startsWith("https")}>
        <NavbarItem
          isNew={item.new}
          isActive={currentMenu.includes(item.key)}
          dark={dark}
          expendMore={false}
          onClick={() => handleClickMenuItem(item.label)}
        >
          {item.label}
        </NavbarItem>
      </ScrollLink>
    )
  }

  return (
    <Box
      sx={{
        backgroundColor: "var(--navbar-bg)",
      }}
      onMouseEnter={() => {
        setIsHoveringNavbar(true)
      }}
      onMouseLeave={e => {
        setIsHoveringNavbar(false)
      }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isSepolia ? "1fr 1fr max-content" : "1fr max-content 1fr",
            height: "6.5rem",
            alignItems: "center",
          }}
        >
          <ScrollLink href="/" className="flex">
            <Logo light={dark} />
          </ScrollLink>
          <Stack
            direction="row"
            sx={{
              justifySelf: "flex-end",
              px: isSepolia ? "4rem" : "2rem",
              alignItems: "center",
              gap: ["2rem", "2rem", "2rem", "4rem"],
            }}
          >
            {navigations.map(item => (
              <React.Fragment key={item.key}>{renderNavigationItem(item)}</React.Fragment>
            ))}
          </Stack>
          <Stack direction="row" spacing={["0.8rem"]} sx={{ justifySelf: "flex-end" }} alignItems="center">
            {!isSepolia && <GasPriceViewer></GasPriceViewer>}
            {showWalletConnector && <WalletToolkit dark={dark}></WalletToolkit>}
            {showLanguageSelect && <LanguageSelect></LanguageSelect>}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default DesktopHeader
