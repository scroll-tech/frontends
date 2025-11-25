import Image from "next/image"

import { Box, Container, Stack, Typography } from "@mui/material"

import HeroImage from "@/assets/images/cloak/cloak-hero.webp"
import ExternalLinkSvg from "@/assets/svgs/common/external-link.svg"
import Button from "@/components/Button"
import ScrollLink from "@/components/Link"
import { CLOAK_HERO_LINKS, CLOAK_SIGNUP_URL } from "@/constants"

const CloakHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        mt: "-6.5rem",
        pt: "6.5rem",
        height: ["auto", "calc(100svh - 6.5rem)"],
        minHeight: "100svh",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: ["column", "column", "column", "row"],
          justifyContent: "space-between",
          alignItems: "center",
          gap: ["1.2rem", "1.2rem", "6rem"],
          pt: "5%",

          pb: ["4rem", 0],
        }}
      >
        <Stack direction="column" sx={{ gap: ["1.2rem", "3rem"], maxWidth: ["auto", "78rem"] }}>
          <Typography sx={{ typography: "title", fontSize: ["28px", "50px"], lineHeight: 1.4 }}>Cloak — Privacy Layer for Onchain Finance</Typography>
          <Typography sx={{ fontSize: ["16px", "20px"], lineHeight: ["24px", "30px"], mt: [0, 0, "-10px"] }}>
            Build a global payroll system, merchant payouts, or digital wallets with the transparency you need inside, and total privacy protection
            outside.
          </Typography>
          <Button href={CLOAK_SIGNUP_URL} target="_blank" width="250px" className="my-[8px] md:my-0">
            Sign up for demo
          </Button>
          <Stack direction={["column", "row"]} sx={{ gap: ["1.2rem", "4.4rem"] }}>
            {CLOAK_HERO_LINKS.map(({ key, label, href }) => (
              <ScrollLink
                key={key}
                className="text-[1.4rem] !font-medium text-[var(--mui-palette-text-primary)] hover:text-[var(--mui-palette-primary-main)]"
                href={href}
              >
                {label} <ExternalLinkSvg className="w-[1rem] h-auto ml-2" />
              </ScrollLink>
            ))}
          </Stack>
        </Stack>
        <Image
          src={HeroImage}
          className="max-w-[542px] w-full"
          style={{
            objectFit: "contain",
          }}
          priority
          alt="Hero"
        />
      </Container>
    </Box>
  )
}

export default CloakHero
