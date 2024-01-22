import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: "4.8rem",
  fontSize: "4rem",
  fontWeight: 500,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    marginBottom: "3.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3.2rem",
    marginBottom: "2.8rem",
  },
}))

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "15.3rem",
  paddingBottom: "16rem",
  borderRadius: "40px 40px 0px 0px",
  background: "#FFF0DD",
  [theme.breakpoints.down("md")]: {
    paddingTop: "8.4rem",
    paddingBottom: "9rem",
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: "5.4rem",
    paddingBottom: "6rem",
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

const StartBuilding = () => {
  return (
    <Container>
      <FadeInUp>
        <Title>Scroll into the future of Ethereum</Title>
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

export default StartBuilding
