import { SvgIcon } from "@mui/material"

import { ReactComponent as ScrollLogoLightIcon } from "@/assets/svgs/refactor/scroll-logo-light.svg"
import { ReactComponent as ScrollLogoIcon } from "@/assets/svgs/refactor/scroll-logo.svg"

const ScrollLogo = props => {
  const { light } = props
  return <SvgIcon sx={{ fontSize: "8rem", height: "auto" }} component={light ? ScrollLogoLightIcon : ScrollLogoIcon} inheritViewBox></SvgIcon>
}

export default ScrollLogo
