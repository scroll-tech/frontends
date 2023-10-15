import React, { useEffect, useRef, useState } from "react"

import { Box, Typography } from "@mui/material"
import { keyframes, styled } from "@mui/system"

const TextSlider: React.FC = () => {
  const texts = ["Scalable", "Open-Source", "Cryptographically Secured", "Ethereum Aligned", "Modular", "Live on Mainnet"]

  const [currentIndex, setCurrentIndex] = useState(0)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleAnimationIteration = () => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length)
    }

    const initialTimer = window.setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length)
      textRef.current?.addEventListener("animationiteration", handleAnimationIteration)
    }, 2000)

    return () => {
      clearTimeout(initialTimer)

      textRef.current?.removeEventListener("animationiteration", handleAnimationIteration)
    }
  }, [])

  return (
    <TextContainer>
      <StyledTypography ref={textRef} variant="H1">
        {texts[currentIndex]}
      </StyledTypography>
    </TextContainer>
  )
}

const slideInOutAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  10% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`

const slideOutAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`

const TextContainer = styled(Box)({
  overflow: "hidden",
})

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  background: "#ffdbb0",
  color: "#101010",
  borderRadius: "1rem",
  lineHeight: "9.4rem",
  padding: "0 2rem",
  textAlign: "center",
  animation: `${slideOutAnimation} 1s linear 1s, ${slideInOutAnimation} 2s linear infinite 2s`,
  [theme.breakpoints.down("sm")]: {
    lineHeight: "4.7rem",
    padding: "0 0.9rem",
  },
}))

export default TextSlider
