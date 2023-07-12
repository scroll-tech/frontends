import React, { useState } from "react"
import { NavLink } from "react-router-dom"

import { OpenInNew } from "@mui/icons-material"
import { Box, Fade, Link, Stack } from "@mui/material"
import { styled } from "@mui/system"

import Logo from "@/components/ScrollLogo"

import { navigations } from "./constants"

const StyledBox = styled(Stack)(({ theme }) => ({
  position: "sticky",
  top: 0,
  width: "100%",
  zIndex: 10,
  background: "#fef8f4",
  // borderBottom: `1px solid ${theme.palette.border.main}`,
}))

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2rem",
}))

const MenuLinkButton = styled(Link)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  paddingLeft: "25px",
  paddingRight: "25px",
  marginLeft: "4px",
  marginRight: "4px",
  lineHeight: "65px",
  position: "relative",
  color: theme.palette.text.primary,
}))

const ExternalLink = styled("p")(({ theme }) => ({
  fontWeight: 400,
  fontSize: "1.4rem",
  height: "2.1rem",
  lineHeight: "2.1rem",
  color: "#333",
  display: "flex",
  alignItems: "center",
}))

const LinkStyledButton = styled(NavLink)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  paddingLeft: "10px",
  paddingRight: "10px",
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  lineHeight: "65px",
  position: "relative",
  color: theme.palette.text.primary,
  "&.active": {
    color: theme.palette.primary.main,
  },
}))

const SubMenuButton = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  paddingLeft: "10px",
  paddingRight: "10px",
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  lineHeight: "65px",
  position: "relative",
  color: theme.palette.text.primary,
  // color: "#A0A0A0",
  "&.active": {
    color: theme.palette.primary.main,
  },
  "& .expand-more": {
    willChange: "transform",
    transition: "transform .3s ease-in-out",
  },
  "&:hover": {
    color: theme.palette.primary.main,
    [`& .expand-more`]: {
      transform: "rotate(180deg)",
    },
  },
}))

const SubMenuList = styled(Box)(({ theme }) => ({
  position: "absolute",
  border: "2px solid #FFCC9F",
  left: 0,
  background: "rgb(255,247,241)",
  zIndex: 1,
  borderRadius: `${theme.shape.borderRadius}px`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  padding: "1.6rem 0",
  width: "20rem",
}))

const SectionList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "&:not(:last-child)::after": {
    content: '""',
    margin: "0 1.8rem 1rem",
    borderBottom: `1px solid ${theme.palette.border.main}`,
    paddingBottom: "1rem",
  },
}))

const LinkButton = styled(Link)(({ theme }) => ({
  "& p": {
    lineHeight: "2.6rem",
    height: "2.6rem",
    fontSize: "1.6rem",
    color: "#717171",
    fontWeight: 400,
    padding: "2px 0 2px 1.8rem",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}))

const LinkStyledSubButton = styled(NavLink)(({ theme }) => ({
  lineHeight: "2.6rem",
  height: "2.6rem",
  fontSize: "1.6rem",
  color: "#717171",
  fontWeight: 400,
  padding: "2px 0 2px 1.8rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  "&.active": {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}))

const App = ({ currentMenu }) => {
  const [checked, setChecked] = useState("")

  const handleMouseEnter = key => {
    setChecked(key)
  }

  const handleMouseLeave = () => {
    setChecked("")
  }

  const renderSubMenuList = children => {
    return children.map(section => (
      <SectionList key={section.label}>
        {section.children?.map(subItem =>
          subItem.isExternal ? (
            <LinkButton target="_blank" underline="none" key={subItem.label} href={subItem.href}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ExternalLink>
                  {subItem.label} <OpenInNew sx={{ fontSize: "1.4rem", ml: "0.4rem", color: "" }} />
                </ExternalLink>
              </Stack>
            </LinkButton>
          ) : (
            <LinkStyledSubButton key={subItem.label} to={subItem.href}>
              {subItem.label}
            </LinkStyledSubButton>
          ),
        )}
      </SectionList>
    ))
  }

  const renderNavigationItem = item => {
    if (item.children) {
      return (
        <SubMenuButton
          className={currentMenu === item.key ? "active" : ""}
          onMouseEnter={() => handleMouseEnter(item.key)}
          onMouseLeave={handleMouseLeave}
          key={item.key}
        >
          <Stack direction="row" alignItems="center" spacing="6px">
            <span>{item.label}</span>
            <svg className="expand-more" xmlns="http://www.w3.org/2000/svg" width="9" height="5" viewBox="0 0 9 5" fill="none">
              <path
                d="M4.98393 4.5L3.48482 4.5L0.234375 0.5L1.73169 0.5L4.24869 3.60242C5.09663 2.56061 5.80325 1.54181 6.73527 0.500001L8.23438 0.500001C6.99108 1.83333 6.22722 3.16667 4.98393 4.5Z"
                fill="currentColor"
              />
            </svg>
          </Stack>
          <Fade in={item.key === checked}>
            <SubMenuList onClick={handleMouseLeave}>{renderSubMenuList(item.children)}</SubMenuList>
          </Fade>
        </SubMenuButton>
      )
    } else if (item.isExternal) {
      return (
        <MenuLinkButton underline="none" href={item.href} key={item.key}>
          {item.label}
        </MenuLinkButton>
      )
    } else {
      return (
        <LinkStyledButton className={currentMenu === item.key ? "active" : ""} to={item.href} end={item.end} key={item.key}>
          {item.label}
        </LinkStyledButton>
      )
    }
  }

  const renderNavigationList = () => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {navigations.map(item => (
          <React.Fragment key={item.key}>{renderNavigationItem(item)}</React.Fragment>
        ))}
      </Stack>
    )
  }

  return (
    <StyledBox>
      {/* <Announcement /> */}
      <HeaderContainer>
        <NavLink to="/" className="flex">
          <Logo />
        </NavLink>
        <Box>{renderNavigationList()}</Box>
      </HeaderContainer>
    </StyledBox>
  )
}

export default App
