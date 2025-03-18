import { Box, Container, Stack, Typography } from "@mui/material"

import HeroSvg from "@/assets/svgs/landingpage/hero-bg.svg?url"
import Button from "@/components/Button"
import { DOC_URL, SESSIONS_URL } from "@/constants/link"

const ANNOUNCEMENT_HEIGHT = "0rem"

const LandingHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: `url(${HeroSvg.src}) right bottom / auto 88vh no-repeat`,
        marginTop: `calc(-6.5rem - ${ANNOUNCEMENT_HEIGHT})`,
      }}
    >
      <Container sx={{ mt: "137px" }}>
        <Typography sx={{ fontSize: "44px", lineHeight: "64px", letterSpacing: "-1.32px", mb: "4rem" }}>
          Secure and Performant:<br></br>Network for the Open Economy
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button href={DOC_URL} color="primary">
            Build now
          </Button>

          <Button href={SESSIONS_URL}>Join Session 2</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default LandingHero
