import { usePathname } from "next/navigation"
import { useMemo } from "react"
import Marquee from "react-fast-marquee"

import { Box } from "@mui/material"

import { isMainnet } from "@/utils"

const Announcement = () => {
  const displayAnnouncement = true
  const pathname = usePathname()
  const isHome = pathname === "/"

  const announcementContent = useMemo(() => {
    if (isMainnet && isHome) {
      return (
        <>
          Join Scroll Open: Build the Future of the Open Economy{" "}
          <div className="inline-block w-[5px] h-[5px] rounded-full bg-current mx-[20px] align-middle"></div>
          Jan 27 - March 17
          <div className="inline-block w-[5px] h-[5px] rounded-full bg-current mx-[20px] align-middle"></div>
        </>
      )
    }
    return null
  }, [isMainnet, isHome])

  const rightHref = useMemo(() => {
    if (isMainnet && isHome) {
      return "https://open.scroll.io"
    }
    return ""
  }, [isMainnet, isHome])

  return displayAnnouncement && announcementContent ? (
    <a href={rightHref} rel="noopener noreferrer">
      <Box
        sx={{
          backgroundColor: theme => (isMainnet ? theme.palette.common.white : theme.palette.primary.main),
          color: theme => (isMainnet ? theme.palette.text.primary : theme.palette.primary.contrastText),
          fontSize: "1.6rem",
          lineHeight: {
            xs: "2rem",
            sm: "2.6rem",
          },
          padding: "1.6rem",
          width: "100%",
          borderBottom: "1px solid #101010",
          fontWeight: "500",
        }}
      >
        <Marquee autoFill pauseOnHover gradient={false}>
          {announcementContent}
        </Marquee>
      </Box>
    </a>
  ) : null
}

export default Announcement
