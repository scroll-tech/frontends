import { Box } from "@mui/material"

import Gallary from "./Gallary"
import Header from "./Header"

const Ecosystem = () => {
  return (
    <Box
      sx={{
        maxWidth: "1300px",
        mt: "18rem",
        mx: "auto",
        px: "12rem",
      }}
    >
      <Header></Header>
      <Gallary></Gallary>
    </Box>
  )
}

export default Ecosystem
