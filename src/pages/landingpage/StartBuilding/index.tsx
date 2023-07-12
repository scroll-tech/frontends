import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

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

const StartBuilding = () => {
  return (
    <Container>
      <Title>Scroll into the Future of Ethereum</Title>
      <Button href="" target="_blank" color="primary">
        Start building
      </Button>
    </Container>
  )
}

export default StartBuilding
