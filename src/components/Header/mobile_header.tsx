import React, { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { NavLink } from "react-router-dom"

import { ExpandMore } from "@mui/icons-material"
import { Box, Collapse, List, ListItemButton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import LanguageSelect from "@/components/LanguageSelect"
import WalletToolkit from "@/components/WalletToolkit"
import useShowLanguageSelect from "@/hooks/useShowLanguageSelect"
import useShowWalletConnector from "@/hooks/useShowWalletToolkit"

import Logo from "../ScrollLogo"
import SubmenuLink from "./SubmenuLink"
import Announcement from "./announcement"
import { navigations } from "./constants"
import useCheckCustomNavBarBg from "./useCheckCustomNavBarBg"
import useCheckTheme from "./useCheckTheme"

const NavStack = styled(Stack)(({ theme }) => ({
  height: "3rem",
  lineHeight: "3rem",
  margin: "1.6rem",
}))

const Menu = styled("div")(({ theme }) => ({
  display: "inline-block",
  [`&.active ${Bar}:nth-of-type(1)`]: {
    transform: "rotate(45deg) translate(5px, 5px)",
  },
  [`&.active ${Bar}:nth-of-type(2)`]: {
    opacity: 0,
  },
  [`&.active ${Bar}:nth-of-type(3)`]: {
    transform: "rotate(-45deg) translate(5px, -5px)",
  },
}))

const Bar = styled<any>("div", { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  width: "2rem",
  height: ".2rem",
  backgroundColor: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  margin: " 5px 0",
  transition: "0.4s",
}))

const MenuContent = styled<any>(Box, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  margin: "0.5rem 1.6rem 0",
  background: dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light,
}))

const ListItem = styled<any>(ListItemButton, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontWeight: 600,
  fontSize: "2rem",
  height: "5.5rem",
  lineHeight: "5.5rem",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  margin: "0",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 !important",
  "&.active": {},
  "&:hover": {
    background: "transparent",
  },
  "&:not(:first-of-type)": {
    borderTop: `1px solid ${dark ? theme.palette.primary.contrastText : theme.palette.text.primary}`,
  },
}))

const MenuLinkStyledButton = styled<any>(NavLink, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontWeight: 600,
  fontSize: "2rem",
  height: "5.5rem",
  lineHeight: "5.5rem",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  width: "100%",
  "&.active": {
    color: theme.palette.primary.main,
  },
}))

const SectionList = styled<any>("div", { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
  "&:last-of-type": {
    paddingBottom: "2.5rem",
  },
  "&:nth-last-of-type(-n+2)": {
    paddingBottom: "1.6rem",
  },
  "&:nth-of-type(n+2)": {
    borderTop: `1px solid ${dark ? theme.palette.primary.contrastText : theme.palette.text.primary}`,
    paddingTop: "1.6rem",
  },
}))

const ExpandMoreIcon = styled(ExpandMore)(({ theme }) => ({
  transition: "transform 0.3s ease",
  "&.active": {
    transform: "rotate(180deg)",
  },
}))

const App = ({ currentMenu }) => {
  const navbarBg = useCheckCustomNavBarBg()
  const showWalletConnector = useShowWalletConnector()
  const showLanguageSelect = useShowLanguageSelect()

  const dark = useCheckTheme()
  const [open, setOpen] = useState(false)
  const [activeCollapse, setActiveCollapse] = useState("")

  useEffect(() => {
    setActiveCollapse(currentMenu)
  }, [currentMenu])

  const toggleDrawer = isOpen => {
    setOpen(isOpen)
    if (isOpen) {
      window.document.body.classList.add("mobile-top-nav-open")
    } else {
      window.document.body.classList.remove("mobile-top-nav-open")
      setActiveCollapse(currentMenu)
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
      }}
      component="nav"
    >
      {navigations.map(item => (
        <React.Fragment key={item.key}>
          {item.children ? (
            <ListItem
              dark={dark}
              className={activeCollapse === item.key ? "active" : ""}
              sx={{ py: "1rem" }}
              onClick={() => toggleCollapse(item.key)}
            >
              {item.label} <ExpandMoreIcon fontSize="large" className={activeCollapse === item.key ? "active" : ""} />
            </ListItem>
          ) : (
            <ListItem dark={dark} className={activeCollapse === item.key ? "active" : ""} sx={{ py: "1rem" }} onClick={() => toggleDrawer(false)}>
              <MenuLinkStyledButton
                to={item.href}
                dark={dark}
                reloadDocument={item.reload}
                onClick={() =>
                  ReactGA.event("click_menu", {
                    label: item.label,
                    device: "mobile",
                  })
                }
              >
                {item.label}
              </MenuLinkStyledButton>
            </ListItem>
          )}

          <Collapse key={item.key} in={activeCollapse === item.key} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((section, idx) => (
                <SectionList onClick={() => toggleDrawer(false)} key={idx} dark={dark}>
                  {section.label && (
                    <Typography
                      sx={{ fontSize: "1.4rem", fontWeight: "bold", lineHeight: "3rem", color: dark ? "primary.contrastText" : "text.primary" }}
                    >
                      {section.label}
                    </Typography>
                  )}
                  {section.children
                    // only show sub items with href
                    ?.filter(subItem => subItem.href)
                    .map(subItem => (
                      <SubmenuLink key={subItem.label} dark={dark} {...subItem}></SubmenuLink>
                    ))}
                </SectionList>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  )

  return (
    <Box
      className={open ? "active" : ""}
      sx={{ backgroundColor: navbarBg && !open ? `themeBackground.${navbarBg}` : dark ? "themeBackground.dark" : "themeBackground.light" }}
    >
      <Announcement />
      <NavStack direction="row" justifyContent="space-between" alignItems="center">
        <NavLink to="/" className="flex">
          <Box onClick={() => toggleDrawer(false)}>
            <Logo light={dark} />
          </Box>
        </NavLink>
        <Stack direction="row" spacing="1.6rem" alignItems="center">
          {showWalletConnector && <WalletToolkit dark={dark}></WalletToolkit>}
          {showLanguageSelect && <LanguageSelect></LanguageSelect>}

          <Menu onClick={() => toggleDrawer(!open)} className={open ? "active" : ""}>
            <Bar dark={dark}></Bar>
            <Bar dark={dark}></Bar>
            <Bar dark={dark}></Bar>
          </Menu>
        </Stack>
      </NavStack>
      {open && (
        <Box
          sx={{
            background: theme => (dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light),
            height: "calc(100vh - 6.2rem)",
            overflowY: "auto",
          }}
        >
          <MenuContent role="presentation" dark={dark} onKeyDown={() => toggleDrawer(false)}>
            {renderList()}
          </MenuContent>
        </Box>
      )}
    </Box>
  )
}

export default App
