import ScrollLogoLightIcon from "@/assets/svgs/common/scroll-logo-icon-light.svg"
import ScrollLogoIcon from "@/assets/svgs/common/scroll-logo-icon.svg"

const ScrollLogo = props => {
  const { light } = props

  if (light) {
    return <ScrollLogoLightIcon></ScrollLogoLightIcon>
  }
  return <ScrollLogoIcon></ScrollLogoIcon>
}

export default ScrollLogo
