import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import ScalabilityIcon from "@/assets/images/homepage/home/feature_icon_1.png"
import SecurityIcon from "@/assets/images/homepage/home/feature_icon_2.png"
import EVMEquivalenceIcon from "@/assets/images/homepage/home/feature_icon_3.png"
import Button from "@/components/Button"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import WebpImage from "@/components/WebpImage"

const FEATURES = [
  {
    icon: ScalabilityIcon,
    title: "Proof of a powerful new way to scale",
    description:
      "Scroll leverages a novel hierarchical zero-knowledge proof system and removes the tradeoff between security and scalability with minimal trust assumptions, fast finality, and seamless migration from the base layer.",
  },
  {
    icon: SecurityIcon,
    title: "We put security first at every step",
    description:
      "We’ve built trust with the Ethereum community using fully open-source code since day one. From a developer's perspective, building in the open leads to more secure and better-designed systems that combine the best ideas among value-aligned developers.",
  },
  {
    icon: EVMEquivalenceIcon,
    title: "Ethereum equivalent, byte by byte",
    description:
      "Scroll is one of the most familiar developer experiences outside Ethereum itself. EVM-compatible smart contracts can be easily deployed to Scroll. And thanks to bytecode-level compatibility, existing Ethereum apps can migrate onto Scroll as is.",
  },
  {
    icon: SecurityIcon,
    title: "Security first at every step",
    description:
      "Scroll prioritizes security by leveraging battle-tested EVM models and conducting rigorous audits. We believe the open-source DNA of Scroll will make it the most secure and robust ZK-rollup, helping us maintain the highest level of code security.",
  },
]

const FeatureBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10rem",
  paddingBottom: "16rem",
  "&:nth-of-type(odd)": {
    flexDirection: "row-reverse",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column !important",
    alignItems: "flex-start",
    paddingBottom: "11.8rem",
    "&:nth-of-type(odd)": {
      alignItems: "flex-end",
      "& *": {
        textAlign: "right !important",
      },
    },
  },
}))

const FeatureIcon = styled(WebpImage)(({ theme }) => ({
  width: "47.4rem",
  [theme.breakpoints.down("md")]: {
    width: "18.5rem",
  },
}))

const FeatureTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  marginBottom: "2rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "1rem",
  },
}))

const FeatureTextBox = styled(Box)(({ theme }) => ({
  width: "47.4rem",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    width: "35rem",
  },
}))

const FeatureDescription = styled(Typography)(({ theme }) => ({ textAlign: "left" }))

const Feature = () => {
  return (
    <SectionWrapper>
      <SectionHeader
        sx={{ mb: "10rem" }}
        title="Zero Knowledge Required"
        content="Our zero knowledge obsession is more than just secure off-chain proofs. We’re committed to making the Ethereum developer experience as easy as possible, with familiar developer tools, no new languages, 3rd-party integrations, product synergy and built-in incentives. Scroll is:"
        action={
          <Button href="" target="_blank" color="primary">
            Read our story
          </Button>
        }
      ></SectionHeader>
      {FEATURES.map((feature, idx) => (
        <FeatureBox key={idx}>
          <FeatureIcon src={feature.icon} />
          <FeatureTextBox>
            <FeatureTitle variant="H4">{feature.title}</FeatureTitle>
            <FeatureDescription variant="Body3">{feature.description}</FeatureDescription>
          </FeatureTextBox>
        </FeatureBox>
      ))}
    </SectionWrapper>
  )
}

export default Feature
