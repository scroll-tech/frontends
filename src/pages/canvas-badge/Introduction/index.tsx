import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import Button from "@/components/Button"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"
import { CANVAS_BADGE_INTRODUCTIONS, CANVAS_URL, ISSUE_BADGES_URL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

const Introduction = () => {
  const { isMobile } = useCheckViewport()
  return (
    <SectionWrapper dark sx={{ pt: ["2.4rem", "6.4rem"] }}>
      <Box>
        <Typography sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["3.6rem", "5.6rem"], fontWeight: 500, color: "primary.contrastText" }}>
          Attested Badges, Not Tokens
        </Typography>
        <Typography
          sx={{
            fontSize: ["1.6rem", "2.4rem"],
            lineHeight: ["2.4rem", "3.6rem"],
            maxWidth: ["100%", "110rem"],
            mt: ["0.8rem", "2.4rem"],
            color: "primary.contrastText",
          }}
        >
          Unlike NFTs, badges are non-transferable proofs of your unique traits, status and achievements, thanks to integration with Ethereum
          Attestation Service.
        </Typography>
      </Box>
      <Stack
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "4rem" : "11.2rem"}
        sx={{ mt: ["4rem", "6.4rem"], "& p": { color: "primary.contrastText" } }}
      >
        {CANVAS_BADGE_INTRODUCTIONS.map(({ key, icon, label, items }) => (
          <Stack direction="column" gap={isMobile ? "2.4rem" : "3.2rem"} sx={{ flex: [0, 1] }} key={key}>
            <Typography sx={{ fontSize: ["3.2rem", "4rem"], lineHeight: ["3.2rem", "4rem"] }}>{icon}</Typography>
            <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["3.2rem", "3.6rem"], fontWeight: 600 }}>{label}</Typography>
            <SuccessionToView>
              {items.map(({ icon, title, content }, index) => (
                <SuccessionItem key={index} sx={{ "&:nth-of-type(n+2)": { mt: ["2.4rem", "3.2rem"] } }}>
                  <Stack direction="row" gap="0.8rem">
                    <SvgIcon component={icon} inheritViewBox sx={{ color: "primary.contrastText", fontSize: ["2.4rem", "3.2rem"] }}></SvgIcon>
                    <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 600 }}>{title}</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], minHeight: ["unset", "6.4rem"], mt: "0.8rem" }}>
                    {content}
                  </Typography>
                </SuccessionItem>
              ))}
              <SuccessionItem sx={{ mt: ["2.4rem", "3.2rem"] }}>
                {key === "user" ? (
                  <Button width={isMobile ? "100%" : "28rem"} color="primary" href={CANVAS_URL}>
                    Visit Canvas
                  </Button>
                ) : (
                  <Button width={isMobile ? "100%" : "28rem"} color="primary" href={ISSUE_BADGES_URL} target="_blank">
                    Issue Badges
                  </Button>
                )}
              </SuccessionItem>
            </SuccessionToView>
          </Stack>
        ))}
      </Stack>
    </SectionWrapper>
  )
}

export default Introduction
