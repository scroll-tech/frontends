import { useRef } from "react"
import { isDesktop, isMobileOnly } from "react-device-detect"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CommunitySvg } from "@/assets/svgs/refactor/story-value-community.svg"
import { ReactComponent as NeutralitySvg } from "@/assets/svgs/refactor/story-value-neutrality.svg"
import { ReactComponent as OpennessSvg } from "@/assets/svgs/refactor/story-value-openness.svg"
import ValueImg from "@/assets/svgs/refactor/story-value.svg"
import ScrollExpandedBg from "@/components/ScrollExpandedBg"
import SectionHeader from "@/components/SectionHeader"

const STORY_VALUES = [
  {
    icon: OpennessSvg,
    title: "Openness",
    content:
      "Transparency is at the heart of our operations. We openly share our work and research with the public, engaging regularly with the community to foster an open Ethereum ecosystem. Our approach emphasizes documentation, clarity, and prioritizing specifications and modularity for reliable progress.",
  },
  {
    icon: CommunitySvg,
    title: "Community-driven",
    content:
      "Decentralizing the future is our constant pursuit. We strive to create pathways to shared ownership, ensuring no single entity holds disproportionate power or influence. We are committed to foster an inclusive ecosystem that grows organically, competes fairly, and scales together for the benefit of Ethereum's future.",
  },
  {
    icon: NeutralitySvg,
    title: "Credible neutrality",
    content:
      "We are fair, unbiased, and do not favor any specific application – essential for building an open, competitive, and scalable ecosystem. We cultivate organic growth with infinite possibilities. We generalize and make policies transparent in partnership. Our relationships with partners are policy-based, not relationship-based.",
  },
]

const Value = () => {
  const contentRef = useRef(null)
  return (
    <ScrollExpandedBg anchorEl={contentRef}>
      <Box ref={contentRef} sx={{ position: "relative", width: "100%", paddingLeft: ["2rem", "6rem"], paddingRight: ["2rem", "6rem"] }}>
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
          <Stack direction="column" spacing={isMobileOnly ? "5.6rem" : "12rem"} sx={{ flex: 1, pt: ["9rem", "14.6rem"], pb: ["12rem", "14rem"] }}>
            {STORY_VALUES.map(({ icon, title, content }) => (
              <Stack direction="column" key={title} spacing={isMobileOnly ? "1rem" : "2.2rem"}>
                <SvgIcon
                  sx={{ width: "min-content", height: "min-content", "@media(max-width: 600px)": { transform: "scale(0.8)" } }}
                  component={icon}
                  inheritViewBox
                ></SvgIcon>

                <Typography
                  sx={{
                    fontSize: ["2rem", "2.4rem"],
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
      </Box>
    </ScrollExpandedBg>
  )
}

export default Value
