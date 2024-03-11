import React, { useEffect, useRef, useState } from "react"

import { Box, Container as MuiContainer, Typography } from "@mui/material"
import { styled } from "@mui/system"

import ScalabilityIcon from "@/assets/images/home/start_bridge.png"
import SecurityIcon from "@/assets/images/home/start_link.png"
import EVMEquivalenceIcon from "@/assets/images/home/start_setting.png"
import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import { NETWORKS } from "@/constants"
import { isProduction } from "@/utils"

const tokenName = isProduction ? "ETH" : "testnet ETH"
const l2NetworkName = isProduction ? NETWORKS[1].name : NETWORKS[1].name + " testnet"

const STEPS = [
  {
    icon: ScalabilityIcon,
    title: "Bridge your ETH",
    description: `You can bridge your ${tokenName} to ${l2NetworkName} using our native bridge or another ecosystem bridge. For a walkthrough, start with the user guide’s setup page.`,
  },
  {
    icon: SecurityIcon,
    title: "Change RPC provider",
    description: `To configure your Ethereum tools to Scroll you’ll just need to point your favorite builder tools to a Scroll RPC Provider.`,
  },
  {
    icon: EVMEquivalenceIcon,
    title: "Build with your usual dev tools",
    description: "Start building with your favorite toolkit.",
  },
]

const Container = styled(Box)(({ theme }) => ({
  borderRadius: "40px 40px 0px 0px",
  paddingTop: "15.4rem",
  maxWidth: "152rem",
  paddingBottom: "16rem",
  background: "transparent",
  display: "flex !important",
  justifyContent: "center",
  position: "relative",
  margin: "0 auto",
  "& .MuiContainer-root": {
    position: "relative",
    maxWidth: "152rem",
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: "5.4rem",
    paddingBottom: "0",
  },
}))

const InnerBox = styled(MuiContainer)(({ theme }) => ({
  position: "relative",
  width: "100%",
}))

const Background = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0",
  bottom: "0",
  width: "100%",
  background: "#101010",
  willChange: "width, height",
  borderRadius: "40px 40px 0px 0px",
}))

const StepContainer = styled(SuccessionToView)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "2rem",
  marginBottom: "13rem",
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
}))

const StepIcon = styled("img")(({ theme }) => ({
  height: "4rem",
  objectFit: "contain",
  marginBottom: "2.2rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "1.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "3rem",
    marginBottom: "1.2rem",
  },
}))

const StepTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.primary.contrastText,
  marginBottom: "2rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "1.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "0.8rem",
  },
}))

const StepDescription = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.primary.contrastText,
  maxWidth: "32.6rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}))

const GetStart = () => {
  const [, setScrollPosition] = useState(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const calculateWidth = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      const viewTop = window.innerHeight

      if (rect.top <= viewTop) {
        const scrolledDistance = viewTop - rect.top
        const percentageScrolled = Math.min(scrolledDistance / viewTop, 1)
        let ratio = 0.5
        if (window.innerWidth <= 1920 && window.innerWidth > 1680) {
          ratio = 1
        }
        if (window.innerWidth > 1920) {
          ratio = 2
        }
        const widthIncrease = ratio * percentageScrolled
        const targetWidthPercentage = 100 + widthIncrease * 100

        return `${targetWidthPercentage}%`
      }
    }
    return "100%" //default value
  }

  return (
    <Container>
      <Background sx={{ width: calculateWidth() }} />
      <InnerBox ref={sectionRef}>
        <FadeInUp>
          <SectionHeader
            dark
            sx={{ mb: ["10rem", "12.5rem"] }}
            title="Getting started with Scroll"
            content="Scroll is compatible with Ethereum at the bytecode-level, meaning everything works right out of the box."
            action={
              <Button href="https://docs.scroll.io/en/home/" target="_blank" color="primary">
                Start building
              </Button>
            }
          ></SectionHeader>
        </FadeInUp>

        <StepContainer>
          {STEPS.map((feature, idx) => (
            <SuccessionItem key={idx}>
              <StepBox className="step-box">
                <StepIcon src={feature.icon} />
                <StepTitle variant="H4">{feature.title}</StepTitle>
                <StepDescription variant="Body3">{feature.description}</StepDescription>
              </StepBox>
            </SuccessionItem>
          ))}
        </StepContainer>
      </InnerBox>
    </Container>
  )
}

export default GetStart
