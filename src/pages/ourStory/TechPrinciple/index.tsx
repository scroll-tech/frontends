import { makeStyles } from "tss-react/mui"

import { Box, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as DecentralisationSvg } from "@/assets/svgs/refactor/story-decentralisation.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/refactor/story-eth.svg"
import { ReactComponent as ExternalSvg } from "@/assets/svgs/refactor/story-external.svg"
import { ReactComponent as SecuritySvg } from "@/assets/svgs/refactor/story-security.svg"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

const PRINCIPLES = [
  {
    icon: SecuritySvg,
    title: (
      <>
        Security <br /> at every step
      </>
    ),
    content: "Scroll provides full Layer 1 security on Layer 2, ensuring a secure and decentralized consensus mechanism.",
  },
  {
    icon: EthSvg,
    title: (
      <>
        Ethereum equivalence,
        <br /> byte by byte
      </>
    ),
    content: "Seamless migration with EVM-equivalence, eliminating code changes and disruptions for users and developers.",
  },
  null,
  null,
  null,
  null,
  {
    icon: ExternalSvg,
    title: (
      <>
        Proof of a powerful
        <br /> new way to scale
      </>
    ),
    content: "Scroll utilizes a novel hierarchical zero-knowledge proof system, enabling secure and scalable operations with fast finality.",
  },
  {
    icon: DecentralisationSvg,
    title: (
      <>
        Decentralization
        <br /> across all layers
      </>
    ),
    content: "Scroll embraces openness to achieve decentralization across node operators, provers, sequencers, and our entire community.",
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: "5rem",
    gridRowGap: "8rem",
    marginTop: "8rem",
  },
}))

const OurStory = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper full sx={{ pt: "13.5rem" }}>
      <SectionHeader
        title="Our technical principles"
        content="Comprehensive security, Ethereum equivalence for seamless developer experience, and decentralization across all layers are at the core of how we build Scroll."
      ></SectionHeader>
      <Box className={classes.grid}>
        {PRINCIPLES.map(item => (
          <>
            {item ? (
              <Box>
                <SvgIcon sx={{ fontSize: "3.2rem" }} component={item.icon} inheritViewBox></SvgIcon>
                <Typography sx={{ fontSize: "2.4rem", fontWeight: 600, mt: "2.6rem", mb: "2rem" }}>{item.title}</Typography>
                <Typography>{item.content}</Typography>
              </Box>
            ) : (
              <Box></Box>
            )}
          </>
        ))}
      </Box>
    </SectionWrapper>
  )
}

export default OurStory
