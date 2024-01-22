import { SvgIcon } from "@mui/material"

import ScrollLogoLightIcon from "@/assets/svgs/common/scroll-logo-light.svg"
import ScrollLogoIcon from "@/assets/svgs/common/scroll-logo.svg"

const ScrollLogo = props => {
  const { light, ...restProps } = props
  return (
    <SvgIcon
      sx={{ fontSize: "8rem", height: "auto", verticalAlign: "middle" }}
      component={light ? ScrollLogoLightIcon : ScrollLogoIcon}
      inheritViewBox
      {...restProps}
    ></SvgIcon>
  )
}

export default ScrollLogo
