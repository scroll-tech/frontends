import Image from "next/image"

import { Box, Container, Stack, Typography } from "@mui/material"

import HeroMobileSvg from "@/assets/svgs/landingpage/hero-bg-mobile.svg?url"
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
        height: ["calc(364px + 100vw * 0.96)", "100svh"],
        minHeight: "100svh",
        marginTop: `calc(-6.5rem - ${ANNOUNCEMENT_HEIGHT})`,
        pt: ["96px", "180px", "calc((100vh - 21.6rem) * 0.4)"],
      }}
    >
      <Image src={HeroSvg} priority className="absolute -z-1 right-0 bottom-0 h-[88%] w-auto !hidden md:!inline-block" alt="Hero" />
      <Container>
        <Typography sx={{ typography: "title", fontSize: ["28px", "44px"], lineHeight: ["44px", "64px"], mb: ["24px", "40px"] }}>
          Secure and Performant:
          <br />
          Network for the Open Economy
        </Typography>
        <Stack direction={["column", "row"]} sx={{ gap: "16px" }}>
          <Button href={DOC_URL} target="_blank" className="!w-[180px] sm:!w-[250px]" color="primary">
            Build now
          </Button>

          <Button href={SESSIONS_URL} className="!w-[180px] sm:!w-[250px]">
            Join Session 2
          </Button>
        </Stack>
      </Container>
      <Image src={HeroMobileSvg} priority className="absolute bottom-0 w-full h-auto inline-block md:!hidden" alt="Hero" />
    </Box>
  )
}

export default LandingHero
