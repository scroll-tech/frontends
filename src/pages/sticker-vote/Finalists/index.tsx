import { useRef } from "react"

import { Box, Typography } from "@mui/material"

import { ReactComponent as FinalistsSvg } from "@/assets/svgs/sticker-contest/finalists.svg"
import Button from "@/components/Button"
import Link from "@/components/Link"
import ScrollExpandedBg from "@/components/ScrollExpandedBg"
import { STICKER_CONTEST_DISCORD_VOTE_URL, STICKER_CONTEST_NOTION_URL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import Gallery from "../components/Gallery"
import Title from "../components/Title"
import data from "./data.json"

const StickerContest = () => {
  const { isMobile } = useCheckViewport()
  const contentRef = useRef<HTMLElement>()

  return (
    <ScrollExpandedBg sx={{ pt: 0 }} anchorEl={contentRef} bottomColor="brand">
      <Box
        ref={contentRef}
        sx={{
          position: "relative",
          width: "100%",
          px: ["2rem", "2rem", "6rem"],
          pb: ["4rem", "12rem"],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& p.MuiTypography-root": { color: theme => `${theme.palette.primary.contrastText} !important` },
        }}
      >
        <Title content={FinalistsSvg}></Title>
        <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], lineHeight: ["2.4rem", "3.2rem"], textAlign: "center", maxWidth: "100rem", mb: "2.4rem" }}>
          Thank you all creators! Here are the 10 finalists that are the most creative and fun with great craft. Now, it's time to cast your votes for
          the top 5 on Discord! Check out{" "}
          <Link sx={{ fontSize: "inherit", whiteSpace: "nowrap" }} underline="always" href={STICKER_CONTEST_NOTION_URL} external>
            the contest details
          </Link>{" "}
          here.
        </Typography>
        <Button color="primary" width={isMobile ? "22.4rem" : "28.5rem"} href={STICKER_CONTEST_DISCORD_VOTE_URL} target="_blank">
          Vote on Discord Now
        </Button>
        <Box sx={{ width: "100%", pt: ["3.6rem", "4.8rem"], pb: ["3.2rem", "7.2rem"] }}>
          <Gallery data={data}></Gallery>
        </Box>
        <Button color="primary" width={isMobile ? "22.4rem" : "28.5rem"} href={STICKER_CONTEST_DISCORD_VOTE_URL} target="_blank">
          Vote on Discord Now
        </Button>
      </Box>
    </ScrollExpandedBg>
  )
}

export default StickerContest
