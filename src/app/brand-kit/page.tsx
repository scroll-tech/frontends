import { Box } from "@mui/material"

import Assets from "./Assets"
import Header from "./Header"

const BrandKit = () => {
  return (
    <Box sx={{ overflow: "hidden", backgroundColor: "themeBackground.brand" }}>
      <Header />
      <Assets />
    </Box>
  )
}

export default BrandKit
