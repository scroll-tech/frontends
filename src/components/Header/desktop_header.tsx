// import { default as NavLink } from "next/link"
import { sendGAEvent } from "@next/third-parties/google"
import React, { useState } from "react"
import { useStyles } from "tss-react/mui"

import { Box, Container, Fade, Link, Popper, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import TriangleDownSvg from "@/assets/svgs/common/header-triangle-down.svg"
import LanguageSelect from "@/components/LanguageSelect"
import ScrollLink from "@/components/Link"
import Logo from "@/components/ScrollLogo"
import WalletToolkit from "@/components/WalletToolkit"
import useCheckViewport from "@/hooks/useCheckViewport"
import useShowLanguageSelect from "@/hooks/useShowLanguageSelect"
import useShowWalletConnector from "@/hooks/useShowWalletToolkit"

import SubmenuLink from "./SubmenuLink"
import Announcement from "./announcement"
import { navigations } from "./constants"
import useCheckCustomNavBarBg from "./useCheckCustomNavBarBg"
import useCheckTheme from "./useCheckTheme"

const StyledBox = styled<any>(Stack, { shouldForwardProp: prop => prop !== "dark" && prop !== "bgColor" })(({ theme, bgColor, dark }) => ({
  position: "sticky",
  top: 0,
  width: "100%",
  zIndex: 10,
  backgroundColor: bgColor
    ? theme.vars.palette.themeBackground[bgColor]
    : dark
      ? theme.vars.palette.themeBackground.dark
      : theme.vars.palette.themeBackground.light,
}))

const StyledPopper = styled<any>(Popper, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  // backgroundColor: bgColor ? theme.vars.palette.themeBackground[bgColor] : dark ? theme.vars.palette.themeBackground.dark : theme.vars.palette.themeBackground.light,
  marginLeft: "-2.4rem !important",
  zIndex: theme.vars.zIndex.appBar,
}))

const StyledFade = styled(Fade)(({}) => ({
  padding: "2.4rem",
  background: "#FFFFFF",
  borderRadius: "1rem",
  minWidth: "16.8rem",
  transformOrigin: "top",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
  marginTop: "-0.4rem",
}))

const HeaderContainer = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})) as typeof Box

const MenuLinkButton = styled<any>(Link, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  marginLeft: "4px",
  marginRight: "4px",
  lineHeight: "65px",
  position: "relative",
  color: dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary,
  "&:hover": {
    fontWeight: 500,
  },
}))

const LinkStyledButton = styled<any>(ScrollLink, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  lineHeight: "65px",
  position: "relative",
  color: dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary,
  whiteSpace: "nowrap",
  "&:hover": {
    fontWeight: 500,
    color: theme.vars.palette.primary.main,
  },
  "&.active": {
    fontWeight: 600,
    color: theme.vars.palette.primary.main,
  },
}))

const SubMenuButton = styled<any>(Stack, { shouldForwardProp: prop => prop !== "dark" })(({ theme, dark }) => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  lineHeight: "65px",
  position: "relative",
  cursor: "pointer",
  color: dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary,
  "&.active": {
    fontWeight: 600,
    color: theme.vars.palette.primary.main,
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

const SubMenuList = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
})) as typeof Box

const SectionList = styled<any>(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "1.6rem",
  "&:nth-of-type(n+2)": {
    borderLeft: `1px solid ${theme.vars.palette.text.primary}`,
    paddingLeft: "2.4rem",
    marginLeft: "2.4rem",
  },
}))

const DesktopHeader = ({ currentMenu }) => {
  const { cx } = useStyles()
  const [isHover, setIsHover] = useState(false)
  const navbarBg = useCheckCustomNavBarBg({ isHover })
  const { isDesktop } = useCheckViewport()
  const dark = useCheckTheme()

  const [checked, setChecked] = useState("")

  const showWalletConnector = useShowWalletConnector()
  const showLanguageSelect = useShowLanguageSelect()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMouseEnter = (e, key) => {
    setChecked(key)
    setAnchorEl(e.currentTarget)
  }

  const handleMouseLeave = () => {
    setChecked("")
    setAnchorEl(null)
  }

  const handleResetIsHover = () => {
    setIsHover(false)
  }

  const renderSubMenuList = children => {
    return children.map((section, idx) => (
      <SectionList key={idx} dark={dark}>
        {section.label && (
          <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold", lineHeight: "2rem", color: "text.primary" }}>{section.label}</Typography>
        )}
        {section.type === "grid" ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, min-content)",
              gridTemplateRows: "1fr min-content",
              columnGap: "2.4rem",
            }}
          >
            {section.children.map((item, index) => (
              <Stack key={item.key} direction="column" spacing="2.4rem" sx={{ gridRow: !index ? "1/3" : "unset", height: "min-content" }}>
                <Typography sx={{ fontSize: "1.4rem", fontWeight: 700 }}>{item.label}</Typography>
                {item.items.map(item => (
                  <SubmenuLink
                    key={item.key}
                    className={cx(item.key === currentMenu[0] && "active")}
                    {...item}
                    onClick={handleResetIsHover}
                  ></SubmenuLink>
                ))}
              </Stack>
            ))}
          </Box>
        ) : (
          <>
            {section.children
              // only show sub menu item when the href is set
              ?.filter(subItem => subItem.href)
              .map(subItem => (
                <SubmenuLink
                  key={subItem.key}
                  className={cx(subItem.key === currentMenu[0] && "active")}
                  {...subItem}
                  onClick={handleResetIsHover}
                ></SubmenuLink>
              ))}
          </>
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
          dark={dark}
          className={cx(currentMenu.includes(item.key) && "active")}
          onMouseEnter={e => handleMouseEnter(e, item.key)}
          onMouseLeave={handleMouseLeave}
        >
          <span>{item.label}</span>
          {item.new && (
            <Box sx={{ backgroundColor: "#B5F5EC", padding: "0 0.8rem", height: "2rem", lineHeight: "2rem", borderRadius: "0.4rem", ml: "1rem" }}>
              <Typography sx={{ fontSize: "1.2rem", lineHeight: "2rem", fontWeight: 600 }}>NEW</Typography>
            </Box>
          )}
          <SvgIcon
            className={cx("expand-more", item.key === checked && "expand-more-reverse")}
            sx={{ fontSize: "0.9rem", ml: "1rem" }}
            component={TriangleDownSvg}
            inheritViewBox
          ></SvgIcon>
          {item.key === checked && (
            <StyledPopper open={true} placement="bottom-start" anchorEl={anchorEl} transition bgColor={navbarBg} dark={dark}>
              {({ TransitionProps }) => (
                <StyledFade {...TransitionProps}>
                  <SubMenuList onClick={handleMouseLeave}>{renderSubMenuList(item.children)}</SubMenuList>
                </StyledFade>
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
        <LinkStyledButton
          className={currentMenu.includes(item.key) ? "active" : ""}
          dark={dark}
          href={item.href}
          end={item.end}
          key={item.key}
          reloadDocument={item.reload}
          onClick={() => {
            sendGAEvent("event", "click_menu", {
              label: item.label,
              device: "desktop",
            })
          }}
        >
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
    <StyledBox
      bgColor={navbarBg}
      dark={dark}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={e => {
        setIsHover(false)
      }}
    >
      <Announcement />
      <Container>
        <HeaderContainer>
          <ScrollLink href="/" className="flex">
            <Logo light={dark} />
          </ScrollLink>
          <Stack direction="row" spacing={isDesktop ? "4.4rem" : "2rem"} alignItems="center">
            <Box>{renderNavigationList()}</Box>
            {showWalletConnector && <WalletToolkit dark={dark}></WalletToolkit>}
            {showLanguageSelect && <LanguageSelect></LanguageSelect>}
          </Stack>
        </HeaderContainer>
      </Container>
    </StyledBox>
  )
}

export default DesktopHeader
