import { useMemo } from "react"
import { useMatch } from "react-router-dom"

import { Stack } from "@mui/material"
import { styled } from "@mui/system"

import { isMainnet, requireEnv } from "@/utils"

const AnnouncementStack = styled<any>(Stack, { shouldForwardProp: prop => prop !== "production" })(({ theme, production }) => ({
  lineHeight: "2.6rem",
  background: production ? "#62e6d4" : theme.palette.primary.main,
  textAlign: "center",
  color: production ? theme.palette.text.primary : theme.palette.primary.contrastText,
  fontSize: "1.6rem",
  padding: "1.2rem",
  display: "inline-block",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    lineHeight: "2rem",
  },
}))

const Announcement = () => {
  const isHome = useMatch("/")
  const isPortal = useMatch("/portal")

  const announcementContent = useMemo(() => {
    if (isMainnet && (isHome || isPortal)) {
      return (
        <>
          Scroll {requireEnv("REACT_APP_SCROLL_ENVIRONMENT")} is now live. <strong>Try it!</strong>
        </>
      )
    } else if (!isMainnet) {
      return (
        <>
          You are on the Scroll {requireEnv("REACT_APP_SCROLL_ENVIRONMENT")} Testnet website. Return to <strong>Mainnet</strong>
        </>
      )
    }
    return null
  }, [isMainnet, isHome, isPortal])

  const rightHref = useMemo(() => {
    if (isMainnet && (isHome || isPortal)) {
      return "/portal"
    } else if (!isMainnet) {
      return "https://scroll.io/"
    }
    return ""
  }, [isMainnet, isHome, isPortal])

  return (
    announcementContent && (
      <a href={rightHref} rel="noopener noreferrer">
        <AnnouncementStack production={isMainnet}>{announcementContent}</AnnouncementStack>
      </a>
    )
  )
}

export default Announcement
