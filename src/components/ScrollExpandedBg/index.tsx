import { useEffect, useState } from "react"

import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const Wrapper = styled(Box)(({ theme }) => ({
  position: "relative",
}))

const Container = styled(Box)(({ theme }) => ({
  borderRadius: "40px 40px 0px 0px",
  paddingTop: "5.4rem",
  background: "transparent",
  display: "flex !important",
  justifyContent: "center",
  maxWidth: "144rem",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {},
}))

const Background = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0",
  bottom: "0",
  width: "60%",
  minWidth: "144rem",
  background: theme.palette.themeBackground.dark,
  willChange: "width, height",
  borderRadius: "40px 40px 0px 0px",
  left: "50%",
  transform: "translateX(-50%)",
  maxWidth: "100%",

  // in consideration of the main content width
  [theme.breakpoints.down("xl")]: {
    minWidth: "100%",
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
        const targetWidthPercentage = 60 + widthIncrease * 120

        return `${targetWidthPercentage}%`
      }
    }
    return "60%" //default value
  }
  return (
    <Wrapper>
      <Background sx={{ width: calculateWidth() }} />
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default ScrollExpandedBg
