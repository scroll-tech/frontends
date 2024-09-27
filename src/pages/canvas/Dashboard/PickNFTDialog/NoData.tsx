import Img from "react-cool-img"

import { Stack, Typography } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const NoData = props => {
  const { title, description, ...restProps } = props
  const { isMobile } = useCheckViewport()

  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={isMobile ? "0.4rem" : "0.8rem"} {...restProps}>
      <Img style={{ width: isMobile ? "12rem" : "20rem", height: isMobile ? "12rem" : "20rem" }} src="/imgs/canvas/Scrolly_Wen.webp" alt="Empty" />
      <Typography
        sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], fontWeight: 600, mb: "0.8rem", color: "primary.contrastText" }}
      >
        {title}
      </Typography>
    </Stack>
  )
}

export default NoData
