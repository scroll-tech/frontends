import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ErrorSvg } from "@/assets/svgs/ecosystem/error.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const Error = props => {
  const { title, description, action, ...restProps } = props
  const { isMobile } = useCheckViewport()
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={isMobile ? "0.4rem" : "0.8rem"} {...restProps}>
      <SvgIcon sx={{ fontSize: "3.2rem", color: "#5B5B4B" }} component={ErrorSvg} inheritViewBox></SvgIcon>
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, lineHeight: "2.4rem", color: "#5B5B4B" }}>{title}</Typography>
      {action}
    </Stack>
  )
}

export default Error
