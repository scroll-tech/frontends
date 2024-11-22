import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ErrorSvg } from "@/assets/svgs/ecosystem/error.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const Error = props => {
  const { dark, title, description, action, ...restProps } = props
  const { isMobile } = useCheckViewport()
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={isMobile ? "0.4rem" : "0.8rem"} {...restProps}>
      <SvgIcon sx={{ fontSize: "3.2rem", color: "primary.contrastText" }} component={ErrorSvg} inheritViewBox></SvgIcon>
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, lineHeight: "2.4rem", color: "primary.contrastText" }}>{title}</Typography>
      {action}
    </Stack>
  )
}

export default Error
