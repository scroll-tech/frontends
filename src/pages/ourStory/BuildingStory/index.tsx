import { makeStyles } from "tss-react/mui"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

import StoryCard from "./StoryCard"

const STORIES = [
  {
    cover: "imgs/story/story-blog-cover.png",
    title: "Our philosophy on zk...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum auctor sem et malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum auctor sem et malesuada.",
  },
  {
    title: "Podcast title here",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum auctor sem et malesuada.",
  },
  {
    title: "News article here",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum auctor sem et malesuada.",
  },
  {
    title: "KOL blog here",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum auctor sem et malesuada.",
  },
  {
    title: "Founder blog here",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum auctor sem et malesuada.",
  },
  {
    cover: "imgs/story/story-blog-cover.png",
    title: "We <3 our devs...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum auctor sem et malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum auctor sem et malesuada.",
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "3rem",
    marginTop: "11rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridGap: "2rem",
      marginTop: "5rem",
    },
  },
  withCover: {
    gridColumn: "span 2",
  },
  noCover: {
    gridColumn: "span 1",
  },
}))

const BuildingStory = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper sx={{ pt: ["11rem", "26rem"], pb: ["12rem", "13rem"] }}>
      <SectionHeader
        title="Read the stories behind building Scroll"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut urna iaculis quam mollis consequat."
      ></SectionHeader>
      <SuccessionToView className={classes.grid}>
        {STORIES.map(item => (
          <SuccessionItem key={item.title} className={item.cover ? classes.withCover : classes.noCover}>
            <StoryCard key={item.title} {...item}></StoryCard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default BuildingStory
