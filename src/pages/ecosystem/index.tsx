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
          width: "56rem",
          height: "40rem",
          background: "radial-gradient(closest-side, #FF852D40, transparent)",
          position: "absolute",
          top: "-16rem",
          left: "-24rem",
        }}
      ></Box>
      <Header></Header>
      <Gallary></Gallary>
    </Box>
  )
}

export default Ecosystem
