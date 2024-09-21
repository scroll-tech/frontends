import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import FeatureIcon1 from "@/assets/images/home/feature_icon_1.png"
import FeatureIcon3 from "@/assets/images/home/feature_icon_3.png"
import FeatureIcon4 from "@/assets/images/home/feature_icon_4.png"
import { FadeInUp, SlideInLeft, SlideInRight } from "@/components/Animation"
import SectionWrapper from "@/components/SectionWrapper"
import WebpImage from "@/components/WebpImage"
import useCheckViewport from "@/hooks/useCheckViewport"

const FEATURES = [
  {
    icon: FeatureIcon1,
    title: "By builders, for builders.",
    description:
      "Scroll is designed from the ground-up to maximize compatibility with Ethereum Virtual Machine. Thanks to bytecode-level compatibility with EVM, your existing applications and favorite tools are compatible with Scroll out-of-the-box. Being the most popular virtual machine for blockchains, EVM enables new developers to easily pick up Solidity or Vyper through countless tutorials, open-source code, and online communities.",
  },
  {
    icon: FeatureIcon4,
    title: "Open-source and transparent.",
    description:
      "Since day one, Scroll has been built in the open by our core team and many others within the Ethereum community. Open-source building has empowered us to embrace the best ideas of the vast Ethereum community and to ensure that we have many eyes on the code to improve its security.",
  },
  {
    icon: FeatureIcon3,
    title: "Security above everything else.",
    description:
      "Scroll utilizes battle-tested code and rigorous audits to ensure the utmost security of the protocol. We are constantly improving our practices to harden the protocol’s infrastructure through all available means.",
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
  height: "1.6rem",
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
      <Spacer />
      {renderFeatures()}
    </SectionWrapper>
  )
}

export default Feature
