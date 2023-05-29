import React, { useState } from "react"
import { NavLink } from "react-router-dom"

import { ExpandMore, OpenInNew } from "@mui/icons-material"
import { Box, Container, Fade, Link, Stack } from "@mui/material"
import { styled } from "@mui/system"

import Logo from "@/components/Logo"
import { medias } from "@/constants/medias"

import { navigations } from "./constants"

const StyledBox = styled(Stack)(({ theme }) => ({
  position: "sticky",
  top: 0,
  width: "100%",
  zIndex: 10,
  backgroundColor: theme.palette.background.default,
  // borderBottom: `1px solid ${theme.palette.border.main}`,
}))

const HeaderContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const MenuLinkButton = styled(Link)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  paddingLeft: "25px",
  paddingRight: "25px",
  marginLeft: "4px",
  marginRight: "4px",
  lineHeight: "82px",
  position: "relative",
  color: theme.palette.text.primary,
}))

const ExternalLink = styled("p")(({ theme }) => ({
  fontWeight: 300,
  fontSize: "1.4rem",
  height: "2.1rem",
  lineHeight: "2.1rem",
  color: "#333",
  display: "flex",
  alignItems: "center",
}))

const LinkStyledButton = styled(NavLink)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  paddingLeft: "25px",
  paddingRight: "25px",
  marginLeft: "4px",
  marginRight: "4px",
  lineHeight: "82px",
  position: "relative",
  color: theme.palette.text.primary,
}))

const SubMenuButton = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  paddingLeft: "25px",
  paddingRight: "25px",
  marginLeft: "4px",
  marginRight: "4px",
  lineHeight: "82px",
  position: "relative",
  color: theme.palette.text.primary,
  // color: "#A0A0A0",
  cursor: "pointer",
  [`& .expand-more`]: {
    willChange: "transform",
    transition: "transform .3s ease-in-out",
  },
  "&:hover": {
    color: theme.palette.primary.main,
    [`& .expand-more`]: {
      transform: "translateY(2px)",
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
  padding: "1.6rem 1.2rem",
  width: "20rem",
}))

const SectionList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "0.6rem",
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.border.main}`,
    paddingBottom: "1rem",
    marginBottom: "1rem",
  },
}))

const LinkButton = styled(Link)(({ theme }) => ({
  "& p": {
    lineHeight: "2.4rem",
    height: "2.4rem",
    fontSize: "1.6rem",
    color: "#717171",
    fontWeight: 300,
    margin: "2px 0",
    "&:hover": {
      color: "#1B1B1B",
      textDecoration: "underline",
    },
  },
}))

const LinkStyledSubButton = styled(NavLink)({
  lineHeight: "2.2rem",
  height: "2.2rem",
  fontSize: "1.6rem",
  color: "#717171",
  fontWeight: 300,
  margin: "2px 0",
  "&:hover": {
    color: "#1B1B1B",
    textDecoration: "underline",
  },
})

const MediaLink = styled("a")(({ theme }) => ({
  height: "1.9rem",
  width: "2.4rem",
  marginRight: "2.2rem",
  "&:hover": {
    opacity: 0.8,
  },
}))

const App = () => {
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
        <SubMenuButton onMouseEnter={() => handleMouseEnter(item.key)} onMouseLeave={handleMouseLeave} key={item.key}>
          <Stack direction="row" alignItems="center" spacing="6px">
            <span>{item.label}</span>
            <ExpandMore className="expand-more" />
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
        <LinkStyledButton to={item.href} end={item.end} key={item.key}>
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
        <Box display="flex" alignItems="center">
          {medias.map(media => (
            <MediaLink
              href={media.href}
              target="_blank"
              key={media.name}
              sx={{
                background: `url(${media.imgSrc}) center / contain no-repeat `,
              }}
              className={media.name}
            />
          ))}
        </Box>
      </HeaderContainer>
    </StyledBox>
  )
}

export default App
