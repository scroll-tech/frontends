// import { Fade } from "react-awesome-reveal"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"

import TextMarquee from "./components/TextMarquee"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: "13.8rem",
  paddingBottom: "15.5rem",
  [theme.breakpoints.down("md")]: {
    padding: "6.8rem 2rem 10rem",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "0.4rem",
  },
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  marginTop: "2rem",
  marginBottom: "5rem",
  maxWidth: "77rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "4rem",
  },
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "3rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2rem",
  },
}))

const Header = () => {
  return (
    <Container>
      <FadeInUp duration={700} sx={{ display: "flex" }}>
        <Title variant="H1" data-aos="fade-up">
          Scroll is
        </Title>

        <TextMarquee />
        <SubTitle variant="Body1" textAlign="center">
          Scroll seamlessly extends Ethereum’s capabilities through zero knowledge tech and EVM compatibility. The L2 network built by Ethereum devs
          for Ethereum devs.
        </SubTitle>
        <ButtonContainer>
          <Button href="/bridge" color="primary">
            Bridge into Scroll
          </Button>
          <Button target="_blank" href="https://docs.scroll.io/en/home/">
            Start building
          </Button>
        </ButtonContainer>
      </FadeInUp>
    </Container>
  )
}

export default Header
