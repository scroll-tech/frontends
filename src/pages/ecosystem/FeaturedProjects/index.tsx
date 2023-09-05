import { makeStyles } from "tss-react/mui"

import { ReactComponent as AaveSvg } from "@/assets/svgs/refactor/ecosystem-Aave.svg"
import { ReactComponent as GnosisSafeSvg } from "@/assets/svgs/refactor/ecosystem-GnosisSafe.svg"
import { ReactComponent as OmniKingdomsSvg } from "@/assets/svgs/refactor/ecosystem-OmniKingdoms.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

import FeaturedCard from "./FeaturedCard"

const featuredProjects = [
  {
    name: "Gnosis Safe",
    ext: ".png",
    desc: "Gnosis Safe is the safety standard of Web3 and the most trusted platform to manage digital assets for individuals and communities.",
    website: "https://gnosis-safe.io/",
    twitterHandle: "safe",
    tags: ["Infrastructure", "Wallet"],
    logo: GnosisSafeSvg,
  },
  {
    name: "OmniKingdoms",
    ext: ".png",
    desc: "Cross-chain MMORPG that emphasizes on-chain gaming",
    website: "https://omnikingdoms.io",
    twitterHandle: "OmniKingdoms",
    tags: ["Community", "Gaming", "NFT"],
    logo: OmniKingdomsSvg,
  },
  {
    name: "Aave",
    ext: ".svg",
    desc: "Aave is a non-custodial, open-sourced decentralized liquidity protocol that enables people to supply and borrow crypto assets.",
    website: "https://aave.com/",
    twitterHandle: "aaveaave",
    tags: ["DeFi"],
    logo: AaveSvg,
  },
]

const useStyles = makeStyles()(theme => ({
  flex: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "3rem",
    marginTop: "12rem",
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "8rem",
    },
    "@media (max-width: 760px)": {
      marginTop: "5.2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    },
    [theme.breakpoints.down("sm")]: {
      gap: "2rem",
    },
  },
}))

const FeaturedProjects = props => {
  const { classes } = useStyles()
  return (
    <SectionWrapper dark sx={{ pb: ["12rem", "16rem"] }}>
      <SectionHeader
        dark
        title="Featured projects"
        content="Our story is continually being written and shaped by the community. Here are some exciting examples of projects making an impact on our world."
      ></SectionHeader>
      <SuccessionToView className={classes.flex}>
        {featuredProjects.map(item => (
          <SuccessionItem key={item.name}>
            <FeaturedCard {...item}></FeaturedCard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default FeaturedProjects
