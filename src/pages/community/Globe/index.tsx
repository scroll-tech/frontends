import React, { useEffect, useRef, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"

import Data from "./data.json"
import { initCityLabels, renderer, resizeRender } from "./mainscene/scene"

const useStyles = makeStyles()(theme => ({
  title: {
    color: "#101010",
    textAlign: "center",
    fontSize: "4.8rem",
    fontWeight: 600,
    lineHeight: "8.4rem",
    marginTop: "7.2rem",
    marginBottom: "4rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "4rem",
      lineHeight: "5rem",
      marginTop: "6rem",
      marginBottom: "3rem",
      padding: "0 1.6rem",
    },
  },
}))

const MAX_SIZE = 700

function Earth() {
  const threeDomRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState(Math.min(window.innerWidth - 16, MAX_SIZE))
  const { classes } = useStyles()

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
    <Box>
      <Typography className={classes.title}>Scroll Around the World</Typography>
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
    </Box>
  )
}

export default Earth
