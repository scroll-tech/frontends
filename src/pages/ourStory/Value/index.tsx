import { isDesktop, isMobileOnly } from "react-device-detect"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as BridgeSvg } from "@/assets/svgs/refactor/story-bridge.svg"
import ValueImg from "@/assets/svgs/refactor/story-value.svg"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

const STORY_VALUES = [
  {
    icon: BridgeSvg,
    title: "Aligned to a common mission",
    content:
      "Preserving the core properties of decentralization and censorship resistance is our priority. As an end goal, Scroll aims to achieve the same levels as Ethereum itself using a measured approach – no matter how long it takes.",
  },
  {
    icon: BridgeSvg,
    title: "Committed to cultivating trust",
    content:
      "Transparency is at the heart of our operations. We openly share our work and research with the public, engaging regularly with the community to foster an open Ethereum ecosystem. Our approach emphasizes documentation, clarity, and prioritizing specifications and modularity for reliable progress.",
  },
  {
    icon: BridgeSvg,
    title: "Assured without arrogance",
    content:
      "We embrace directness with kindness and prioritize safety while remaining open to calculated risks. At Scroll, we maintain confidence without arrogance, assuming the best intentions from our community. We celebrate successes and humbly learn from our shortcomings.",
  },
]

const Value = () => {
  return (
    <SectionWrapper dark round sx={{ pt: "5.4rem" }}>
      <Stack direction={isMobileOnly ? "column" : "row"} justifyContent="space-between" spacing="3rem">
        <Stack direction="column" justifyContent="space-between" sx={{ flex: 1 }}>
          <SectionHeader
            dark
            title="Our values"
            content="At Scroll, we have a shared mission to uphold neutrality, openness, and be community-first, as we strive to preserve Ethereum's core properties and prioritize the collective well-being of our ecosystem."
          ></SectionHeader>
          {isDesktop && (
            <Box sx={{ position: "sticky", bottom: "8rem", mt: "24rem", mb: "14rem" }}>
              <img src={ValueImg} alt="value"></img>
            </Box>
          )}
        </Stack>
        <Stack direction="column" spacing={isMobileOnly ? "5.6rem" : "13rem"} sx={{ flex: 1, pt: ["9rem", "14.6rem"], pb: ["12rem", "14rem"] }}>
          {STORY_VALUES.map(({ icon, title, content }) => (
            <Stack direction="column" key={title} spacing={isMobileOnly ? "1rem" : "2.2rem"}>
              <SvgIcon sx={{ fontSize: ["3.2rem", "4.2rem"] }} component={icon} inheritViewBox></SvgIcon>
              <Typography
                sx={{
                  fontSize: ["1.6rem", "2.4rem"],
                  fontWeight: 600,
                  color: "primary.contrastText",
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ fontSize: ["1.6rem", "2rem"], color: "primary.contrastText" }}>{content}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </SectionWrapper>
  )
}

export default Value
