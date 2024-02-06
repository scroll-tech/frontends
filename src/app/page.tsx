import { Box } from "@mui/material"

import Blog from "./_components/Blog"
import Feature from "./_components/Feature"
import GetStart from "./_components/GetStart"
import Header from "./_components/Header"
import Partners from "./_components/Partners"
import StartBuilding from "./_components/StartBuilding"

const LandingPage = () => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Header />
      <Box
        sx={{
          width: "100%",
          borderRadius: "4rem 4rem 0 0",
          height: {
            // [theme.breakpoints.up('xl')]
            xl: "24vw",
            md: "50.8rem",
            xs: "37rem",
          },
          background: {
            xs: "url(/imgs/homepage/section_1_bg_mobile.svg) center / cover no-repeat",
            md: "url(/imgs/homepage/section_1_bg.svg) center / cover no-repeat",
          },
        }}
      />
      <Feature />
      <GetStart />
      <Partners />
      <Blog />
      <StartBuilding />
    </Box>
  )
}

export default LandingPage
