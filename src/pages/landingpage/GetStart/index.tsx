import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import ScalabilityIcon from "@/assets/images/homepage/home/start_bridge.png"
import SecurityIcon from "@/assets/images/homepage/home/start_link.png"
import EVMEquivalenceIcon from "@/assets/images/homepage/home/start_setting.png"
import Button from "@/components/Button"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

const STEPS = [
  {
    icon: ScalabilityIcon,
    title: "Bridge your ETH",
    description:
      "Once you’ve acquired testnet ETH, you can bridge your testnet ETH to the Scroll Alpha Testnet (Layer 2) using our Bridge. For a walkthrough, start with the User Guide's Setup page.",
  },
  {
    icon: SecurityIcon,
    title: "Change RPC provider",
    description:
      "Configure your Ethereum tools to the Scroll Alpha testnet. You’ll just need to point your favorite builder tools at a Scroll Alpha Testnet RPC Provider.",
  },
  {
    icon: EVMEquivalenceIcon,
    title: "Build with your usual dev tools",
    description: "Start building with your favorite toolkit.",
  },
]

const Container = styled(SectionWrapper)(({ theme }) => ({
  borderRadius: "40px 40px 0px 0px",
  background: "linear-gradient(to bottom, black, black calc(100% - 18.5rem), white calc(100% - 18.5rem))",
}))

const StepContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "13rem",
  gap: "1.6rem",
  "& .step-box:nth-of-type(1) img": {
    width: "4.3rem",
  },
  "& .step-box:nth-of-type(2) img": {
    width: "4rem",
  },
  "& .step-box:nth-of-type(3) img": {
    width: "3.4rem",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    marginBottom: "5rem",
    "& .step-box:nth-of-type(1) img": {
      width: "3.3rem",
    },
    "& .step-box:nth-of-type(2) img": {
      width: "3.2rem",
    },
    "& .step-box:nth-of-type(3) img": {
      width: "2.8rem",
    },
  },
}))

const StepBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    marginBottom: "5.2rem",
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
  },
}))

const StepDescription = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: "#ffffff",
  maxWidth: "32.6rem",
}))

const Poster = styled(Box)(({ theme }) => ({
  height: "37rem",
  background: "url(/imgs/home/section_1_bg.png) center  / cover no-repeat ",
  margin: "0 auto",
  borderRadius: "4rem",
}))

const GetStart = () => {
  return (
    <Container>
      <SectionHeader
        dark
        sx={{ mb: "13rem" }}
        title="Getting started with Scroll"
        content="Scroll is compatible with Ethereum at the bytecode level, meaning everything works right out of the box."
        action={
          <Button href="" target="_blank" color="primary">
            Start building
          </Button>
        }
      ></SectionHeader>
      <StepContainer>
        {STEPS.map((feature, idx) => (
          <StepBox className="step-box" key={idx}>
            <StepIcon src={feature.icon} />
            <StepTitle variant="H4">{feature.title}</StepTitle>
            <StepDescription variant="Body3">{feature.description}</StepDescription>
          </StepBox>
        ))}
      </StepContainer>
      <Poster />
    </Container>
  )
}

export default GetStart
