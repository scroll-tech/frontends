import { Box, Stack, Typography } from "@mui/material"

import Button from "@/app/_canvas/components/Button"
import ExternalLinkSvg from "@/assets/svgs/canvas-badge/external-link.svg"
import PassportSvg from "@/assets/svgs/canvas-badge/passport-logo.svg"
import SectionWrapper from "@/components/SectionWrapper"

const FeaturedBadges = () => {
  return (
    <SectionWrapper dark sx={{ pt: ["3.2rem", "7.2rem"] }}>
      <Box>
        <Typography sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["3.6rem", "5.6rem"], fontWeight: 500, color: "primary.contrastText" }}>
          Featured badges
        </Typography>
        <Box
          sx={{
            mt: ["1.6rem", "2.4rem"],
            height: ["auto", "auto", "41rem", "38rem"],
            width: "100%",
            aspectRatio: ["320/560", "320/560", "unset"],
            p: ["2.4rem 1.6rem", "5rem 4.8rem"],
            borderRadius: ["2rem", "2rem", "2.5rem"],
            background: [
              "url(/imgs/canvas-badge/featured-badges-bg-mobile.webp) bottom center  / 100% auto no-repeat",
              "url(/imgs/canvas-badge/featured-badges-bg-mobile.webp) bottom center / 100% auto no-repeat",
              "url(/imgs/canvas-badge/featured-badges-bg.webp) center right / auto 100% no-repeat",
            ],
          }}
        >
          <Stack direction="column" gap={["1.6rem", "2.4rem"]}>
            <PassportSvg className="w-[71px] sm:w-[147px] h-auto"></PassportSvg>
            <Typography sx={{ fontSize: ["2rem", "4rem"], fontWeight: 500, lineHeight: ["3.2rem", "4.8rem"], color: "primary.contrastText" }}>
              Show your ZK talent
            </Typography>
            <Typography
              sx={{
                fontSize: ["1.6rem", "2.4rem"],
                lineHeight: ["2.4rem", "3.6rem"],
                color: "primary.contrastText",
                maxWidth: ["100%", "100%", "42rem", "57.4rem"],
              }}
            >
              Developer empowerment through onchain attestation. Mint your ZK privacy, infra or rollup talent badge!
            </Typography>
            <Button
              href="https://app.passport.xyz/#/campaign/scroll-developer"
              target="_blank"
              color="white"
              variant="contained"
              sx={{ borderRadius: "0.8rem", width: ["20rem", "21.2rem"], height: "4.8rem !important", padding: 0 }}
            >
              View details <ExternalLinkSvg className="w-1.2rem h-auto ml-[8px]"></ExternalLinkSvg>
            </Button>
          </Stack>
        </Box>
      </Box>
    </SectionWrapper>
  )
}

export default FeaturedBadges
