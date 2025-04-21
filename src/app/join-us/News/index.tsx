"use client"

import { makeStyles } from "tss-react/mui"

import { Box, Link, Typography } from "@mui/material"
import { lineHeight, styled } from "@mui/system"

import ExternalLinkSvg from "@/assets/svgs/common/external-link.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"

const NEWS = [
  {
    cover: "/imgs/career/news/news-cover-1.png",
    title: "Get introduced to zkRollups and zkEVMs",
    domain: "youtube.com",
    link: "https://www.youtube.com/watch?v=JdjRcW13LME",
  },
  {
    cover: "/imgs/career/news/news-cover-2.png",
    title: "What it means to build in the open on the Zero Knowledge podcast",
    domain: "zeroknowledge.fm",
    link: "https://zeroknowledge.fm/275-2/",
  },
  {
    cover: "/imgs/career/news/news-cover-3.png",
    title: "Diving Deep into ZK with Scroll’s Co-Founders",
    domain: "blockworks.co",
    link: "https://blockworks.co/podcast/empire/dc33c4f8-da5f-11ec-a5ac-27c2459d4600",
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "3.2rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
}))

const ExternalLink = styled(Link)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "1.6rem",
  lineHeight: "3.2rem",
  display: "flex",
  alignItems: "center",
  color: theme.vars.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    lineHeight: "2.4rem",
  },
}))

const Newscard = styled(Box)(() => ({
  cursor: "pointer",
  "& *": {
    cursor: "pointer !important",
  },
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.01)",
  },
})) as typeof Box

const NewsCover = styled("img")(() => ({
  width: "100%",
}))

const News = () => {
  const { classes } = useStyles()

  const handleClick = news => {
    window.open(news.link, "_blank")
  }

  return (
    <SectionWrapper sx={{ pt: ["11.6rem", "21.3rem"], pb: ["9.8rem", "16.2rem"] }}>
      <Typography sx={{ typography: "title", fontSize: ["2.4rem", "3.2rem"], lineHeight: ["4rem", "5.6rem"], mb: "3.2rem" }}>Learn more</Typography>
      <SuccessionToView className={classes.grid}>
        {NEWS.map((item, index) => (
          <SuccessionItem key={index}>
            <Newscard onClick={() => handleClick(item)}>
              <NewsCover src={item.cover} />
              <Typography
                sx={{
                  typography: "title",
                  fontSize: "2rem",
                  lineHeight: "3rem",
                  mt: "1.6rem",
                  mb: "0.8rem",
                }}
              >
                {item.title}
              </Typography>
              <ExternalLink underline="none" href={item.link}>
                {item.domain}
                <ExternalLinkSvg className="w-[1rem] h-auto ml-[8px]"></ExternalLinkSvg>
              </ExternalLink>
            </Newscard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default News
