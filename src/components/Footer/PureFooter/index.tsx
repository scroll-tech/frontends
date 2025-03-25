"use client"

import Link from "next/link"

import { Box, Container, Stack, Typography } from "@mui/material"

import ScrollLogoLightIcon from "@/assets/svgs/common/scroll-logo-light.svg"
import DiscordIcon from "@/assets/svgs/footer/discord.svg"
import GithubIcon from "@/assets/svgs/footer/github.svg"
import TwitterIcon from "@/assets/svgs/footer/twitter.svg"
import YoutubeIcon from "@/assets/svgs/footer/youtube.svg"

const CURRENT_YEAR = new Date().getFullYear()

const LEGAL_LIST = [
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Terms of Service",
    href: "/terms-of-service",
  },
]

export const SOCIAL_MEDIA_List = [
  {
    name: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/Scroll_ZKP",
  },
  {
    name: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/scroll",
  },
  {
    name: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/scroll-tech",
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
    href: "https://www.youtube.com/@Scroll_ZKP",
  },
]

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "themeBackground.dark",
      }}
    >
      <Container>
        <Box
          sx={{
            pt: "6rem",
            pb: "6.5rem",
            display: "grid",
            width: "100%",
            gridTemplateColumns: ["repeat(2, 1fr)", "repeat(2, 1fr)", "minmax(auto, 24rem) minmax(auto, 24rem) 1fr minmax(auto, 24rem)"],
            gridRowGap: "5rem",
            gridTemplateAreas: [
              ` 
              "logo version"
              "legal connect";
              `,
              ` 
              "logo version"
              "legal connect";
              `,
              ` 
              "logo legal connect version"
              `,
            ],
          }}
        >
          <Link href="/" style={{ gridArea: "logo" }} aria-label="Scroll Home">
            <ScrollLogoLightIcon></ScrollLogoLightIcon>
          </Link>
          <Stack direction="column" spacing="2.4rem" sx={{ gridArea: "legal" }}>
            {LEGAL_LIST.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="!text-[var(--mui-palette-primary-contrastText)] text-[1.5rem] hover:!text-[var(--mui-palette-primary-dark)]"
              >
                {name}
              </Link>
            ))}
          </Stack>
          <Stack direction="column" sx={{ gridArea: "connect" }}>
            <Typography sx={{ typography: "title", fontSize: "1.8rem", lineHeight: "2.6rem", mb: "3rem", color: "primary.contrastText" }}>
              Connect
            </Typography>
            <Stack direction="row" spacing="3rem">
              {SOCIAL_MEDIA_List.map(({ name, icon: Icon, href }) => (
                <Link key={name} href={href} aria-label={name}>
                  <Icon className="!text-[var(--mui-palette-primary-contrastText)] hover:!text-[var(--mui-palette-primary-dark)]"></Icon>
                </Link>
              ))}
            </Stack>
          </Stack>
          <Typography
            sx={{
              color: "primary.contrastText",
              gridArea: "version",
              fontSize: "1.5rem",
              lineHeight: "2.5rem",
              textAlign: ["left", "left", "right"],
            }}
          >
            © Version {process.env.NEXT_PUBLIC_VERSION} Scroll Ltd {CURRENT_YEAR}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
