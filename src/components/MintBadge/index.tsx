import React, { useEffect, useRef, useState } from "react"

import { Box, Button, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import TriangleSvg from "@/assets/svgs/skelly/triangle.svg"
import BadgeDetailDialog from "@/pages/skelly/Dashboard/BadgeDetailDialog"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "5rem",
  right: "2.7rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
}))

const Tooltip = styled(Box)(({ theme }) => ({
  padding: "1rem 1.4rem 1.4rem",
  width: "30rem",
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
    background: "linear-gradient(90deg, #F0C86F, #FF684B, #FAD880, #90F7EB)",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: "100%",
    right: "1.5rem",
    left: "40%",
    height: "2rem",
    width: "2rem",
    background: `url(${TriangleSvg})`,
    backgroundSize: "cover",
    transform: "rotate(270deg)",
  },
}))

const MintButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  lineHeight: "2.4rem",
  height: "4rem",
}))

const MintBadge = props => {
  const [open, setOpen] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const { changeBadgeDetailDialog } = useSkellyStore()
  const videoRef = useRef<HTMLVideoElement>(null)
  const initialPlayRef = useRef(true)
  const tooltipVisibleRef = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      setOpen(true)
      setTimeout(() => {
        playVideo()
      }, 0)
    }, 1500)
  }, [])

  const playVideo = () => {
    const video = videoRef.current
    if (!video) return

    video
      .play()
      .then(() => {
        const checkTime = () => {
          if (initialPlayRef.current && video.currentTime >= 2) {
            setTooltipVisible(true)
            video.currentTime = 1.3
            tooltipVisibleRef.current = true
            // setInitialPlay(false)
            initialPlayRef.current = false
          } else if (!initialPlayRef.current && !tooltipVisibleRef.current) {
          } else if (!initialPlayRef.current && tooltipVisibleRef.current && video.currentTime >= 2) {
            video.currentTime = 1.3
          }
          video.onended = () => {
            setOpen(false)
          }
        }

        video.addEventListener("timeupdate", checkTime)

        return () => {
          video.removeEventListener("timeupdate", checkTime)
        }
      })
      .catch(error => {
        console.error("Video play failed", error)
      })
  }

  const handleCloseTooltip = () => {
    setTooltipVisible(false)
    tooltipVisibleRef.current = false
  }

  const handleMintBadge = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.MINT)
  }

  return (
    <Container>
      {open && (
        <>
          {tooltipVisible && (
            <Tooltip style={{ display: "block" }}>
              <Typography sx={{ textAlign: "right" }}>
                <SvgIcon sx={{ fontSize: "1.3rem" }} onClick={handleCloseTooltip} component={CloseSvg} inheritViewBox />
              </Typography>
              <Typography sx={{ fontSize: "1.6rem", fontWeight: 500, marginBottom: "1.2rem" }}>
                Heya! Congratulations! You can mint "Scroll native badge Scroll" on Scroll Skelly.
              </Typography>
              <MintButton variant="contained" color="primary" sx={{ width: "100%" }} onClick={handleMintBadge}>
                Mint badge
              </MintButton>
            </Tooltip>
          )}
          <video ref={videoRef} controls={false} muted src="/imgs/skelly/scroll.mp4" />
        </>
      )}
      <BadgeDetailDialog />
    </Container>
  )
}

export default MintBadge
