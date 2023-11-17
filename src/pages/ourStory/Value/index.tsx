import { useRef } from "react"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CommunitySvg } from "@/assets/svgs/story/value-community.svg"
import { ReactComponent as NeutralitySvg } from "@/assets/svgs/story/value-neutrality.svg"
import { ReactComponent as OpennessSvg } from "@/assets/svgs/story/value-openness.svg"
import ScrollExpandedBg from "@/components/ScrollExpandedBg"
import useCheckViewport from "@/hooks/useCheckViewport"

const STORY_VALUES = [
  {
    icon: OpennessSvg,
    title: "Openness",
    content:
      "Transparency is at the heart of our operations. We openly share our work and research with the public, engaging regularly with the community to foster an open Ethereum ecosystem. Our approach emphasizes documentation, clarity, and prioritizes specifications and modularity for reliable progress.",
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
      "We are fair, unbiased, and do not favor any specific application – essential for building an open, competitive, and scalable ecosystem. We cultivate organic growth with infinite possibilities. We make policies transparent in our partnerships. Our relationships with partners are policy-based, not relationship-based.",
  },
]

const Value = () => {
  const { isPortrait } = useCheckViewport()
  const contentRef = useRef(null)
  return (
    <ScrollExpandedBg anchorEl={contentRef}>
      <Box ref={contentRef} sx={{ position: "relative", width: "100%", px: ["2rem", "2rem", "6rem"] }}>
        <Stack direction={isPortrait ? "column" : "row"} justifyContent="space-between" spacing={isPortrait ? "3rem" : "12rem"}>
          <Stack direction="column" justifyContent="space-between" sx={{ flex: 1 }}>
            <Stack direction="column" sx={{ maxWidth: ["100%", "100%", "100%", "60rem"] }}>
              <Typography
                sx={{
                  fontSize: ["3.2rem", "4.6rem"],
                  fontWeight: 500,
                  mb: ["1rem", "2rem"],
                  color: theme => theme.palette.primary.contrastText,
                }}
              >
                Our values
              </Typography>
              <Typography
                sx={{
                  fontSize: ["1.8rem", "2.4rem"],
                  color: theme => theme.palette.primary.contrastText,
                }}
              >
                At Scroll, we have a shared mission to uphold neutrality, openness, and be community-first as we strive to preserve Ethereum's core
                properties and prioritize the collective well-being of our ecosystem.
              </Typography>
            </Stack>
            {!isPortrait && (
              <Box sx={{ position: "sticky", bottom: "8rem", mt: "30rem", mb: "14rem" }}>
                <img src="/imgs/story/story-value.svg" alt="value"></img>
              </Box>
            )}
          </Stack>
          <Stack
            direction="column"
            spacing={isPortrait ? "5.6rem" : "12rem"}
            sx={{ flex: 1, pt: ["7rem", "7rem", "14.6rem"], pb: ["9rem", "10rem", "14rem"] }}
          >
            {STORY_VALUES.map(({ icon, title, content }) => (
              <Stack direction="column" key={title}>
                <SvgIcon
                  sx={{ width: "min-content", height: "min-content", "@media(max-width: 600px)": { transform: "scale(0.8)" } }}
                  component={icon}
                  inheritViewBox
                ></SvgIcon>

                <Typography
                  sx={{
                    fontSize: ["2rem", "2.4rem"],
                    fontWeight: 600,
                    mt: ["1.3rem", "1.8rem", "2.2rem"],
                    mb: ["0.8rem", "1.4rem", "2rem"],
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
