import { SvgIcon } from "@mui/material"

import { ReactComponent as ScrollStackLogoIcon } from "@/assets/svgs/common/scroll-sdk-logo.svg"

const ScrollLogo = props => {
  const { light, ...restProps } = props
  return (
    <SvgIcon
      sx={{ fontSize: "15rem", height: "auto", verticalAlign: "middle" }}
      component={ScrollStackLogoIcon}
      inheritViewBox
      {...restProps}
    ></SvgIcon>
  )
}

export default ScrollLogo
