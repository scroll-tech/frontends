import { sendGAEvent } from "@next/third-parties/google"
import { Fragment, useEffect, useLayoutEffect, useState } from "react"

import { Box, Collapse, List, Stack } from "@mui/material"
import { styled } from "@mui/system"

import LanguageSelect from "@/components/LanguageSelect"
import Link from "@/components/Link"
import WalletToolkit from "@/components/WalletToolkit"
import useShowLanguageSelect from "@/hooks/useShowLanguageSelect"
import useShowWalletConnector from "@/hooks/useShowWalletToolkit"

import Logo from "../ScrollLogo"
import MenuItem from "./MenuItem"
import MobileGasPriceViewer from "./MobileGasPriceViewer"
import MobileNavbarItem from "./MobileNavBarItem"
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
  useCheckCustomNavBarBg()
  const showWalletConnector = useShowWalletConnector()
  const showLanguageSelect = useShowLanguageSelect()

  const dark = useCheckTheme()
  const [open, setOpen] = useState(false)
  const [activeCollapse, setActiveCollapse] = useState("")

  useEffect(() => {
    setActiveCollapse(currentMenu[1])
  }, [currentMenu])

  useLayoutEffect(() => {
    if (open) {
      window.document.body.classList.add("mobile-top-nav-open")
    } else {
      window.document.body.classList.remove("mobile-top-nav-open")
    }
  }, [open])

  const handleCloseMobileHeader = () => {
    if (open) {
      setOpen(false)
    }
  }

  const handleToggleMobileHeader = () => {
    setOpen(!open)
  }

  const toggleCollapse = collapse => {
    setActiveCollapse(collapse === activeCollapse ? "" : collapse)
  }

  const handleClickMenuItem = label => {
    sendGAEvent("event", "click_menu", {
      label,
      device: "mobile",
    })
  }

  const renderList = () => (
    <List
      sx={{
        padding: "0",
        fontSize: "16px",
        borderBottom: theme => `1px solid ${dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary}`,

        ".navbar-item": {
          borderTop: theme => `1px solid ${dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary}`,
        },
      }}
      component="nav"
    >
      {navigations.map(item => (
        <Fragment key={item.key}>
          {item.children ? (
            <MobileNavbarItem
              dark={dark}
              label={item.label}
              isNew={item.new}
              isActive={activeCollapse === item.key}
              onClick={() => toggleCollapse(item.key)}
            ></MobileNavbarItem>
          ) : (
            <Link href={item.href} reloadDocument={item.reload} className="navbar-item " external={item.href?.startsWith("https")}>
              <MobileNavbarItem
                dark={dark}
                label={item.label}
                isNew={item.new}
                isActive={activeCollapse === item.key}
                expendMore={false}
                onClick={() => handleClickMenuItem(item.label)}
              ></MobileNavbarItem>
            </Link>
          )}

          <Collapse key={item.key} in={activeCollapse === item.key} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(({ key, label, href, reload }) => (
                <MenuItem
                  mode="mobile"
                  key={key}
                  sx={{ mb: "2.4rem" }}
                  isActive={key === currentMenu[0]}
                  label={label}
                  dark={dark}
                  href={href}
                  reloadDocument={reload}
                >
                  {label}
                </MenuItem>
              ))}
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  )

  return (
    <Stack
      className={open ? "active" : ""}
      direction="column"
      sx={{
        "&.active": {
          height: "100vh",
        },
        backgroundColor: open ? (dark ? "themeBackground.dark" : "themeBackground.light") : "var(--navbar-bg)",
      }}
    >
      <Stack sx={{ height: "6.4rem", px: "2rem", lineHeight: "3rem" }} direction="row" justifyContent="space-between" alignItems="center">
        <Link href="/" className="flex">
          <Box onClick={handleCloseMobileHeader}>
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
            onClick={handleToggleMobileHeader}
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
            flex: 1,
            backgroundColor: dark ? "themeBackground.dark" : "themeBackground.light",
            overflowY: "auto",
          }}
        >
          <Box sx={{ margin: "-0.8rem 2rem 0" }}>
            {renderList()}
            <MobileGasPriceViewer dark={dark}></MobileGasPriceViewer>
          </Box>
        </Box>
      )}
    </Stack>
  )
}

export default MobileHeader
