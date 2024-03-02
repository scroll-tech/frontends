import { makeStyles } from "tss-react/mui"

import { Box, Link, Typography } from "@mui/material"
import { styled } from "@mui/system"

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
    paddingBottom: "16rem",
    gap: "3.2rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "7.2rem",
    },
  },
}))

const ExternalLink = styled(Link)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "2rem",
  height: "2.1rem",
  lineHeight: "2.1rem",
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}))

const Newscard = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  "& *": {
    cursor: "pointer !important",
  },
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.01)",
  },
}))

const NewsCover = styled("img")(({ theme }) => ({
  width: "100%",
}))

const News = () => {
  const { classes } = useStyles()

  const handleClick = news => {
    window.open(news.link, "_blank")
  }

  return (
    <SectionWrapper>
      <Typography sx={{ fontSize: ["3.2rem", "4.8rem"], mb: ["3.2rem", "5.6rem"] }}>Learn more</Typography>
      <SuccessionToView className={classes.grid}>
        {NEWS.map((item, index) => (
          <SuccessionItem key={index}>
            <Newscard onClick={() => handleClick(item)}>
              <NewsCover src={item.cover} />
              <Typography
                sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, mt: ["1.3rem", "1.8rem", "2.2rem"], mb: ["0.8rem", "1.4rem", "2rem"] }}
              >
                {item.title}
              </Typography>
              <ExternalLink underline="none" href={item.link}>
                {item.domain}
                <svg style={{ marginLeft: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M9 1V7.86538L7.83812 6.7035V2.96385C5.46463 5.26924 3.29542 7.77999 0.853849 10L0 9.16344C2.42536 6.94344 4.5762 4.46728 6.93347 2.1781H3.31272L2.13462 1H9Z"
                    fill="currentColor"
                  />
                </svg>
              </ExternalLink>
            </Newscard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default News
