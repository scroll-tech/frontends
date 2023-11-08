import { Box } from "@mui/material"

import Header from "./Header"
import Mission from "./Mission"
import News from "./News"
import Perks from "./Perks"
import Positions from "./Positions"
import WorkApproach from "./WorkApproach"

const Career = () => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Header />
      <Mission />
      <WorkApproach />
      <Perks />
      <News />
      <Positions />
    </Box>
  )
}

export default Career
