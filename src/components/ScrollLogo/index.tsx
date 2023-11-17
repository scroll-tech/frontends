import { SvgIcon } from "@mui/material"

import { ReactComponent as ScrollLogoLightIcon } from "@/assets/svgs/common/scroll-logo-light.svg"
import { ReactComponent as ScrollLogoIcon } from "@/assets/svgs/common/scroll-logo.svg"

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
