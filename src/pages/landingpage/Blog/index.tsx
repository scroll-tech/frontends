import { isMobileOnly } from "react-device-detect"
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
    href: "/blog/scrollsFreshCoat",
  },
  {
    title: "Announcing the Scroll Beta Testnet on Sepolia",
    content: "Learn about the infastructure updates and improvements in our Beta Testnet as we enter the final phase before Mainnet.",
    href: "/blog/alphaTestnet",
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
    title: "Join Scroll at ETH Warsaw",
    content: "Scroll will be in Warsaw, Poland, from Aug 31-Sept 3. Come say hi and grab some new swag!",
    href: "https://www.notion.so/scrollzkp/cc9ae9da3d894a90937e04818542e97d?v=a08e1f4656104aefa7b8d3ac829f1c90",
    imageTitle: (
      <>
        Scroll at<br></br>ETH Warsaw
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
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridGap: "2rem",
      marginTop: "10rem",
    },
  },
  withCover: {
    gridColumn: "span 2",
    overflow: "hidden",
  },
  noCover: {
    gridColumn: "span 1",
    overflow: "hidden",
  },
  cardItem5: {
    gridRow: 3,
  },
}))

const BuildingStory = () => {
  const { classes, cx } = useStyles()

  return (
    <SectionWrapper sx={{ pt: ["11rem", "26rem"], pb: ["12rem", "13rem"] }}>
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
          <SuccessionItem
            key={item.title}
            className={cx(item.cover ? classes.withCover : classes.noCover, isMobileOnly && classes[`cardItem${index}`])}
          >
            <StoryCard key={item.title} {...item}></StoryCard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default BuildingStory
