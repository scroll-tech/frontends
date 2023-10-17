import { makeStyles } from "tss-react/mui"

import Button from "@/components/Button"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import StoryCard from "@/pages/ourStory/BuildingStory/StoryCard"

const STORIES = [
  {
    cover: "/imgs/homepage/blog-cover-1.svg",
    title: "Build with Scroll: Quickstart Guide",
    content:
      "Check out our documentation and start developing and deploying on Scroll right away with all of your favorite tools for building and testing smart contracts.",
    href: "https://docs.scroll.io/en/home/",
    imageTitle: (
      <>
        Build <br></br>
        with Scroll
      </>
    ),
  },
  {
    title: "Scroll’s Fresh Coat: A Community Touch",
    content: "Discover our updated website and developer portal, shaped with community insights and collaboration.",
    href: "/blog/scrolls-fresh-coat",
  },
  {
    title: "A Letter from Scroll: Mainnet is Here!",
    content: "As we open the doors to Mainnet, our co-founders share what it took to reach this milestone and where we go from here. ",
    href: null,
  },
  {
    title: "Announcing the 'Contribute to Scroll' Initiative",
    content:
      "Open-source contributions are one of the most important cornerstones of the digital age, and at Scroll, we firmly believe in the power of community and are thrilled to introduce our initiative.",
    href: "/blog/contributeToScroll",
  },
  {
    title: "Scroll’s Architecture Overview",
    content:
      "This post provides insights into Scroll's architecture evolution, highlighting the transformation of our zkEVM into a comprehensive zkRollup solution for Ethereum.",
    href: "/blog/architecture",
  },
  {
    cover: "/imgs/homepage/blog-cover-2.svg",
    title: "Mainnet Launch Livestream",
    content: "Hear from Scroll co-founders, engineering and research teams, ecosystem projects, and more. Join us!",
    href: null,
    imageTitle: (
      <>
        Mainnet Launch<br></br> Livestream
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
        content="Learn more about zero knowledge proofs, zkEVMs, and the future of scaling Ethereum."
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
