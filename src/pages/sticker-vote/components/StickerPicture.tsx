import { useEffect, useState } from "react"
import Img from "react-cool-img"
import { useStyles } from "tss-react/mui"

import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const Frame = styled<any>(Box, { shouldForwardProp: prop => prop !== "bgColor" })(({ theme, bgColor }) => ({
  aspectRatio: "1 / 1",
  flex: 1,
  borderRadius: "1rem",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: bgColor,
  backdropFilter: "blur(10px)",
  transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
  willChange: "transform",
  cursor: "pointer",
  "@media (hover: hover)": {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  "&.unloaded": {
    boxShadow: "inset 0 0 0 600px rgba(255, 255, 255, 0.4)",
    filter: "blur(2px)",
    backgroundColor: "unset",
  },
}))

const StickerPicture = props => {
  const { cx } = useStyles()
  const { className, src, alt, bgColor, onClick, ...restProps } = props
  const [loaded, setLoaded] = useState(false)
  const [style, setStyle] = useState({})

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setLoaded(true)
      const isWide = img.width > img.height
      setStyle({
        width: isWide ? "100%" : "auto",
        height: isWide ? "auto" : "100%",
        aspectRatio: img.width / img.height,
      })
    }
    img.src = src
  }, [src])

  return (
    <Frame className={cx(className, !loaded && "unloaded")} bgColor={bgColor} loaded={loaded} onClick={() => onClick({ src, alt, style })}>
      {loaded && <Img style={style} src={src} alt={alt} {...restProps}></Img>}
    </Frame>
  )
}

export default StickerPicture
