import { Box, Typography } from "@mui/material"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import { BRAND_ASSETS_LINK, FIGMA_LINK } from "@/constants"

const Header = () => {
  return (
    <SectionWrapper
      sx={{
        display: "flex",
        flexDirection: ["column", "column", "row"],
        justifyContent: "space-between",
        pt: ["6.8rem", "6.8rem", "12rem"],
        pb: ["4.2rem", "4.2rem", "12rem"],
        alignItems: ["flex-start", "flex-start", "center"],
      }}
      transparent
    >
      <OrientationToView sx={{ gridRow: "span 2" }}>
        <Typography
          sx={{
            typography: "title",
            fontSize: ["2.8rem", "4.8rem"],
            lineHeight: ["3.8rem", "8rem"],
            textAlign: "left",
            marginBottom: ["2.6rem", "2.6rem", 0],
          }}
        >
          Brand Assets
        </Typography>
      </OrientationToView>
      <OrientationToView delay={0.3} sx={{ display: "flex", width: ["100%", "auto"] }}>
        <Box sx={{ display: "flex", gap: ["2rem", "2rem", "3rem"], width: "100%" }}>
          <Button href={BRAND_ASSETS_LINK} download color="primary" className="!w-[50%] sm:!w-[20.7rem]">
            Download All
          </Button>
          <Button href={FIGMA_LINK} target="_blank" className="!w-[50%] sm:!w-[20.7rem]">
            Go to Figma
          </Button>
        </Box>
      </OrientationToView>
    </SectionWrapper>
  )
}

export default Header
