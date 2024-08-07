import { useMemo } from "react"
import { useMatch } from "react-router-dom"

import { Stack } from "@mui/material"
import { styled } from "@mui/system"

import { isMainnet } from "@/utils"

const AnnouncementStack = styled<any>(Stack, { shouldForwardProp: prop => prop !== "production" })(({ theme, production }) => ({
  lineHeight: "2.6rem",
  background: production ? "rgb(181, 245, 236)" : theme.palette.primary.main,
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

  const announcementContent = useMemo(() => {
    if (isMainnet && isHome) {
      return (
        <>
          🔥 Applications for the Level Up Grants Program are open until August 25. <strong className="underline"> Apply now!</strong>
        </>
      )
    }
    return null
  }, [isMainnet, isHome])

  const rightHref = useMemo(() => {
    if (isMainnet && isHome) {
      return "https://tally.so/r/mYdQP5"
    }
    return ""
  }, [isMainnet, isHome])

  return (
    announcementContent && (
      <a href={rightHref} rel="noopener noreferrer">
        <AnnouncementStack production={isMainnet}>{announcementContent}</AnnouncementStack>
      </a>
    )
  )
}

export default Announcement
