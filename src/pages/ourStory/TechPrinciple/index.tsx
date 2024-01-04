import { Fragment } from "react"
import { makeStyles } from "tss-react/mui"

import { SvgIcon, Typography } from "@mui/material"

import { ReactComponent as DecentralisationSvg } from "@/assets/svgs/story/decentralisation.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/story/eth.svg"
import { ReactComponent as ExternalSvg } from "@/assets/svgs/story/external.svg"
import { ReactComponent as SecuritySvg } from "@/assets/svgs/story/security.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"

const PRINCIPLES = [
  {
    icon: SecuritySvg,
    title: (
      <>
        Security <br /> at every step
      </>
    ),
    mobileTitle: "Security at every step",
    mobileScale: "0.88",
    content: "Scroll provides full Layer 1 security on Layer 2, ensuring a secure and decentralized consensus mechanism.",
  },
  {
    icon: EthSvg,
    title: (
      <>
        Ethereum compatibility,
        <br /> byte by byte
      </>
    ),
    mobileTitle: "Ethereum compatibility, byte by byte",
    mobileScale: "0.87",
    content: "Scroll permits seamless migration with EVM-compatibility, eliminating code changes and disruptions for users and developers.",
  },
  {
    icon: ExternalSvg,
    title: (
      <>
        Proof of a powerful
        <br /> new way to scale
      </>
    ),
    mobileTitle: "Proof of a powerful new way to scale",
    mobileScale: "0.73",
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
    mobileScale: "0.785",
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
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gap: "6rem",
    },
  },
}))

const TechPrinciple = () => {
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()

  return (
    <SectionWrapper>
      <SectionHeader
        title="Our technical principles"
        content="Comprehensive security, Ethereum compatibility for seamless developer experience, and decentralization across all layers are at the core of how we build Scroll."
      ></SectionHeader>
      <SuccessionToView className={classes.grid}>
        {PRINCIPLES.map((item, index) => (
          <SuccessionItem key={index}>
            <SvgIcon
              sx={{ width: "auto", height: "auto", "@media (max-width: 600px)": { transform: `scale(${item.mobileScale})` } }}
              component={item.icon}
              inheritViewBox
            ></SvgIcon>
            <Typography sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, mt: ["1.3rem", "1.8rem", "2.2rem"], mb: ["0.8rem", "1.4rem", "2rem"] }}>
              {isMobile ? item.mobileTitle : item.title}
            </Typography>
            <Typography sx={{ fontSize: ["1.6rem", "2rem"] }}>{item.content}</Typography>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default TechPrinciple
