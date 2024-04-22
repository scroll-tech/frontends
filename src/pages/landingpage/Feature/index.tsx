import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import FeatureIcon1 from "@/assets/images/home/feature_icon_1.png"
import FeatureIcon2 from "@/assets/images/home/feature_icon_2.png"
import FeatureIcon3 from "@/assets/images/home/feature_icon_3.png"
import FeatureIcon4 from "@/assets/images/home/feature_icon_4.png"
import { FadeInUp, SlideInLeft, SlideInRight } from "@/components/Animation"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import WebpImage from "@/components/WebpImage"
import useCheckViewport from "@/hooks/useCheckViewport"

const FEATURES = [
  {
    icon: FeatureIcon1,
    title: "EVM-compatibility for seamless scaling",
    description:
      "Scroll is designed by and for Ethereum developers. A swift, reliable and scalable Layer 2 blockchain, Scroll extends Ethereum's capabilities, enabling apps to scale without any surprises. Thanks to bytecode-level compatibility, existing Ethereum apps can migrate onto Scroll as-is, and at a significantly reduced cost.",
  },
  {
    icon: FeatureIcon2,
    title: "Collective vision for Ethereum’s future",
    description:
      "We’ve been building in the open since day one with the Ethereum community. Our open development approach combines the best ideas among value-aligned contributors and leads to more secure and better-designed systems. Scroll is forging a community-driven path to redefine and evolve Ethereum’s roadmap.",
  },
  {
    icon: FeatureIcon3,
    title: "Unwavering security at every layer",
    description:
      "Scroll uses advanced zero knowledge proof technology, battle-tested EVM models, and rigorous audits to ensure that our foundation is rooted in security and reliability. By prioritizing code security through open source collaboration, Scroll protects our developers and users against vulnerabilities.",
  },
  {
    icon: FeatureIcon4,
    title: "Rooted in technical rigor and credibility",
    description:
      "Stability and trustworthiness are the building blocks to our network’s growth. Scroll is steadfast in maintaining credible neutrality to reduce imbalances of power within our ecosystem. In pursuit of our long-term vision, we immerse ourselves in solving meaningful and challenging research problems with a focus on technical detail, accuracy, and results.",
  },
]

const FeatureBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10rem",
  paddingBottom: "16rem",
  "&:nth-of-type(even)": {
    flexDirection: "row-reverse",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column !important",
    alignItems: "flex-start",
    paddingBottom: "10rem",
    gap: "6rem",
    "& *": {
      textAlign: "center!important",
    },
  },
  [theme.breakpoints.up("xl")]: {
    paddingBottom: "20rem",
    gap: "20rem",
  },
}))

const FeatureIcon = styled(WebpImage)(({ theme }) => ({
  width: "100%",
  display: "inline-block",
  [theme.breakpoints.up("md")]: {
    maxWidth: "47.4rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "60%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
}))

const FeatureTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  marginBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "0.8rem",
    textAlign: "center",
  },
}))

const FeatureTextBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    maxWidth: "47.4rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    textAlign: "center",
  },
}))

const Spacer = styled(Box)(({ theme }) => ({
  height: "6.6vw",
  minHeight: "10rem",
}))

const FeatureDescription = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}))

const Feature = () => {
  const { isPortrait } = useCheckViewport()

  const ComponentToRender = (featureIdx, elementIdx, children) => {
    if (isPortrait) {
      return <FadeInUp>{children}</FadeInUp>
    }

    const isEven = featureIdx % 2 === 0

    if (elementIdx === 0) {
      return isEven ? <SlideInLeft triggerOnce>{children}</SlideInLeft> : <SlideInRight triggerOnce>{children}</SlideInRight>
    } else {
      return isEven ? <SlideInRight triggerOnce>{children}</SlideInRight> : <SlideInLeft triggerOnce>{children}</SlideInLeft>
    }
  }

  const renderFeatures = () => {
    return FEATURES.map((feature, featureIdx) => {
      return (
        <FeatureBox key={featureIdx}>
          {ComponentToRender(featureIdx, 0, <FeatureIcon src={feature.icon} />)}
          {ComponentToRender(
            featureIdx,
            1,
            <FeatureTextBox>
              <FeatureTitle variant="H4">{feature.title}</FeatureTitle>
              <FeatureDescription variant="Body3">{feature.description}</FeatureDescription>
            </FeatureTextBox>,
          )}
        </FeatureBox>
      )
    })
  }

  return (
    <SectionWrapper>
      <FadeInUp>
        <SectionHeader
          title="Zero knowledge required"
          content="Scroll’s mission is to provide an accessible scaling solution that preserves the essence of Ethereum – trust-minimized, secure and open source. Like a scroll, our story is constantly evolving in our quest to secure Ethereum’s future and making the developer experience as easy as possible."
        />
      </FadeInUp>
      <Spacer />
      {renderFeatures()}
    </SectionWrapper>
  )
}

export default Feature
