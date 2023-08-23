import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import { ExpandMore } from "@mui/icons-material"
import { Box, Collapse, Link, List, ListItemButton, Stack } from "@mui/material"
import { styled } from "@mui/system"

import Logo from "../ScrollLogo"
import { navigations } from "./constants"
import useCheckNoBg from "./useCheckNoBg"

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

const Bar = styled("div")(({ theme }) => ({
  width: "2rem",
  height: ".2rem",
  backgroundColor: "#000",
  margin: " 5px 0",
  transition: "0.4s",
}))

const MenuContent = styled(Box)(({ theme }) => ({
  margin: "0.5rem 1.6rem 0",
  background: "rgb(255,247,241)",
}))

const ListItem = styled(ListItemButton)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "2rem",
  height: "5.5rem",
  lineHeight: "5.5rem",
  color: theme.palette.text.primary,
  margin: "0",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 !important",
  "&.active": {},
  "&:hover": {
    background: "transparent",
  },
  "&:not(:first-of-type)": {
    borderTop: "1px solid #101010",
  },
}))

const MenuLinkStyledButton = styled(NavLink)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "2rem",
  height: "5.5rem",
  lineHeight: "5.5rem",
  color: "#101010",
  width: "100%",
  "&.active": {
    color: theme.palette.text.primary,
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

const LinkStyledButton = styled(NavLink)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1.8rem",
  height: "4rem",
  lineHeight: "4rem",
  color: "#101010",
  width: "100%",
  "&.active": {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}))

const ExternalLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1.8rem",
  height: "4rem",
  lineHeight: "4rem",
  color: "#101010",
  display: "flex",
  alignItems: "center",
  width: "100%",
}))

const SectionList = styled("div")(({ theme }) => ({
  "&:last-of-type": {
    paddingBottom: "2.5rem",
  },
  "&:nth-last-child(-n+2)": {
    paddingBottom: "1.6rem",
  },
  "&:nth-of-type(n+2)": {
    borderTop: `1px solid ${theme.palette.text.primary}`,
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
  const noBg = useCheckNoBg()
  const [open, setOpen] = useState(false)
  const [activeCollapse, setActiveCollapse] = useState("")

  useEffect(() => {
    setActiveCollapse(currentMenu)
  }, [currentMenu])

  const toggleDrawer = isOpen => {
    setOpen(isOpen)
    if (!isOpen) setActiveCollapse(currentMenu)
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
            <ListItem className={activeCollapse === item.key ? "active" : ""} sx={{ py: "1rem" }} onClick={() => toggleCollapse(item.key)}>
              {item.label} <ExpandMoreIcon fontSize="large" className={activeCollapse === item.key ? "active" : ""} />
            </ListItem>
          ) : (
            <ListItem className={activeCollapse === item.key ? "active" : ""} sx={{ py: "1rem" }} onClick={() => toggleDrawer(false)}>
              <MenuLinkStyledButton to={item.href}>{item.label}</MenuLinkStyledButton>
            </ListItem>
          )}

          <Collapse in={activeCollapse === item.key} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(section => (
                <SectionList key={section.label}>
                  {section.children.map(subItem =>
                    subItem.isExternal ? (
                      <SubListItem onClick={() => toggleDrawer(false)} sx={{ mx: 4 }} key={subItem.key}>
                        <ExternalLink underline="none" href={subItem.href}>
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
                              fill="#101010"
                            />
                          </svg>
                        </ExternalLink>
                      </SubListItem>
                    ) : (
                      <SubListItem onClick={() => toggleDrawer(false)} sx={{ mx: 4 }} key={subItem.key}>
                        <LinkStyledButton to={subItem.href}>{subItem.label}</LinkStyledButton>
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
    <Box className={open ? "active" : ""} sx={{ backgroundColor: noBg && !open ? "transparent" : "themeBackground.light" }}>
      <NavStack direction="row" justifyContent="space-between" alignItems="center">
        <NavLink to="/" className="flex">
          <Box onClick={() => toggleDrawer(false)}>
            <Logo />
          </Box>
        </NavLink>
        <Menu onClick={() => toggleDrawer(!open)} className={open ? "active" : ""}>
          <Bar></Bar>
          <Bar></Bar>
          <Bar></Bar>
        </Menu>
      </NavStack>
      {open && (
        <Box sx={{ background: "#FFF8F3", paddingTop: "5rem", height: "calc(100vh - 3.2rem)" }}>
          <MenuContent role="presentation" onKeyDown={() => toggleDrawer(false)}>
            {renderList()}
          </MenuContent>
        </Box>
      )}
    </Box>
  )
}

export default App
