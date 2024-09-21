// import { Fade } from "react-awesome-reveal"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: "11rem",
  paddingBottom: "6.6rem",
  [theme.breakpoints.down("md")]: {
    padding: "6.8rem 2rem 10rem",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: "2.4rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "2rem",
    textAlign: "center",
  },
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "4rem",
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
          Ethereum, Extended.
        </Title>

        <SubTitle variant="Body1" textAlign="center">
          Scroll is the leading zero-knowledge rollup. Scaling Ethereum for good.
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
