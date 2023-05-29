import React, { useState } from "react"
import { NavLink } from "react-router-dom"

import { ExpandLess, OpenInNew } from "@mui/icons-material"
import { Box, Collapse, Link, List, ListItemButton, Stack } from "@mui/material"
import { styled } from "@mui/system"

import Logo from "../Logo"
import { navigations } from "./constants"

const NavStack = styled(Stack)(({ theme }) => ({
  height: "3rem",
  lineHeight: "3rem",
  margin: "1.6rem",
}))

const Menu = styled("div")(({ theme }) => ({
  display: "inline-block",
  cursor: "pointer",
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
  borderRadius: "0.6rem",
  background: "rgb(255,247,241)",
  border: "2px solid #FFCC9F",
}))

const ListItem = styled(ListItemButton)(({ theme }) => ({
  fontWeight: 500,
  height: "4rem",
  lineHeight: "4rem",
  color: "#333",
  margin: "0 1.2rem",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 !important",
  "&:hover": {
    background: "transparent",
    color: theme.palette.primary.main,
  },
  "&:not(:first-of-type)": {
    borderTop: "1px solid #FFCC9F",
  },
}))

const SubListItem = styled(ListItemButton)(({ theme }) => ({
  fontWeight: 300,
  height: "2.4rem",
  lineHeight: "2.4rem",
  color: "#333",
  margin: "0 !important",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 0 0 1.2rem !important",
}))

const LinkStyledButton = styled(NavLink)(({ theme }) => ({
  fontWeight: 300,
  fontSize: "1.4rem",
  height: "2.1rem",
  lineHeight: "2.1rem",
  color: "#717171",
  "&:active": {
    color: "#333",
    testDecoration: "underline",
  },
}))

const ExternalLink = styled(Link)(({ theme }) => ({
  fontWeight: 300,
  fontSize: "1.4rem",
  height: "2.1rem",
  lineHeight: "2.1rem",
  color: "#717171",
  display: "flex",
  alignItems: "center",
  "&:active": {
    color: "#333",
    testDecoration: "underline",
  },
}))

const SectionList = styled("div")(({ theme }) => ({
  paddingBottom: "1rem",
  margin: "0 2rem",
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.border.main}`,
    paddingBottom: "1rem",
    marginBottom: "1rem",
  },
}))

const ExpandLessIcon = styled(ExpandLess)(({ theme }) => ({
  transition: "transform 0.3s ease",
  "&.active": {
    transform: "rotate(180deg)",
  },
}))

const App = props => {
  const [open, setOpen] = useState(false)
  const [activeCollapse, setActiveCollapse] = useState("")

  const toggleDrawer = isOpen => {
    setOpen(isOpen)
    if (!isOpen) setActiveCollapse("")
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
          <ListItem sx={{ py: "1rem" }} onClick={() => toggleCollapse(item.key)}>
            {item.label} <ExpandLessIcon fontSize="large" className={activeCollapse === item.key ? "active" : ""} />
          </ListItem>
          <Collapse in={activeCollapse === item.key} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(section => (
                <SectionList key={section.label}>
                  {section.children.map(subItem =>
                    subItem.isExternal ? (
                      <SubListItem onClick={() => toggleDrawer(false)} sx={{ mx: 4 }} key={subItem.key}>
                        <ExternalLink underline="none" href={subItem.href}>
                          {subItem.label}
                          <OpenInNew sx={{ fontSize: "1.4rem", ml: "0.4rem" }} />
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
    <Box className={open ? "active" : ""}>
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
        <Box sx={{ background: "#ffffff", height: "calc(100vh - 3.2rem)" }}>
          <MenuContent role="presentation" onKeyDown={() => toggleDrawer(false)}>
            {renderList()}
          </MenuContent>
        </Box>
      )}
    </Box>
  )
}

export default App
