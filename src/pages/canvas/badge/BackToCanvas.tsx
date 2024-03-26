import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as BackSvg } from "@/assets/svgs/canvas/back.svg"

const BackToCanvas = props => {
  const { username, sx, ...restProps } = props
  return (
    <Stack direction="row" gap="0.8rem" sx={{ cursor: "pointer", "& *": { cursor: "pointer !important" }, ...sx }} {...restProps}>
      <SvgIcon component={BackSvg} inheritViewBox></SvgIcon>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 600 }}>Back to {username}’s Canvas</Typography>
    </Stack>
  )
}
export default BackToCanvas
