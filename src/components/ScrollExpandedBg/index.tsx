import { useEffect, useState } from "react"

import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const Container = styled(Box)(({ theme }) => ({
  borderRadius: "40px 40px 0px 0px",
  paddingTop: "15.4rem",
  background: "transparent",
  display: "flex !important",
  justifyContent: "center",
  position: "relative",
  maxWidth: "144rem",
  margin: "0 auto",
  "& .MuiContainer-root": {
    position: "relative",
  },
}))

const Background = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0",
  bottom: "0",
  width: "100%",
  background: theme.palette.themeBackground.dark,
  willChange: "width, height",
  borderRadius: "40px 40px 0px 0px",
  maxWidth: "calc(100vw - 15px)",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}))
const ScrollExpandedBg = props => {
  const { anchorEl, children } = props
  const [, setScrollPosition] = useState(0)

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

        const widthIncrease = 0.5 * percentageScrolled
        const targetWidthPercentage = 100 + widthIncrease * 100

        return `${targetWidthPercentage}%`
      }
    }
    return "100%" //default value
  }
  return (
    <Container>
      <Background sx={{ width: calculateWidth() }} />
      {children}
    </Container>
  )
}

export default ScrollExpandedBg
