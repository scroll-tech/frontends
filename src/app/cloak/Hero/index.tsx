import Image from "next/image"

import { Box, ButtonBase, Container, Stack, Typography } from "@mui/material"

import HeroImage from "@/assets/images/cloak/cloak-hero.webp"
import ExternalLinkSvg from "@/assets/svgs/common/external-link.svg"
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
          gap: "60px",
          pt: "5%",
        }}
      >
        <Stack direction={["column"]} sx={{ gap: "2.4rem" }}>
          <Typography sx={{ typography: "title", fontSize: ["28px", "48px"], lineHeight: ["44px", "68px"] }}>
            Cloak — <br /> Privacy Layer for <br />
            Onchain Finance
          </Typography>
          <Typography sx={{ fontSize: ["16px", "20px"], lineHeight: ["24px", "30px"], maxWidth: "650px" }}>
            Build a global payroll system, merchant payouts, or digital wallets with the transparency you need inside, and total privacy protection
            outside.
          </Typography>
          <ButtonBase
            href={CLOAK_SIGNUP_URL}
            target="_blank"
            sx={{
              width: "170px",
              color: "background.default",
              fontSize: "1.4rem",
              lineHeight: "2.4rem",
              p: "0.8rem 1.6rem",
              bgcolor: "text.primary",
              whiteSpace: "nowrap",
              borderRadius: "1rem",
              fontWeight: 500,
            }}
          >
            Sign up for demo
          </ButtonBase>
          <Stack direction="row" sx={{ gap: "32px" }}>
            {CLOAK_HERO_LINKS.map(({ key, label, href }) => (
              <ScrollLink key={key} className="text-[1.4rem] !font-medium text-[var(--mui-palette-text-primary)]" href={href}>
                {label} <ExternalLinkSvg className="w-[1.2rem] h-auto ml-2" />
              </ScrollLink>
            ))}
          </Stack>
        </Stack>
        <Image
          src={HeroImage}
          className="max-w-[440px]"
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
