import { useEffect, useMemo, useState } from "react"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import CodingScrolly from "@/assets/images/skelly/Scrolly_Coding.png"

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

const LoadingPage = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

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
      <Stack direction="column" alignItems="center" sx={{ width: `${badgewidth * 2 - 1}px`, aspectRatio: "1/1", backgroundColor: "text.primary" }}>
        <Box sx={{ width: "66.67%", paddingTop: "12%" }}>
          <img src={CodingScrolly} alt="Coding Scrolly" width="100%"></img>
        </Box>
        <Typography
          sx={{
            color: "primary.contrastText",
            fontSize: "3.2rem",
            fontWeight: 600,
            marginTop: "3rem",
            marginBottom: "6%",
          }}
        >
          Loading...
        </Typography>
      </Stack>
    </Container>
  )
}

export default LoadingPage
