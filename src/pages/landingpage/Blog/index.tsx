import { makeStyles } from "tss-react/mui"

import { Typography } from "@mui/material"

import Button from "@/components/Button"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import StoryCard from "@/pages/ourStory/BuildingStory/StoryCard"

const STORIES = [
  {
    cover: "/imgs/homepage/landing-blog-1.webp",
    title: "Build with Scroll: Quickstart Guide",
    content:
      "Check out our documentation and start developing and deploying on Scroll right away with all of your favorite tools for building and testing smart contracts.",
    href: "https://docs.scroll.io/en/home/",
    imageTitle: (
      <>
        <Typography sx={{ fontSize: ["2.4rem", "4rem"], lineHeight: ["2.4rem", "4rem"], fontWeight: 600, color: "primary.contrastText" }}>
          Build with Scroll
        </Typography>
        <Typography
          sx={{
            fontSize: ["2rem", "3.2rem"],
            lineHeight: ["2.4rem", "4rem"],
            fontWeight: 600,
            color: "primary.contrastText",
            mt: ["0.6rem", "1.2rem"],
          }}
        >
          Quickstart Guide
        </Typography>
      </>
    ),
  },
  {
    title: "Navigating the Future of Scroll",
    content: "Dive into our latest reflections, strategic advancements and plans for the future of Scroll.",
    href: "/blog/scroll-everyone-everywhere",
  },
  {
    title: "Latest Tech Updates",
    content: "Explore how Scroll's Darwin upgrade is redefining efficiency by reducing gas fees with advanced proof aggregation.",
    href: "/blog/proof-recursion-scrolls-darwin-upgrade",
  },
  {
    title: "Explore Scroll's Thriving Ecosystem",
    content:
      "Join the growing network of developers and innovators building on Scroll, where over 500 projects leverage our zk-tech and the fastest finality in the market.",
    href: "/ecosystem",
  },
  {
    title: "Level Up your Developer Skills",
    content: "Level up your Solidity skills and development expertise through a series of challenges and enriching developer content.",
    href: "https://www.levelup.xyz/",
  },
  {
    cover: "/imgs/homepage/landing-blog-2.webp",
    title: "Build Your Onchain Story",
    content:
      "Create your unique on-chain identity on Scroll Canvas, where you can collect and display badges that celebrate your achievements and contributions within the Scroll ecosystem.",
    href: "/canvas-and-badges",
    imageTitle: (
      <>
        <Typography sx={{ fontSize: ["2.4rem", "4rem"], lineHeight: ["2.4rem", "4rem"], fontWeight: 600, color: "primary.contrastText" }}>
          Scroll Canvas
        </Typography>
        <Typography
          sx={{
            fontSize: ["2rem", "3.2rem"],
            lineHeight: ["2.4rem", "4rem"],
            fontWeight: 600,
            color: "primary.contrastText",
            mt: ["0.6rem", "1.2rem"],
          }}
        >
          Build Your <br></br>
          Onchain Story
        </Typography>
      </>
    ),
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "3rem",
    marginTop: "11rem",
    [theme.breakpoints.between("md", "lg")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridGap: "2rem",
      marginTop: "5rem",
    },
  },
  withCover: {
    gridColumn: "span 2",
    overflow: "hidden",
    [theme.breakpoints.between("md", "lg")]: {
      gridColumn: "span 1",
      gridRow: "span 2",
    },
  },
  noCover: {
    gridColumn: "span 1",
    overflow: "hidden",
    [theme.breakpoints.between("md", "lg")]: {
      gridRow: "span 1",
    },
    [theme.breakpoints.down("md")]: {
      gridColumn: "span 2",
    },
  },
  cardItem5: {
    [theme.breakpoints.between("md", "lg")]: {
      gridRow: "3 / 5",
      gridColumn: 2,
    },
    [theme.breakpoints.down("md")]: {
      gridRow: 4,
    },
  },
}))

const BuildingStory = () => {
  const { classes, cx } = useStyles()

  return (
    <SectionWrapper sx={{ pt: ["11rem", "18rem", "26rem"], pb: ["12rem", "13rem"] }}>
      <SectionHeader
        title="Begin your journey with Scroll"
        content="Learn more about building on Scroll, our latest updates, initiatives, ecosystem additions, and the future of scaling Ethereum."
        action={
          <Button href="/blog" color="primary">
            Read more
          </Button>
        }
      ></SectionHeader>
      <SuccessionToView className={classes.grid}>
        {STORIES.map((item, index) => (
          <SuccessionItem key={item.title} className={cx(item.cover ? classes.withCover : classes.noCover, classes[`cardItem${index}`])}>
            <StoryCard key={item.title} {...item}></StoryCard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default BuildingStory
