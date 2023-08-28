import { Fragment } from "react"
import { isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { Box, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as DecentralisationSvg } from "@/assets/svgs/refactor/story-decentralisation.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/refactor/story-eth.svg"
import { ReactComponent as ExternalSvg } from "@/assets/svgs/refactor/story-external.svg"
import { ReactComponent as SecuritySvg } from "@/assets/svgs/refactor/story-security.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
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
    mobileTitle: "Security at every step",
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
    mobileTitle: "Ethereum equivalence, byte by byte",
    content: "Scroll permits seamless migration with EVM-equivalence, eliminating code changes and disruptions for users and developers.",
  },
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
    mobileTitle: "Proof of a powerful new way to scale",
    content: "Scroll utilizes a novel hierarchical zero knowledge proof system, enabling secure and scalable operations with fast finality.",
  },
  {
    icon: DecentralisationSvg,
    title: (
      <>
        Decentralization
        <br /> across all layers
      </>
    ),
    mobileTitle: "Decentralization across all layers",
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
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gap: "6rem",
    },
  },
  empty: {
    gridColumn: "span 2",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}))

const TechPrinciple = () => {
  const { classes } = useStyles()

  return (
    <SectionWrapper>
      <SectionHeader
        title="Our technical principles"
        content="Comprehensive security, Ethereum equivalence for seamless developer experience, and decentralization across all layers are at the core of how we build Scroll."
      ></SectionHeader>
      <SuccessionToView className={classes.grid}>
        {PRINCIPLES.map((item, index) => (
          <Fragment key={index}>
            {item ? (
              <SuccessionItem>
                <SvgIcon sx={{ fontSize: ["2.8rem", "3.2rem"] }} component={item.icon} inheritViewBox></SvgIcon>
                <Typography sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, mt: ["1rem", "2.6rem"], mb: ["1rem", "2rem"] }}>
                  {isMobileOnly ? item.mobileTitle : item.title}
                </Typography>
                <Typography sx={{ fontSize: "1.6rem" }}>{item.content}</Typography>
              </SuccessionItem>
            ) : (
              <Box className={classes.empty}></Box>
            )}
          </Fragment>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default TechPrinciple
