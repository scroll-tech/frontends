import { usePathname } from "next/navigation"
import { useMemo } from "react"
import Marquee from "react-fast-marquee"

import { Box } from "@mui/material"

import { isSepolia } from "@/utils"

const Announcement = () => {
  const displayAnnouncement = true
  const pathname = usePathname()
  const isHome = pathname === "/"

  const announcementContent = useMemo(() => {
    if (!isSepolia && isHome) {
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
  }, [isSepolia, isHome])

  const rightHref = useMemo(() => {
    if (!isSepolia && isHome) {
      return "https://open.scroll.io"
    }
    return ""
  }, [isSepolia, isHome])

  return displayAnnouncement && announcementContent ? (
    <a href={rightHref} rel="noopener noreferrer">
      <Box
        sx={{
          backgroundColor: theme => (!isSepolia ? theme.palette.common.white : theme.palette.primary.main),
          color: theme => (!isSepolia ? theme.palette.text.primary : theme.palette.primary.contrastText),
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
