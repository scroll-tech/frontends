import { Box, Container, Stack, Typography } from "@mui/material"

import CONTENT_DATA from "../Content/data"
import CallBox from "./CallBox"
import StepItem from "./StepItem"

const BuilderPortalHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: "themeBackground.builder",
        position: "relative",
        height: ["max-content", "auto"],
        aspectRatio: ["auto", "auto", "auto", "16 / 9"],
        marginTop: [0, 0, 0, "-6.5rem"],
      }}
    >
      <Container
        sx={{
          height: "100%",
          pt: ["5rem", "6.5rem"],
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: ["flex-start", "flex-start", "flex-start", "space-around"],
          alignItems: "center",
          gap: ["1.6rem", "4rem", 0, "15.5rem"],
          px: ["2rem", "2rem", "6rem", "18rem"],
          overflow: "hidden",
        }}
      >
        <Stack
          direction="column"
          alignItems={["center", "center", "center", "flex-start"]}
          sx={{
            gap: ["0.8rem", "1.6rem"],
            flex: 4,
            width: ["100%", "auto"],
            minWidth: ["auto", "40rem"],
          }}
        >
          <Typography
            sx={{
              fontSize: ["4rem", "6.4rem"],
              lineHeight: ["4.8rem", "7.8rem"],
              fontWeight: 600,
              textAlign: ["center", "center", "center", "left"],
            }}
          >
            Welcome to<br></br>Builder Portal
          </Typography>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: "3.2rem", fontWeight: 500 }}>How can we help you?</Typography>
          {CONTENT_DATA.map(({ title }, index) => (
            <StepItem key={title} title={title} index={index + 1} />
          ))}
        </Stack>
        <CallBox sx={{ alignSelf: ["center", "center", "center", "flex-end"], width: ["100%", "auto"], flex: 5, height: "auto" }}></CallBox>
      </Container>
    </Box>
  )
}

export default BuilderPortalHeader
