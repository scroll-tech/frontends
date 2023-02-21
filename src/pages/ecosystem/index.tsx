import { Box } from "@mui/material"

import Gallary from "./Gallary"
import Header from "./Header"

const Ecosystem = () => {
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "1020px",
        mt: ["7.6rem", "10rem", "18rem"],
        mx: "auto",
        px: "3rem",
      }}
    >
      <Box
        sx={{
          width: ["20rem", "66rem"],
          height: ["14rem", "50rem"],
          background: ["radial-gradient(closest-side, #FF852D2D, transparent)", "radial-gradient(closest-side, #FF852D40, transparent)"],
          position: "absolute",
          top: ["-6rem", "-20rem"],
          left: ["-5rem", "-32rem"],
        }}
      ></Box>
      <Header></Header>
      <Gallary></Gallary>
    </Box>
  )
}

export default Ecosystem
