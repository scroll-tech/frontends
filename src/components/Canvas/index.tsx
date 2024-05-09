import React, { useEffect, useMemo, useRef, useState } from "react"
import useStorage from "squirrel-gill"

import { Box, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/canvas/close.svg"
import TriangleSvg from "@/assets/svgs/canvas/triangle.svg"
import { DISPLAYED_CANVAS } from "@/constants/storageKey"
import Button from "@/pages/canvas/components/Button"

import SuperGif from "./libgif.js"

const Container = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "5rem",
  right: "2.7rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  width: "30rem",
  "& canvas": {
    width: "12rem",
    height: "12rem",
    margin: "0 auto",
    display: "block",
  },
}))

const Tooltip = styled(Box)(({ theme }) => ({
  padding: "1rem 1.4rem 1.4rem",
  width: "100%",
  position: "relative",
  boxSizing: "border-box",
  background: "#fff",
  backgroundClip: "padding-box",
  border: "solid 2px transparent",
  borderRadius: "1rem",
  marginBottom: "2rem",
  display: "none", // Initially hide Tooltip
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    margin: "-2px",
    borderRadius: "inherit",
    //TODO:
    background: "linear-gradient(70deg, #FAD880 0%, #FF684B 38%, #FAD880 75%, #90F7EB 100%)",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "40%",
    height: "2.2rem",
    width: "3.4rem",
    background: `url(${TriangleSvg})`,
    backgroundSize: "cover",
    zIndex: -1,
    marginTop: "-0.6rem",
  },
}))

const MintButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  lineHeight: "2.4rem",
  height: "4rem",
}))

const Canvas = props => {
  const {
    title,
    buttonText,
    onClick,
    visible,
    canvasId = "canvasId",
    canvasUrl = "/imgs/canvas/canvas.gif",
    startFrame = 16,
    targetFrame = 54,
  } = props
  const [open, setOpen] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const tooltipVisibleRef = useRef(false)
  const [loading] = useState(false)
  const [displayedCanvas, setDisplayedCanvas] = useStorage(localStorage, DISPLAYED_CANVAS, [])

  const canvasVisible = useMemo(() => {
    return !displayedCanvas.includes(canvasId) && visible
  }, [displayedCanvas, visible])

  useEffect(() => {
    if (canvasVisible) {
      setTimeout(() => {
        setOpen(true)
        setTimeout(() => {
          playGif()
        }, 0)
      }, 1500)
    } else {
      handleCloseTooltip()
    }
  }, [canvasVisible])

  const playGif = () => {
    const gif = document.getElementById(canvasId)

    if (!gif) return
    var instance = SuperGif({
      gif,
      progressbar_height: "0",
      auto_play: false,
      on_end: () => {
        setOpen(false)
      },
    })
    instance.load(() => {
      instance.play()
      setInterval(() => {
        const get_current_frame = instance.get_current_frame()
        if (get_current_frame === startFrame) {
          setTooltipVisible(true)
          tooltipVisibleRef.current = true
        } else if (tooltipVisibleRef.current && get_current_frame >= targetFrame) {
          instance.move_to(startFrame)
        }
      }, 100)
    })
  }

  const handleCloseTooltip = () => {
    setTooltipVisible(false)
    tooltipVisibleRef.current = false
  }

  const handleCanvasClick = () => {
    setDisplayedCanvas([...displayedCanvas, canvasId])
    onClick()
  }

  const handleCloseClick = () => {
    setDisplayedCanvas([...displayedCanvas, canvasId])
    handleCloseTooltip()
  }

  return (
    <Container>
      {open && (
        <>
          {tooltipVisible && (
            <Tooltip style={{ display: "block" }}>
              <Typography sx={{ textAlign: "right" }}>
                <SvgIcon sx={{ fontSize: "1.3rem", color: "#000" }} onClick={handleCloseClick} component={CloseSvg} inheritViewBox />
              </Typography>
              <Typography sx={{ fontSize: "1.6rem", fontWeight: 500, marginBottom: "1.2rem" }}>{title}</Typography>
              <MintButton variant="contained" color="primary" sx={{ width: "100%" }} loading={loading} onClick={handleCanvasClick}>
                {buttonText}
              </MintButton>
            </Tooltip>
          )}
          <div>
            <img alt="canvas" id={canvasId} src={canvasUrl} />
          </div>
        </>
      )}
    </Container>
  )
}

export default Canvas
