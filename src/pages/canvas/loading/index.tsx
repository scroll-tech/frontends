import { useEffect, useMemo, useState } from "react"
import Img from "react-cool-img"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import GridBg from "../components/GridBg"

const defaultGridNum = 4

const LoadingText: any = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "3.2rem",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
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
    <GridBg badgewidth={badgewidth} gridNum={defaultGridNum}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{
          width: `${badgewidth * 2 - 1}px`,
          aspectRatio: "1/1",
          backgroundColor: "text.primary",
          transform: ["translate(0.25px, 0.25px)", "translate(0.5px, 0.5px)", "translate(0.5px, 0.5px)", "translate(0.25px, 0.25px)"],
        }}
      >
        <Box sx={{ width: "66.67%" }}>
          <Img src="/imgs/canvas/Scrolly_Coding.webp" placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="Coding Scrolly" width="100%" />
        </Box>
        <LoadingText>Loading{dots}</LoadingText>
      </Stack>
    </GridBg>
  )
}

export default LoadingPage
