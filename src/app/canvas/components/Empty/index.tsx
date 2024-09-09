import { useRouter } from "next/navigation"
import Img from "react-cool-img"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { EXPLORE_BADGES_URL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import useCanvasStore from "@/stores/canvasStore"

const Empty = props => {
  const { sx, title } = props
  const router = useRouter()
  const { isMobile } = useCheckViewport()
  const { changeCustomizeDisplayDialogVisible } = useCanvasStore()

  const toCanvasAndBadges = () => {
    router.push(EXPLORE_BADGES_URL)
    changeCustomizeDisplayDialogVisible(false)
  }

  return (
    <Stack justifyContent="center" alignItems="center" height="100%" sx={sx}>
      <Img style={{ width: isMobile ? "12rem" : "20rem", height: isMobile ? "12rem" : "20rem" }} src="/imgs/canvas/Scrolly_Wen.webp" alt="Empty" />
      <Typography
        sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], fontWeight: 600, mb: "0.8rem", color: "primary.contrastText" }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: ["1.6rem", "1.8rem"],
          textAlign: "center",
          lineHeight: ["2.4rem", "2.8rem"],
          mb: ["1.6rem", "3.2rem"],
          color: "primary.contrastText",
        }}
      >
        Mint eligible badges or explore badges on the canvas and badges page
      </Typography>
      <Stack direction={isMobile ? "column" : "row"} gap="1.6rem">
        <Button color="primary" width="20rem" onClick={toCanvasAndBadges}>
          Explore badges
        </Button>
      </Stack>
    </Stack>
  )
}

export default Empty
