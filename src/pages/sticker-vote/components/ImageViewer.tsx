import { useEffect, useState } from "react"
import Img from "react-cool-img"

import { CircularProgress, Modal } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const ImageViewer = props => {
  const { src, alt, imageStyle, onClose, ...restProps } = props
  const { isMobile } = useCheckViewport()
  const [style, setStyle] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: modal is supposed to handle eacape listening by default
    const handleEscape = e => {
      if (e.key === "Escape") {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [])

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

  const handleLoad = () => {
    setLoading(false)
  }

  const handleClose = () => {
    setLoading(true)
    onClose()
  }

  return (
    <Modal sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: "4rem" }} onClose={handleClose} {...restProps}>
      <>
        <Img src={src} alt={alt} style={{ display: loading ? "none" : "inline-block", ...style }} onLoad={handleLoad}></Img>
        {loading && <CircularProgress size={isMobile ? 36 : 50} />}
      </>
    </Modal>
  )
}

export default ImageViewer
