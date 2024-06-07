import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_PAGE_SYMBOL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import Badges from "@/pages/canvas/Dashboard/UpgradeDialog/Badges"

import BadgeList from "./BadgeList"

const Canvas = () => {
  const { isMobile, isTablet } = useCheckViewport()
  const { hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (hash) {
      const targetEl = document.getElementById(`${ECOSYSTEM_PAGE_SYMBOL}-${hash.slice(1)}`)
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
        })
      }
    }
  }, [hash])

  return (
    <SectionWrapper id={`${ECOSYSTEM_PAGE_SYMBOL}-badges`} dark sx={{ pt: ["4rem", "5.5rem", "6rem"], background: "#101010" }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        gap={isMobile ? "1.6rem" : "2rem"}
      >
        <Typography sx={{ color: "#fff", fontSize: ["2.4rem", "4.4rem"], lineHeight: ["3.6rem", "5.6rem"], fontWeight: [600, 500], flex: 1 }}>
          Earn badges for Scroll Canvas
        </Typography>
        <Button width={isMobile ? "19.7rem" : isTablet ? "21.5rem" : "25rem"} onClick={() => navigate("/scroll-canvas")} color="primary">
          Go to Scroll Canvas
        </Button>
      </Stack>
      <BadgeList items={Badges} />
    </SectionWrapper>
  )
}
export default Canvas
