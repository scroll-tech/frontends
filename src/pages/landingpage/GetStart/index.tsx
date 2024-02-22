import React, { useEffect, useState } from "react"

import { Box, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as BuildSvg } from "@/assets/svgs/landingpage/build.svg"
import { ReactComponent as BuildCoverSvg } from "@/assets/svgs/landingpage/build_cover.svg"
import { ReactComponent as ChangeRPCSvg } from "@/assets/svgs/landingpage/change-rpc.svg"
import { ReactComponent as ETHSvg } from "@/assets/svgs/landingpage/eth.svg"
import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

const STEPS = [
  {
    icon: ETHSvg,
    title: "Bridge your ETH",
    description: "Bridge your ETH to Scroll using our native bridge or another ecosystem bridge.",
  },
  {
    icon: ChangeRPCSvg,
    title: "Change RPC provider",
    description: "Point your favorite builder tools to a Scroll RPC Provider to configure.",
  },
  {
    icon: BuildSvg,
    title: "Build with your usual dev tools",
    description: "Start building with your favorite toolkit.",
  },
]

const StyledBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
}))

const StepContainer = styled(SuccessionToView)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "4.8rem",
  // marginBottom: "13rem",
  "& > div:nth-of-type(1) img": {
    width: "2.3rem",
  },
  "& > div:nth-of-type(2) img": {
    width: "3.4rem",
  },
  "& > div:nth-of-type(3) img": {
    width: "3.3rem",
  },
  [theme.breakpoints.down("md")]: {
    rowGap: "5.6rem",
    gridTemplateColumns: "repeat(2, 1fr)",
    marginBottom: "10rem",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    marginBottom: "5.6rem",
    "& > div:nth-of-type(1) img": {
      width: "3.3rem",
    },
    "& > div:nth-of-type(2) img": {
      width: "3.2rem",
    },
    "& > div:nth-of-type(3) img": {
      width: "2.8rem",
    },
  },
}))

const StepBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "0.8rem",
}))

const StepTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.text.primary,
  lineHeight: "3.4rem",
  [theme.breakpoints.down("md")]: {
    // marginBottom: "1.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    // marginBottom: "0.8rem",
  },
}))

const StepDescription = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.text.primary,
  lineHeight: "2.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}))

const GetStart = () => {
  const [, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <SectionWrapper sx={{ pt: ["9.6rem"], pb: [0] }}>
      <FadeInUp>
        <SectionHeader
          sx={{ mb: ["5.4", "5.4rem"] }}
          title="Build with Scroll"
          content="Scroll is compatible with Ethereum at the bytecode-level, meaning everything works right out of the box."
          action={
            <Button href="https://docs.scroll.io/en/home/" target="_blank" color="primary">
              Start building
            </Button>
          }
        ></SectionHeader>
      </FadeInUp>

      <StyledBox>
        <StepContainer>
          {STEPS.map((feature, idx) => (
            <SuccessionItem key={idx}>
              <StepBox>
                <SvgIcon sx={{ height: "3.2rem", width: "3.2rem", objectFit: "contain" }} component={feature.icon} inheritViewBox></SvgIcon>
                <StepTitle variant="H4">{feature.title}</StepTitle>
                <StepDescription variant="Body3">{feature.description}</StepDescription>
              </StepBox>
            </SuccessionItem>
          ))}
        </StepContainer>
        <SvgIcon
          sx={{ objectFit: "contain", height: "100%", width: "auto", textAlign: "right", justifySelf: "end" }}
          component={BuildCoverSvg}
          inheritViewBox
        ></SvgIcon>
      </StyledBox>
    </SectionWrapper>
  )
}

export default GetStart
