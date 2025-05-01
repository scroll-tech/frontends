import Image from "next/image"

import { Box, Container, Stack, Typography } from "@mui/material"

import HeroMobileSvg from "@/assets/svgs/landingpage/hero-bg-mobile.svg?url"
import HeroSvg from "@/assets/svgs/landingpage/hero-bg.svg?url"
import Button from "@/components/Button"
import { BRIDGE_URL, DOC_URL } from "@/constants/link"

const ANNOUNCEMENT_HEIGHT = "0rem"

const LandingHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: ["calc(364px + 100vw * 0.96)", "calc(442px + 100vw * 0.96)", "calc(442px + 100vw * 0.96)", "100svh"],
        minHeight: "100svh",
        marginTop: `calc(-6.5rem - ${ANNOUNCEMENT_HEIGHT})`,
        pt: ["9.6rem", "11.4rem", "19.4rem"],
      }}
    >
      <Image
        src={HeroSvg}
        priority
        className="absolute -z-1 right-0 bottom-0 h-[calc(100svh-20rem)] w-auto !hidden lg:!inline-block object-cover"
        alt="Hero"
      />
      <Container>
        <Typography sx={{ typography: "title", fontSize: ["28px", "48px"], lineHeight: ["44px", "80px"], mb: ["24px", "40px"] }}>
          Secure and Performant:
          <br />
          Network for the Open Economy
        </Typography>
        <Stack direction={["column", "row"]} sx={{ gap: "16px" }}>
          <Button
            href={DOC_URL}
            target="_blank"
            className="!w-[180px] sm:!w-[250px]"
            color="primary"
            gaEvent={{ event: "click_landing", label: "Build now" }}
          >
            Build now
          </Button>

          <Button
            href={BRIDGE_URL}
            target="_blank"
            className="!w-[180px] sm:!w-[250px]"
            gaEvent={{ event: "click_landing", label: "Bridge to Scroll" }}
          >
            Bridge to Scroll
          </Button>
        </Stack>
      </Container>
      <Image src={HeroMobileSvg} priority className="absolute bottom-0 w-full h-auto inline-block lg:!hidden" alt="Hero" />
    </Box>
  )
}

export default LandingHero
