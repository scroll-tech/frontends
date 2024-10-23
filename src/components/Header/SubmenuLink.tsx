import ReactGA from "react-ga4"
import { NavLink } from "react-router-dom"

import { Box, Link, Stack, SvgIcon, Typography } from "@mui/material"
import { CSSObject, Theme, styled } from "@mui/system"

import { ReactComponent as ExternalSvg } from "@/assets/svgs/header/External.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const linkStyles = (theme: Theme, dark: boolean): CSSObject => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  cursor: "pointer",
  whiteSpace: "nowrap",
  color: dark ? theme.palette.primary.contrastText : theme.palette.text.primary,
  textDecoration: "none",
  minWidth: "16rem",
  "& p, & svg": {
    lineHeight: "2.4rem",
    cursor: "pointer",
    color: "inherit",
  },
  "&:hover": {
    cursor: "pointer",
    color: dark ? theme.palette.primary.contrastText : theme.palette.primary.main,
    "& svg": {
      opacity: 1,
      left: "0.8rem",
      color: theme.palette.primary.main,
    },
  },
  "&.active": {
    color: theme.palette.primary.main,
  },
})

interface StyledNavLinkProps {
  dark?: boolean
  to?: string
}

interface StyledLinkProps {
  dark?: boolean
  href?: string
}

const StyledNavLink = styled(NavLink, {
  shouldForwardProp: prop => prop !== "dark",
})<StyledNavLinkProps>(({ theme, dark }) => linkStyles(theme, !!dark))

const StyledLink = styled(Link, {
  shouldForwardProp: prop => prop !== "dark",
})<StyledLinkProps>(({ theme, dark }) => linkStyles(theme, !!dark))

const SubmenuLinkContent = ({ icon, label, text, isExternal }: { icon: any; label: string; text?: string; isExternal?: boolean }) => {
  const { isDesktop } = useCheckViewport()

  const handleClick = () => {
    ReactGA.event("click_menu", {
      label: text || label,
      device: isDesktop ? "desktop" : "mobile",
    })
  }

  return (
    <Stack direction="row" alignItems="center" spacing="1.6rem" sx={{ width: "100%" }} onClick={handleClick}>
      {icon && <SvgIcon sx={{ fontSize: "2.4rem" }} component={icon} inheritViewBox></SvgIcon>}
      <Box>
        {text && <Typography fontWeight={600}>{text}</Typography>}
        <Typography>{label}</Typography>
      </Box>
      {isExternal && (
        <SvgIcon
          sx={{
            fontSize: "1.2rem",
            marginLeft: "0 !important",
            transition: "all 0.3s ease",
            position: "relative",
            left: 0,
            opacity: 0,
          }}
          component={ExternalSvg}
          inheritViewBox
        ></SvgIcon>
      )}
    </Stack>
  )
}

const SubmenuLink = ({
  label,
  text,
  href,
  isExternal,
  icon,
  dark,
  reload,
}: {
  label: string
  text?: string
  href: string
  isExternal?: boolean
  icon?: any
  dark?: boolean
  reload?: boolean
}) => (
  <>
    {isExternal ? (
      <StyledLink dark={dark} href={href} target="_blank" rel="noopener noreferrer">
        <SubmenuLinkContent icon={icon} label={label} text={text} isExternal={isExternal} />
      </StyledLink>
    ) : (
      <StyledNavLink dark={dark} to={href} reloadDocument={reload}>
        <SubmenuLinkContent icon={icon} label={label} text={text} isExternal={isExternal} />
      </StyledNavLink>
    )}
  </>
)

export default SubmenuLink
