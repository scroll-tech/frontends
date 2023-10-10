import { useMemo } from "react"
import { useMatch } from "react-router-dom"

import { Stack } from "@mui/material"
import { styled } from "@mui/system"

import Link from "@/components/Link"
import { isProduction, requireEnv } from "@/utils"

const AnnouncementStack = styled<any>(Stack)(
  ({ theme, production }) => `
    line-height: 2.6rem;
    background: ${production ? "#62e6d4" : theme.palette.primary.main};
    text-align: center;
    color: ${production ? theme.palette.text.primary : theme.palette.primary.contrastText};
    font-size: 1.6rem;
    padding: 1.6rem;
    display: inline-block;
  `,
)

const ReadMoreLink = styled("a")(
  ({ theme }) => `
  font-weight: 700;
  `,
)

const Announcement = () => {
  const isHome = useMatch("/")
  const isPortal = useMatch("/portal")

  const announcementContent = useMemo(() => {
    if (isProduction && (isHome || isPortal)) {
      return (
        <>
          Scroll {requireEnv("REACT_APP_SCROLL_ENVIRONMENT")} is now live. <ReadMoreLink href="/portal">Try it!</ReadMoreLink>
        </>
      )
    } else if (!isProduction) {
      return (
        <>
          You are on the Scroll {requireEnv("REACT_APP_SCROLL_ENVIRONMENT")} Testnet website. Return to{" "}
          <Link style={{ color: "inherit" }} href="https://scroll.io/" external>
            Mainnet
          </Link>
        </>
      )
    }
    return null
  }, [isProduction, isHome, isPortal])

  return announcementContent && <AnnouncementStack production={isProduction}>{announcementContent}</AnnouncementStack>
}

export default Announcement
