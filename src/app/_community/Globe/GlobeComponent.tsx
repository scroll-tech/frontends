import { useEffect, useRef, useState } from "react"

import { Box } from "@mui/material"

import Data from "./data.json"
import { initCityLabels, renderer, resizeRender } from "./mainscene/scene"

const MAX_SIZE = 700

function Earth() {
  const threeDomRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState(Math.min(window.innerWidth - 16, MAX_SIZE))

  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.min(window.innerWidth - 16, MAX_SIZE)
      setSize(newSize)
      if (threeDomRef.current) {
        const { left, top } = threeDomRef.current.getBoundingClientRect()
        resizeRender(newSize, newSize, left, top)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (threeDomRef.current) {
      threeDomRef.current.appendChild(renderer.domElement)
      const { left, top } = threeDomRef.current.getBoundingClientRect()
      resizeRender(size, size, left, top)
      initCityLabels(Data)
    }
  }, [size])

  return (
    <Box sx={{ display: "flex", height: size + "px", justifyContent: "center" }}>
      <Box
        ref={threeDomRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: "absolute",
        }}
      ></Box>
    </Box>
  )
}

export default Earth
