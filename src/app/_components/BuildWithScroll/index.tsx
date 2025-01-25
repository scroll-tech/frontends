"use client"

import Image from "next/image"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"
import { Button as MuiButton } from "@mui/material"

import FeatureImage1 from "@/assets/images/home/feature-img-1.webp"
import FeatureImage2 from "@/assets/images/home/feature-img-2.webp"
import ArrowSvg from "@/assets/svgs/community/arrow.svg"
import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"

const FEATURES = [
  {
    icon: FeatureImage1,
    title: "Deploy an app",
    description: "EVM compatibility enables builders to smoothly deploy their existing application on Scroll using their favorite tools.",
    href: "https://docs.scroll.io/en/developers",
  },
  {
    icon: FeatureImage2,
    title: "Explore Session 2",
    description:
      "Created to promote the sustained growth of assets and protocols on Scroll. Discover our new Marks Dashboard and join Session 2, the program designed for everyone, everywhere.",
    href: "/sessions",
  },
]

const Feature = () => {
  const { isMobile } = useCheckViewport()
  const renderFeatures = () => {
    return FEATURES.map((feature, featureIdx) => {
      return (
        <OrientationToView key={feature.title}>
          <Stack key={featureIdx} justifyContent="space-between" direction="column" spacing="2.4rem" sx={{ maxWidth: "56rem", height: "100%" }}>
            <Box>
              <Image src={feature.icon} alt={feature.title} width={isMobile ? 320 : 400} height={isMobile ? 320 : 400}></Image>
              <Typography sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600 }}>{feature.title}</Typography>
              <Typography sx={{ fontSize: ["1.6rem", "2rem"], mt: ["0.8rem !important", 0] }}>{feature.description}</Typography>
            </Box>
            <MuiButton
              href={feature.href}
              target="_blank"
              sx={{ fontWeight: 600, fontSize: ["1.6rem", "2rem"], width: ["16rem", "21.2rem"], height: "4.8rem" }}
              endIcon={<SvgIcon sx={{ fontSize: "1.2rem !important", mt: "2px" }} component={ArrowSvg} inheritViewBox></SvgIcon>}
            >
              Get started
            </MuiButton>
          </Stack>
        </OrientationToView>
      )
    })
  }

  return (
    <SectionWrapper sx={{ py: ["5.6rem !important", "8rem !important", "calc((100vh - 6.5rem - 62.2rem) / 2) !important"] }}>
      <OrientationToView>
        <SectionHeader
          title="Build with Scroll"
          content="Scroll is compatible with Ethereum at the bytecode-level, meaning everything works right out of the box."
          action={
            <Button href="https://docs.scroll.io/en/home/" target="_blank" color="primary">
              Start building
            </Button>
          }
        ></SectionHeader>
      </OrientationToView>
      <Stack direction={["column", "row"]} sx={{ mt: ["2.4rem", "8rem"], gap: "3rem" }} justifyContent="space-between">
        {renderFeatures()}
      </Stack>
    </SectionWrapper>
  )
}

export default Feature
