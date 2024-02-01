import { useRef } from "react"

import { Box, Typography } from "@mui/material"

import { ReactComponent as Top2_5Svg } from "@/assets/svgs/sticker-contest-result/top2-5.svg"
import { ReactComponent as WinnerSvg } from "@/assets/svgs/sticker-contest-result/winner.svg"
import { ReactComponent as FinalistsSvg } from "@/assets/svgs/sticker-contest/finalists.svg"
import Link from "@/components/Link"
import ScrollExpandedBg from "@/components/ScrollExpandedBg"
import { STICKER_CONTEST_NOTION_URL } from "@/constants"
import Gallery from "@/pages/sticker-vote/components/Gallery"
import Title from "@/pages/sticker-vote/components/Title"

import Winner from "./Winner"
import data from "./data.json"

const StickerContest = () => {
  const contentRef = useRef<HTMLElement>()

  return (
    <ScrollExpandedBg sx={{ pt: ["3.6rem", "7.2rem"] }} anchorEl={contentRef} bottomColor="brand">
      <Box
        ref={contentRef}
        sx={{
          position: "relative",
          width: "100%",
          px: ["2rem", "2rem", "6rem"],
          pb: ["6rem", "12rem"],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& p.MuiTypography-root": { color: theme => `${theme.palette.primary.contrastText} !important` },
        }}
      >
        <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], lineHeight: ["2.4rem", "3.2rem"], textAlign: "center", maxWidth: "100rem" }}>
          Thank you all creators! Here are the result of our contest which are voted by our community. Check out{" "}
          <Link sx={{ fontSize: "inherit", whiteSpace: "nowrap" }} underline="always" href={STICKER_CONTEST_NOTION_URL} external>
            the contest details
          </Link>{" "}
          here.
        </Typography>
        <Title content={WinnerSvg}></Title>
        <Winner data={data.winner}></Winner>
        <Title content={Top2_5Svg}></Title>
        <Gallery data={data["top2-5"]}></Gallery>
        <Title content={FinalistsSvg}></Title>
        <Gallery data={data.remaining}></Gallery>
      </Box>
    </ScrollExpandedBg>
  )
}

export default StickerContest
