import Image from "next/image"

import { Box, Container, Stack, Typography } from "@mui/material"

import HeroMobileSvg from "@/assets/svgs/landingpage/hero-bg-mobile.svg?url"
import HeroSvg from "@/assets/svgs/landingpage/hero-bg.svg?url"
import Button from "@/components/Button"
import { ACCSEAL_URL } from "@/constants/link"

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
          {/* mobile breaks after every clause, desktop keeps "One Plan, Every Model," on one line */}
          {"One Plan, "}
          <Box component="br" sx={{ display: ["inline", "none"] }} />
          Every Model,
          <br />
          Secured by ZK
        </Typography>
        <Stack direction={["column", "row"]} sx={{ gap: "16px" }}>
          <Button
            href={ACCSEAL_URL}
            target="_blank"
            className="!w-[240px] sm:!w-[290px]"
            color="primary"
            gaEvent={{ event: "click_landing", label: "Explore AI Gateway" }}
          >
            Explore AI Gateway
          </Button>
        </Stack>
      </Container>
      <Image src={HeroMobileSvg} priority className="absolute bottom-0 w-full h-auto inline-block lg:!hidden pointer-events-none" alt="Hero" />
    </Box>
  )
}

export default LandingHero
