import React, { useState } from "react"
import { NavLink } from "react-router-dom"

import { Box, Fade, Link, Popper, Stack } from "@mui/material"
import { styled } from "@mui/system"

import Logo from "@/components/ScrollLogo"

import Announcement from "./announcement"
import { navigations } from "./constants"
import useCheckNoBg from "./useCheckNoBg"

const StyledBox = styled<any>(Stack)(({ theme, noBg }) => ({
  position: "sticky",
  top: 0,
  width: "100%",
  zIndex: 10,
  backgroundColor: noBg ? "transparent" : theme.palette.themeBackground.light,
}))

const StyledPopper = styled<any>(Popper)(({ theme, noBg }) => ({
  backgroundColor: noBg ? "transparent" : theme.palette.themeBackground.light,
  paddingBottom: "1rem",
}))

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2rem",
}))

const MenuLinkButton = styled(Link)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  paddingLeft: "25px",
  paddingRight: "25px",
  marginLeft: "4px",
  marginRight: "4px",
  lineHeight: "65px",
  position: "relative",
  color: theme.palette.text.primary,
  "&:hover": {
    fontWeight: 500,
  },
}))

const ExternalLink = styled("p")(({ theme }) => ({
  fontWeight: 400,
  fontSize: "1.8rem",
  height: "2.1rem",
  lineHeight: "2.1rem",
  color: "#333",
  display: "flex",
  alignItems: "center",
  width: "100%",
  "&:hover": {
    fontWeight: 500,
  },
}))

const LinkStyledButton = styled(NavLink)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  paddingLeft: "10px",
  paddingRight: "10px",
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  lineHeight: "65px",
  position: "relative",
  color: theme.palette.text.primary,
  "&:hover": {
    fontWeight: 500,
  },
  "&.active": {
    fontWeight: 600,
  },
}))

const SubMenuButton = styled(Box)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  paddingLeft: "2rem",
  paddingRight: "2rem",
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  lineHeight: "65px",
  position: "relative",
  color: theme.palette.text.primary,
  "&.active": {
    fontWeight: 600,
  },
  "& .expand-more": {
    willChange: "transform",
    transition: "transform .3s ease-in-out",
  },
  "&:hover": {
    fontWeight: 500,
    [`& .expand-more`]: {
      transform: "rotate(180deg)",
    },
  },
}))

const SubMenuList = styled(Box)(({ theme }) => ({
  left: 0,
  zIndex: 1,
  borderRadius: `${theme.shape.borderRadius}px`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  padding: "0 2rem",
}))

const SectionList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "1.8rem 0",
  "&:nth-child(1)": {
    paddingTop: 0,
  },
  "&:nth-child(n+2)": {
    borderTop: `1px solid ${theme.palette.text.primary}`,
  },
  "&:nth-last-child(1)": {
    paddingBottom: "0.8rem",
  },
}))

const LinkButton = styled(Link)(({ theme }) => ({
  "& p": {
    lineHeight: "2.9rem",
    height: "2.9rem",
    fontSize: "1.8rem",
    color: theme.palette.text.primary,
    fontWeight: 400,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}))

const LinkStyledSubButton = styled(NavLink)(({ theme }) => ({
  lineHeight: "2.9rem",
  height: "2.9rem",
  fontSize: "1.8rem",
  fontWeight: 400,
  cursor: "pointer",
  color: theme.palette.text.primary,
  "&:hover": {
    fontWeight: 500,
  },
  "&.active": {
    fontWeight: 600,
  },
}))

const App = ({ currentMenu }) => {
  const noBg = useCheckNoBg()

  const [checked, setChecked] = useState("")

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMouseEnter = (e, key) => {
    setChecked(key)
    setAnchorEl(e.currentTarget)
  }

  const handleMouseLeave = () => {
    setChecked("")
    setAnchorEl(null)
  }

  const renderSubMenuList = children => {
    return children.map(section => (
      <SectionList key={section.label}>
        {section.children?.map(subItem =>
          subItem.isExternal ? (
            <LinkButton target="_blank" underline="none" key={subItem.label} href={subItem.href}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%" }}>
                <ExternalLink>{subItem.label}</ExternalLink>
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
          onMouseEnter={e => handleMouseEnter(e, item.key)}
          onMouseLeave={handleMouseLeave}
          key={item.key}
        >
          <Stack direction="row" alignItems="center" spacing="6px" sx={{ cursor: "pointer" }}>
            <span>{item.label}</span>
            <svg className="expand-more" xmlns="http://www.w3.org/2000/svg" width="9" height="5" viewBox="0 0 9 5" fill="none">
              <path
                d="M4.98393 4.5L3.48482 4.5L0.234375 0.5L1.73169 0.5L4.24869 3.60242C5.09663 2.56061 5.80325 1.54181 6.73527 0.500001L8.23438 0.500001C6.99108 1.83333 6.22722 3.16667 4.98393 4.5Z"
                fill="currentColor"
              />
            </svg>
          </Stack>
          <StyledPopper open={item.key === checked} placement="bottom-start" anchorEl={anchorEl} transition noBg={noBg}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <SubMenuList onClick={handleMouseLeave}>{renderSubMenuList(item.children)}</SubMenuList>
              </Fade>
            )}
          </StyledPopper>
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
    <StyledBox noBg={noBg}>
      <Announcement />
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
