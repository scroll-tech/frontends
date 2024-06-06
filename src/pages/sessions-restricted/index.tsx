import Img from "react-cool-img"

import { Container, Typography } from "@mui/material"

import ScrollySad from "@/assets/images/common/scrolly-sad.png"

const SessionsRestricted = () => {
  return (
    <Container
      sx={{
        height: ["calc(100vh - 6.2rem - 5rem)", "calc(100vh - 6.5rem - 13.4rem )"],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: ["1.6rem", "3.2rem"],
      }}
    >
      <Img src={ScrollySad} width={120} height={120}></Img>
      <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.8rem", "3.2rem"], fontWeight: 600, textAlign: "center" }}>
        Scroll Sessions is not available<br></br>in your region.
      </Typography>
    </Container>
  )
}

export default SessionsRestricted
