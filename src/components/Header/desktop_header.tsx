import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useStyles } from "tss-react/mui"

import { Box, Container, Fade, Link, Popper, Stack, SvgIcon } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as TriangleDownSvg } from "@/assets/svgs/refactor/header-triangle-down.svg"
import Logo from "@/components/ScrollLogo"
import WalletToolkit from "@/components/WalletToolkit"
import useCheckViewport from "@/hooks/useCheckViewport"
import useShowWalletConnector from "@/hooks/useShowWalletToolkit"

import Announcement from "./announcement"
import { navigations } from "./constants"
import useCheckNoBg from "./useCheckNoBg"
import useCheckTheme from "./useCheckTheme"

const StyledBox = styled<any>(Stack)(({ theme, transparent, dark }) => ({
  position: "sticky",
  top: 0,
  width: "100%",
  zIndex: 10,
  backgroundColor: transparent ? "transparent" : dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light,
}))

const StyledPopper = styled<any>(Popper)(({ theme, transparent, dark }) => ({
  backgroundColor: transparent ? "transparent" : dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light,
  padding: "0 2rem 1rem",
  marginLeft: "-2rem !important",
}))

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const MenuLinkButton = styled<any>(Link)(({ theme, dark }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  paddingLeft: "25px",
  paddingRight: "25px",
  marginLeft: "4px",
  marginRight: "4px",
  lineHeight: "65px",
  position: "relative",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  "&:hover": {
    fontWeight: 500,
  },
}))

const ExternalLink = styled<any>("p")(({ theme, dark }) => ({
  fontWeight: 400,
  fontSize: "1.8rem",
  height: "2.1rem",
  lineHeight: "2.1rem",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  width: "100%",
  "&:hover": {
    fontWeight: 500,
  },
}))

const LinkStyledButton = styled<any>(NavLink)(({ theme, dark }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  lineHeight: "65px",
  position: "relative",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  whiteSpace: "nowrap",
  "&:hover": {
    fontWeight: 500,
  },
  "&.active": {
    fontWeight: 600,
  },
}))

const SubMenuButton = styled<any>(Stack)(({ theme, dark }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  lineHeight: "65px",
  position: "relative",
  cursor: "pointer",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  "&.active": {
    fontWeight: 600,
  },
  "& .expand-more": {
    willChange: "transform",
    transition: "transform .3s ease-in-out",
  },
  "& .expand-more-reverse": {
    fontWeight: 500,
    transform: "rotate(180deg)",
  },
}))

const SubMenuList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}))

const SectionList = styled<any>(Box)(({ theme, dark }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "1.8rem 0",
  "&:nth-of-type(1)": {
    paddingTop: 0,
  },
  "&:nth-of-type(n+2)": {
    borderTop: `1px solid ${dark ? theme.palette.primary.contrastText : theme.palette.text.primary}`,
  },
  "&:nth-last-of-type(1)": {
    paddingBottom: "0.8rem",
  },
}))

const LinkButton = styled<any>(Link)(({ theme, dark }) => ({
  "& p": {
    lineHeight: "2.9rem",
    height: "2.9rem",
    fontSize: "1.8rem",
    color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
    fontWeight: 400,
    cursor: "pointer",
    "&:hover": {
      color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
    },
  },
}))

const LinkStyledSubButton = styled<any>(NavLink)(({ theme, dark }) => ({
  lineHeight: "2.9rem",
  height: "2.9rem",
  fontSize: "1.8rem",
  fontWeight: 400,
  cursor: "pointer",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  "&:hover": {
    fontWeight: 500,
  },
  "&.active": {
    fontWeight: 600,
  },
}))

const App = ({ currentMenu }) => {
  const { cx } = useStyles()
  const noBg = useCheckNoBg()
  const { isDesktop } = useCheckViewport()

  const dark = useCheckTheme()

  const [checked, setChecked] = useState("")

  const showWalletConnector = useShowWalletConnector()

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
      <SectionList key={section.label} dark={dark}>
        {section.children
          // only show sub menu item when the href is set
          ?.filter(subItem => subItem.href)
          .map(subItem =>
            subItem.isExternal ? (
              <LinkButton target="_blank" underline="none" dark={dark} key={subItem.label} href={subItem.href}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%" }}>
                  <ExternalLink dark={dark}>
                    {subItem.label}
                    <svg style={{ marginLeft: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M9 1V7.86538L7.83812 6.7035V2.96385C5.46463 5.26924 3.29542 7.77999 0.853849 10L0 9.16344C2.42536 6.94344 4.5762 4.46728 6.93347 2.1781H3.31272L2.13462 1H9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </ExternalLink>
                </Stack>
              </LinkButton>
            ) : (
              <LinkStyledSubButton key={subItem.label} to={subItem.href} dark={dark}>
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
          direction="row"
          alignItems="center"
          spacing="6px"
          dark={dark}
          className={currentMenu === item.key ? "active" : ""}
          onMouseEnter={e => handleMouseEnter(e, item.key)}
          onMouseLeave={handleMouseLeave}
        >
          <span>{item.label}</span>
          <SvgIcon
            className={cx("expand-more", item.key === checked && "expand-more-reverse")}
            sx={{ width: "auto", height: "auto" }}
            component={TriangleDownSvg}
            inheritViewBox
          ></SvgIcon>
          {item.key === checked && (
            <StyledPopper open={true} placement="bottom-start" anchorEl={anchorEl} transition transparent={noBg} dark={dark}>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps}>
                  <SubMenuList onClick={handleMouseLeave}>{renderSubMenuList(item.children)}</SubMenuList>
                </Fade>
              )}
            </StyledPopper>
          )}
        </SubMenuButton>
      )
    } else if (item.isExternal) {
      return (
        <MenuLinkButton underline="none" href={item.href} key={item.key} dark={dark}>
          {item.label}
        </MenuLinkButton>
      )
    } else {
      return (
        <LinkStyledButton className={currentMenu === item.key ? "active" : ""} dark={dark} to={item.href} end={item.end} key={item.key}>
          {item.label}
        </LinkStyledButton>
      )
    }
  }

  const renderNavigationList = () => {
    return (
      <Stack direction="row" spacing={isDesktop ? "4.4rem" : "2rem"} justifyContent="space-between" alignItems="center">
        {navigations.map(item => (
          <React.Fragment key={item.key}>{renderNavigationItem(item)}</React.Fragment>
        ))}
      </Stack>
    )
  }

  return (
    <StyledBox transparent={noBg} dark={dark}>
      <Announcement />
      <Container>
        <HeaderContainer>
          <NavLink to="/" className="flex">
            <Logo light={dark} />
          </NavLink>
          <Stack direction="row" spacing={isDesktop ? "4.4rem" : "2rem"} alignItems="center">
            <Box>{renderNavigationList()}</Box>
            {showWalletConnector && <WalletToolkit dark={dark}></WalletToolkit>}
          </Stack>
        </HeaderContainer>
      </Container>
    </StyledBox>
  )
}

export default App
