"use client"

import { useEffect, useRef, useState } from "react"

import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const Wrapper = styled<any>(Box, { shouldForwardProp: prop => prop !== "bgColor" })(({ theme, bgColor }) => ({
  position: "relative",
  backgroundColor: bgColor ? theme.vars.palette.themeBackground[bgColor] : "transparent",
  width: "100%",
  overflow: "hidden",
}))

const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "40px 40px 0px 0px",
  paddingTop: "5.4rem",
  background: "transparent",
  display: "flex !important",
  justifyContent: "center",
  maxWidth: "152rem",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {},
})) as typeof Box

const Background = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0",
  bottom: "0",
  width: "60%",
  minWidth: "152rem",
  backgroundColor: theme.vars.palette.themeBackground.dark,
  willChange: "width, height",
  borderRadius: "40px 40px 0px 0px",
  left: "50%",
  transform: "translateX(-50%)",
  // maxWidth: "100%",

  // in consideration of the main content width
  [theme.breakpoints.down("xl")]: {
    minWidth: "100%",
  },
})) as typeof Box
const ScrollExpandedBg = props => {
  const { anchorEl, children, bottomColor, fastScrollIn, ...restProps } = props
  const [, setScrollPosition] = useState(0)

  const bgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const calculateWidth = () => {
    if (anchorEl.current) {
      const rect = anchorEl.current.getBoundingClientRect()
      const viewTop = window.innerHeight

      if (rect.top <= viewTop) {
        const scrolledDistance = viewTop - rect.top
        const percentageScrolled = Math.min(scrolledDistance / viewTop, 1)
        let ratio = 0.5
        if (fastScrollIn) {
          if (window.innerWidth <= 1920 && window.innerWidth > 1680) {
            ratio = 1
          }
          if (window.innerWidth > 1920) {
            ratio = 2
          }
        }

        const widthIncrease = ratio * percentageScrolled
        const targetWidthPercentage = 40 + widthIncrease * 180

        return `${targetWidthPercentage}%`
      }
    }
    return "40%" //default value
  }

  return (
    <Wrapper bgColor={bottomColor}>
      <Background ref={bgRef} sx={{ width: calculateWidth() }} />
      <Container {...restProps}>{children}</Container>
    </Wrapper>
  )
}

export default ScrollExpandedBg
