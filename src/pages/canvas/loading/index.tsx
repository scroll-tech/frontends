import { useEffect, useMemo, useState } from "react"
import Img from "react-cool-img"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const defaultGridNum = 4

const Container: any = styled(Box)(({ theme, badgewidth }: any) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "calc(100vh - 6.5rem)",
  backgroundColor: "#101010",
  backgroundImage:
    "linear-gradient(90deg, rgba(255,255,255, 0.3) 1px, transparent 1px), linear-gradient( rgba(255,255,255, 0.3) 1px, transparent 1px)",
  backgroundSize: `${badgewidth}px ${badgewidth}px`,
  backgroundPosition: `calc(50% - ${badgewidth / 2}px) calc(50% - ${badgewidth / 2}px)`,
  "&::before, &::after": {
    content: "''",
    height: "100%",
    position: "absolute",
    top: 0,
    width: "calc((100vw - 100vh + 14rem)/ 2) ",
    zIndex: 42,
  },
  "&::before": {
    background: "linear-gradient(90deg, #101010 50.5%, rgba(16, 16, 16, 0) 100%)",
    left: 0,
  },
  "&::after": {
    background: "linear-gradient(270deg, #101010 50.5%, rgba(16, 16, 16, 0) 100%)",
    right: 0,
  },
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 6.2rem)",
  },
}))

const LoadingText: any = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "3.2rem",
  fontWeight: 600,
}))

const LoadingPage = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [dots, setDots] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + "." : ""))
    }, 500)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const badgewidth = useMemo(() => {
    const { width, height } = windowDimensions
    if (width < height - 62) {
      return (width - 62) / defaultGridNum
    } else {
      return (height - 65 - 80) / defaultGridNum
    }
  }, [windowDimensions, defaultGridNum])
  return (
    <Container badgewidth={badgewidth}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ width: `${badgewidth * 2 - 1}px`, aspectRatio: "1/1", backgroundColor: "text.primary" }}
      >
        <Box sx={{ width: "66.67%" }}>
          <Img src="/imgs/canvas/Scrolly_Coding.webp" placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="Coding Scrolly" width="100%" />
        </Box>
        <LoadingText>Loading{dots}</LoadingText>
      </Stack>
    </Container>
  )
}

export default LoadingPage
