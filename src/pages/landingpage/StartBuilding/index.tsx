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
    fontSize: "3.2rem",
    lineHeight: "4.3rem",
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
    paddingTop: "5.2rem",
    paddingBottom: "6rem",
  },
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "3rem",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "2rem",
  },
}))

const StartBuilding = () => {
  return (
    <Container>
      <FadeInUp>
        <Title>Scroll into the Future of Ethereum</Title>
        <ButtonContainer>
          <Button target="_blank" color="primary">
            Bridge into Scroll
          </Button>
          <Button target="_blank">Start building</Button>
        </ButtonContainer>
      </FadeInUp>
    </Container>
  )
}

export default StartBuilding
