import React, { useEffect, useRef, useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import ScalabilityIcon from "@/assets/images/homepage/home/start_bridge.png"
import SecurityIcon from "@/assets/images/homepage/home/start_link.png"
import EVMEquivalenceIcon from "@/assets/images/homepage/home/start_setting.png"
import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"

const STEPS = [
  {
    icon: ScalabilityIcon,
    title: "Bridge your ETH",
    description:
      "Once you’ve acquired testnet ETH, you can bridge your testnet ETH to the Scroll Sepolia Testnet (Layer 2) using our bridge. For a walkthrough, start with the user guide’s setup page.",
  },
  {
    icon: SecurityIcon,
    title: "Change RPC provider",
    description:
      "Configure your Ethereum tools to the Scroll Sepolia testnet. You’ll just need to point your favorite builder tools at a Scroll Sepolia Testnet RPC Provider.",
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
  paddingBottom: "16rem",
  background: "transparent",
  display: "flex !important",
  justifyContent: "center",
  position: "relative",
  maxWidth: "144rem",
  margin: "0 auto",
  "& .MuiContainer-root": {
    position: "relative",
  },
  [theme.breakpoints.down("md")]: {
    paddingBottom: "0",
  },
}))

const InnerBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingLeft: "24px",
  paddingRight: "24px",
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
  display: "flex",
  // justifyContent: "space-between",
  marginBottom: "13rem",
  "& > div": {
    flex: 1,
  },
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
    flexDirection: "column",
    marginBottom: "2rem",
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
  [theme.breakpoints.down("md")]: {
    marginBottom: "7.2rem",
  },
}))

const StepIcon = styled("img")(({ theme }) => ({
  height: "4rem",
  objectFit: "contain",
  marginBottom: "2.8rem",
  [theme.breakpoints.down("md")]: {
    height: "3rem",
    marginBottom: "1.5rem",
  },
}))

const StepTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: "#ffffff",
  marginBottom: "2.4rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "1rem",
    fontSize: "2rem",
  },
}))

const StepDescription = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: "#ffffff",
  maxWidth: "32.6rem",
  [theme.breakpoints.down("md")]: {
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
        const ratio = window.innerHeight > 1900 ? 2 : 0.5
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
            sx={{ mb: "10rem", mt: ["-10rem", 0] }}
            title="Getting started with Scroll"
            content="Scroll is compatible with Ethereum at bytecode-level, meaning everything works right out of the box."
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
