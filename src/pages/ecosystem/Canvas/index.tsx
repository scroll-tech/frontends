import { useNavigate } from "react-router-dom"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"
import Badges from "@/pages/canvas/Dashboard/UpgradeDialog/Badges"

import BadgeList from "./BadgeList"

const Canvas = () => {
  const { isMobile, isTablet } = useCheckViewport()
  const navigate = useNavigate()

  return (
    <SectionWrapper dark sx={{ pt: ["4rem", "5.5rem", "6rem"], background: "#101010" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap="2rem">
        <Typography
          className="ecosystem-protocols-title"
          sx={{ color: "#fff", fontSize: ["2.4rem", "4.4rem"], lineHeight: ["3.6rem", "5.6rem"], fontWeight: [600, 500], flex: 1 }}
        >
          Earn badges for Scroll Canvas
        </Typography>
        <Button width={isMobile ? "15.4rem" : isTablet ? "21.5rem" : "25rem"} onClick={() => navigate("/scroll-canvas")} color="primary">
          Go to Scroll Canvas
        </Button>
      </Stack>
      <BadgeList items={Badges} />
    </SectionWrapper>
  )
}
export default Canvas
