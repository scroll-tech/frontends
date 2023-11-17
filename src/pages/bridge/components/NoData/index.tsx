import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as EmptySvg } from "@/assets/svgs/bridge/empty.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const NoData = props => {
  const { title, description, ...restProps } = props
  const { isMobile } = useCheckViewport()
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={isMobile ? "0.4rem" : "0.8rem"} {...restProps}>
      <SvgIcon sx={{ fontSize: "3.2rem" }} component={EmptySvg} inheritViewBox></SvgIcon>
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, lineHeight: "2.4rem", color: "#5B5B4B" }}>{title}</Typography>
      <Typography sx={{ fontSize: "1.6rem", lineHeight: "2.4rem", color: "#5B5B4B", textAlign: "center" }}>{description}</Typography>
    </Stack>
  )
}

export default NoData
