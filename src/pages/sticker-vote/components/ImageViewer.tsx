import { useEffect, useState } from "react"
import Img from "react-cool-img"

import { Modal } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const ImageViewer = props => {
  const { src, alt, imageStyle, ...restProps } = props
  const { isMobile } = useCheckViewport()
  const [style, setStyle] = useState({})

  useEffect(() => {
    const handleAdjustImage = () => {
      if (imageStyle && imageStyle.aspectRatio && window.innerWidth / window.innerHeight > imageStyle.aspectRatio) {
        setStyle({ height: `calc(100% - ${isMobile ? "2rem" : "10rem"})` })
      } else {
        setStyle({ width: `calc(100% - ${isMobile ? "2rem" : "10rem"})` })
      }
    }
    handleAdjustImage()

    window.addEventListener("resize", handleAdjustImage)
    return () => {
      window.addEventListener("resize", handleAdjustImage)
    }
  }, [imageStyle, isMobile])
  return (
    <Modal sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: "4rem" }} {...restProps}>
      <Img src={src} alt={alt} style={style}></Img>
    </Modal>
  )
}

export default ImageViewer
