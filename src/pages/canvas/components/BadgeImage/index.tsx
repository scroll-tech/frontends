import Img from "react-cool-img"

// import BadgePlaceholderSvg from "@/assets/svgs/canvas-perks/badge-placeholder.svg"

const BadgeImage = props => {
  const { style, ...restProps } = props
  return <Img style={{ aspectRatio: "1/1", objectFit: "contain", borderRadius: "0.8rem", ...style }} {...restProps}></Img>
}

export default BadgeImage
