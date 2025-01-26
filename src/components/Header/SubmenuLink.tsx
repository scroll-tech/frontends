import { sendGAEvent } from "@next/third-parties/google"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"
import { CSSObject, Theme, styled } from "@mui/material/styles"

import ExternalSvg from "@/assets/svgs/header/External.svg"
import Link from "@/components/Link"
import useCheckViewport from "@/hooks/useCheckViewport"

const linkStyles = (theme: Theme, dark: boolean): CSSObject => ({
  fontSize: "1.8rem",
  fontWeight: 400,
  cursor: "pointer",
  whiteSpace: "nowrap",
  color: dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary,
  textDecoration: "none",
  minWidth: "16rem",
  "& p, & svg": {
    lineHeight: "2.4rem",
    cursor: "pointer",
    color: "inherit",
  },
  "&:hover": {
    cursor: "pointer",
    color: dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.primary.main,
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
  href?: string
  reloadDocument?: boolean
}

const StyledNavLink = styled(Link, {
  shouldForwardProp: prop => prop !== "dark",
})<StyledNavLinkProps>(({ theme, dark }) => linkStyles(theme, !!dark))

const SubmenuLinkContent = ({ icon, label, text, isExternal }: { icon: any; label: string; text?: string; isExternal?: boolean }) => {
  const { isDesktop } = useCheckViewport()

  const handleClick = () => {
    sendGAEvent("event", "click_menu", {
      label: text || label,
      device: isDesktop ? "desktop" : "mobile",
    })
  }

  return (
    <Stack direction="row" alignItems="center" spacing="1.6rem" sx={{ width: "100%" }} onClick={handleClick}>
      {icon && <SvgIcon sx={{ fontSize: "2.4rem" }} component={icon} inheritViewBox></SvgIcon>}
      <Box>
        {text && <Typography fontWeight={600}>{text}</Typography>}
        <Typography sx={{ whiteSpace: ["pre-wrap", "nowrap"] }}>{label}</Typography>
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
  className,
  onClick,
}: {
  label: string
  text?: string
  href: string
  isExternal?: boolean
  icon?: any
  dark?: boolean
  reload?: boolean
  className?: string
  onClick?: () => {}
}) => (
  <>
    <StyledNavLink className={className} dark={dark} href={href} external={isExternal} reloadDocument={reload} onClick={onClick}>
      <SubmenuLinkContent icon={icon} label={label} text={text} isExternal={isExternal} />
    </StyledNavLink>
  </>
)

export default SubmenuLink
