import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import { ExpandMore } from "@mui/icons-material"
import { Box, Collapse, Link, List, ListItemButton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import WalletToolkit from "@/components/WalletToolkit"
import useShowWalletConnector from "@/hooks/useShowWalletToolkit"

import Logo from "../ScrollLogo"
// import Announcement from "./announcement"
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
    color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  },
}))

const SubListItem = styled(ListItemButton)(({ theme }) => ({
  height: "4rem",
  lineHeight: "4rem",
  margin: "0 !important",
  display: "flex",
  justifyContent: "space-between",
  padding: "0  !important",
}))

const LinkStyledButton = styled<any>(NavLink, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontWeight: 500,
  fontSize: "1.8rem",
  height: "4rem",
  lineHeight: "4rem",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  width: "100%",
  "&.active": {
    color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
    fontWeight: 500,
  },
}))

const ExternalLink = styled<any>(Link, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontWeight: 500,
  fontSize: "1.8rem",
  height: "4rem",
  lineHeight: "4rem",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  width: "100%",
}))

const SectionList = styled<any>("div", { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
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
              <MenuLinkStyledButton to={item.href} dark={dark} reloadDocument={item.reload}>
                {item.label}
              </MenuLinkStyledButton>
            </ListItem>
          )}

          <Collapse key={item.key} in={activeCollapse === item.key} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((section, idx) => (
                <SectionList key={idx} dark={dark}>
                  <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold", lineHeight: "3rem" }}>{section.label}</Typography>
                  {section.children
                    // only show sub items with href
                    ?.filter(subItem => subItem.href)
                    .map(subItem =>
                      subItem.isExternal ? (
                        <SubListItem onClick={() => toggleDrawer(false)} sx={{ mx: 4 }} key={subItem.key + idx}>
                          <ExternalLink underline="none" href={subItem.href} dark={dark}>
                            {subItem.label}
                            <svg
                              style={{ marginLeft: "0.5rem" }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M9 1V7.86538L7.83812 6.7035V2.96385C5.46463 5.26924 3.29542 7.77999 0.853849 10L0 9.16344C2.42536 6.94344 4.5762 4.46728 6.93347 2.1781H3.31272L2.13462 1H9Z"
                                fill="currentColor"
                              />
                            </svg>
                          </ExternalLink>
                        </SubListItem>
                      ) : (
                        <SubListItem onClick={() => toggleDrawer(false)} sx={{ mx: 4 }} key={subItem.key}>
                          <LinkStyledButton to={subItem.href} dark={dark}>
                            {subItem.label}
                          </LinkStyledButton>
                        </SubListItem>
                      ),
                    )}
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
      {/* <Announcement /> */}
      <NavStack direction="row" justifyContent="space-between" alignItems="center">
        <NavLink to="/" className="flex">
          <Box onClick={() => toggleDrawer(false)}>
            <Logo light={dark} />
          </Box>
        </NavLink>
        <Stack direction="row" spacing="1.6rem" alignItems="center">
          {showWalletConnector && <WalletToolkit dark={dark}></WalletToolkit>}
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
            paddingTop: "5rem",
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
