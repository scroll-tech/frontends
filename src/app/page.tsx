"use client"

import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

import Blog from "./_components/Blog"
import Feature from "./_components/Feature"
import GetStart from "./_components/GetStart"
import Header from "./_components/Header"
import Partners from "./_components/Partners"
import StartBuilding from "./_components/StartBuilding"

const Container = styled(Box)(({ theme }) => ({
  overflow: "hidden",
}))

const StyledBox = styled(Box)(({ theme }) => ({
  height: "37rem",
  width: "100%",
  background: "url(/imgs/homepage/section_1_bg.svg) center / cover no-repeat",
  borderRadius: "4rem 4rem 0 0",
  [theme.breakpoints.down("md")]: {
    height: "50.8rem",
    background: "url(/imgs/homepage/section_1_bg_mobile.svg) center / cover no-repeat",
  },
  [theme.breakpoints.up("xl")]: {
    height: "24vw",
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
