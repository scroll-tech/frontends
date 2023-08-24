import { Box } from "@mui/material"
import { styled } from "@mui/system"

import Blog from "./Blog"
import Feature from "./Feature"
import GetStart from "./GetStart"
import Header from "./Header"
import Partners from "./Partners"
import StartBuilding from "./StartBuilding"

const Container = styled(Box)(({ theme }) => ({
  overflow: "hidden",
}))

const StyledBox = styled(Box)(({ theme }) => ({
  height: "37rem",
  width: "100%",
  background: "url(/imgs/home/section_1_bg.png) center / cover no-repeat",
  borderRadius: "4rem 4rem 0 0",
  [theme.breakpoints.down("md")]: {
    height: "50.8rem",
    background: "url(/imgs/home/section_1_bg_mobile.png) center / cover no-repeat",
  },
}))

const LandingPage = () => {
  return (
    <Container>
      <Header />
      <StyledBox />
      <Feature />
      <GetStart />
      <Partners />
      <Blog />
      <StartBuilding />
    </Container>
  )
}

export default LandingPage
