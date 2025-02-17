import { sendGAEvent } from "@next/third-parties/google"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useState } from "react"

import { ExpandMore } from "@mui/icons-material"
import { Box, Collapse, List, ListItemButton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import LanguageSelect from "@/components/LanguageSelect"
import Link from "@/components/Link"
import WalletToolkit from "@/components/WalletToolkit"
import useShowLanguageSelect from "@/hooks/useShowLanguageSelect"
import useShowWalletConnector from "@/hooks/useShowWalletToolkit"
import { isMainnet } from "@/utils"

import Logo from "../ScrollLogo"
import MobileGasPriceViewer from "./MobileGasPriceViewer"
import MobileNavbarItem from "./MobileNavBarItem"
import Announcement from "./announcement"
import { navigations } from "./data"
import useCheckCustomNavBarBg from "./useCheckCustomNavBarBg"
import useCheckTheme from "./useCheckTheme"

const Bar = styled<any>("div", { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  width: "2rem",
  height: ".2rem",
  backgroundColor: dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary,
  margin: " 5px 0",
  transition: "0.4s",
}))

const MobileHeader = ({ currentMenu }) => {
  const navbarBg = useCheckCustomNavBarBg()
  const showWalletConnector = useShowWalletConnector()
  const showLanguageSelect = useShowLanguageSelect()

  const dark = useCheckTheme()
  const [open, setOpen] = useState(false)
  const [activeCollapse, setActiveCollapse] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    setActiveCollapse(currentMenu[1])
  }, [currentMenu])

  const toggleDrawer = isOpen => {
    setOpen(isOpen)
    if (isOpen) {
      window.document.body.classList.add("mobile-top-nav-open")
    } else {
      window.document.body.classList.remove("mobile-top-nav-open")
      setActiveCollapse(currentMenu[1])
    }
  }

  const toggleCollapse = collapse => {
    setActiveCollapse(collapse === activeCollapse ? "" : collapse)
  }

  const renderList = () => (
    <List
      sx={{
        padding: "0",
        fontSize: "16px",
        borderBottom: theme => `1px solid ${dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary}`,
      }}
      component="nav"
    >
      {navigations.map((item, index) => (
        <Fragment key={item.key}>
          {item.children ? (
            <MobileNavbarItem dark={dark} onClick={() => toggleCollapse(item.key)}>
              <Stack direction="row" alignItems="center" spacing="0.8rem">
                <span>{item.label}</span>
                {item.new && (
                  <Box
                    sx={{
                      backgroundColor: "#B5F5EC",
                      padding: "0 0.8rem",
                      height: "2rem",
                      lineHeight: "2rem",
                      borderRadius: "0.4rem",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem", lineHeight: "2rem", fontWeight: 600 }}>NEW</Typography>
                  </Box>
                )}
              </Stack>
              <ExpandMore
                fontSize="large"
                sx={{
                  transition: "transform 0.3s ease",
                  "&.active": {
                    transform: "rotate(180deg)",
                  },
                }}
              />
            </MobileNavbarItem>
          ) : (
            <Link
              href={item.href}
              reloadDocument={item.reload}
              onClick={() =>
                sendGAEvent("event", "click_menu", {
                  label: item.label,
                  device: "mobile",
                })
              }
            >
              <MobileNavbarItem dark={dark} sx={{ py: "1rem" }} onClick={() => toggleDrawer(false)}>
                {item.label}
              </MobileNavbarItem>
            </Link>
          )}

          <Collapse key={item.key} in={activeCollapse === item.key} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(i => (
                <Link key={i.id} href={i.href}>
                  <ListItemButton sx={{ p: 0, mb: "2.4rem" }} onClick={() => toggleDrawer(false)}>
                    <Typography
                      sx={{
                        fontSize: "1.6rem",
                        lineHeight: "2.4rem",
                        color: currentMenu[0] === i.key ? "primary.main" : dark ? "primary.contrastText" : "text.primary",
                      }}
                    >
                      {i.label}
                    </Typography>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  )

  return (
    <Box
      className={open ? "active" : ""}
      sx={{ backgroundColor: navbarBg && !open ? `themeBackground.${navbarBg}` : dark ? "themeBackground.dark" : "themeBackground.light" }}
    >
      <Announcement />
      <Stack sx={{ height: "3rem", lineHeight: "3rem", margin: "1.6rem" }} direction="row" justifyContent="space-between" alignItems="center">
        <Link href="/" className="flex">
          <Box onClick={() => toggleDrawer(false)}>
            <Logo light={dark} />
          </Box>
        </Link>
        <Stack direction="row" spacing="1.6rem" alignItems="center">
          {showWalletConnector && <WalletToolkit dark={dark}></WalletToolkit>}
          {showLanguageSelect && <LanguageSelect></LanguageSelect>}

          <Box
            sx={{
              display: "inline-block",
              [`&.active > div:nth-of-type(1)`]: {
                transform: "rotate(45deg) translate(5px, 5px)",
              },
              [`&.active > div:nth-of-type(2)`]: {
                opacity: 0,
              },
              [`&.active > div:nth-of-type(3)`]: {
                transform: "rotate(-45deg) translate(5px, -5px)",
              },
            }}
            onClick={() => toggleDrawer(!open)}
            className={open ? "active" : ""}
          >
            <Bar dark={dark}></Bar>
            <Bar dark={dark}></Bar>
            <Bar dark={dark}></Bar>
          </Box>
        </Stack>
      </Stack>
      {open && (
        <Box
          sx={{
            background: dark ? "themeBackground.dark" : "themeBackground.light",
            height: `calc(100vh - 6.2rem - ${pathname === "/" && isMainnet ? "5.3rem" : "0"})`,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{ margin: "-0.8rem 1.6rem 0", background: dark ? "themeBackground.dark" : "themeBackground.light" }}
            role="presentation"
            onKeyDown={() => toggleDrawer(false)}
          >
            {renderList()}
            <MobileGasPriceViewer></MobileGasPriceViewer>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MobileHeader
