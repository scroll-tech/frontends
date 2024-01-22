import { makeStyles } from "tss-react/mui"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

import StoryCard from "./StoryCard"

const STORIES = [
  {
    cover: "imgs/story/story-blog-cover-1.png",
    title: "What it means to build in the open on the Zero Knowledge podcast",
    imageTitle: (
      <>
        Building in<br></br> the Open
      </>
    ),
    content:
      "Scroll co-founders Ye Zhang and Sandy Peng talk with Anna Rose about progress made over the past year and what it really means for Scroll to build in the open.",
    href: "https://zeroknowledge.fm/275-2/",
  },
  {
    title: "Where Scroll Stands in the Ethereum Scaling Race",
    content:
      "Scroll co-founder Sandy Peng is interviewed by the CoinDesk team about why “slow and steady” is the best way to build deliberately in web3.",
    href: "https://www.coindesk.com/video/scroll-co-founder-on-ethereum-scaling-race/",
  },
  {
    title: "Diving Deep Into ZK With Scroll’s Co-Founders",
    content:
      "Scroll’s co-founders explore how zk tech will scale Ethereum, the power of validity proofs, and Scroll’s technical advantages on the Empire podcast.",
    href: "https://blockworks.co/podcast/empire/dc33c4f8-da5f-11ec-a5ac-27c2459d4600",
  },
  {
    title: "zkEVMs in 2023 and Why Deploy on Scroll",
    content: "Hear Scroll partnership lead Lea Schmitt recap what 2023 has meant for the realm of zkEVMs and why you should deploy on Scroll.",
    href: "https://www.youtube.com/watch?v=maddK7ch0v0",
  },
  {
    title: "Get Introduced to zkRollups and zkEVMs",
    content:
      "Scroll co-founder Haichen gives an overview of the scalability problem on Ethereum, what zkRollups and zkEVMs are, how they work, and why they are necessary.",
    href: "https://www.youtube.com/watch?v=JdjRcW13LME",
  },
  {
    cover: "imgs/story/story-blog-cover-2.png",
    imageTitle: (
      <>
        Building Blocks <br></br>of Scroll
      </>
    ),
    title: "Architecture, Decentralization, and Scroll’s Community-Oriented Mindset",
    content: "Hear Scroll co-founder Ye Zhang chat about Scroll’s infra, performance, and developer experience on the HODLong 后浪 podcast.",
    href: "https://hodlong-hou-lang.simplecast.com/episodes/ep24-en-scroll-loZKiYu5",
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
        title="Read the stories behind building Scroll"
        content="Check out what our founders, community members, and thought leaders are saying about Scroll and building a native zkEVM."
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
