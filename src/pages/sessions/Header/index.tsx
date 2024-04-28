import { Box, Typography, keyframes } from "@mui/material"
import { styled } from "@mui/system"

import useImagesLoaded from "@/hooks/useImagesLoaded"

interface FadeInBoxProps {
  delay?: string
  backgroundurl: string
  animation?: string
}

const FadeInDiv = styled("div")<FadeInBoxProps>(({ theme, delay, backgroundurl, animation }) => ({
  animation: `${fadeIn} 1s ease-in-out ${delay ?? ""} forwards ${animation ? `, ${animation}` : ""}`,
  opacity: 0,
  position: "absolute",
  left: "0",
  right: "0",
  bottom: 0,
  width: "100%",
  height: "56.4vw",
  background: `url(${backgroundurl}) no-repeat center / cover`,
}))

const Floating = keyframes`
  0%, 100% {
    transform: translateY(-0.5vw);
  }
  50% {
    transform: translateY(-1.5vw);
  }
`

const HorizontalFloating = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-0.75vw);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Header = () => {
  const imageUrls = [
    // "/imgs/sessions/L1-Buildings.png",
    // "/imgs/sessions/L2-Humans.png",
    // "/imgs/sessions/L3-Floating-Eth.png",
    // "/imgs/sessions/L4-Scroll.png",
    // "/imgs/sessions/L5-Scroll.png",
    // "/imgs/sessions/L6-Scroll-Tower.png",
    // "/imgs/sessions/L7-Scroll-Back.png",
  ]
  const { allLoaded } = useImagesLoaded(imageUrls)

  return (
    <Box
      sx={{
        width: "100%",
        height: ["72vw", "56.4vw"],
        marginTop: ["-6.2rem", "-6.5rem"],
        backgroundSize: "cover",
        position: "relative",
        textAlign: "center",
        mb: "2.4rem",
        backgroundColor: "#f6fdfd",
      }}
    >
      {!allLoaded && (
        <>
          <FadeInDiv backgroundurl="/imgs/sessions/0-BG-PNG.png" />
          <FadeInDiv backgroundurl="/imgs/sessions/2-Left-Building-PNG.png" />
          <FadeInDiv backgroundurl="/imgs/sessions/2-Right-Building-PNG.png" />
          <FadeInDiv backgroundurl="/imgs/sessions/3-Humans-png.png" delay="0.8s" />

          <FadeInDiv backgroundurl="/imgs/sessions/Scroll-Eth.png" delay="0.8s" animation={`${Floating} 4s ease-in-out infinite`} />

          <FadeInDiv backgroundurl="/imgs/sessions/Scroll-Layer2-back.png" delay="1s" />
          <FadeInDiv backgroundurl="/imgs/sessions/1-Left-TallTower-PNG.png" />
          <FadeInDiv backgroundurl="/imgs/sessions/Scroll-Layer3.png" delay="1.1s" />

          <FadeInDiv backgroundurl="/imgs/sessions/Scroll-Layer1.png" delay="1.2s" />
          <FadeInDiv backgroundurl="/imgs/sessions/LeftCloud.png" animation={`${HorizontalFloating} 10s ease-in-out infinite`} />

          <Typography
            sx={{
              fontSize: ["4rem", "7.8rem"],
              lineHeight: ["5rem", "8.8rem"],
              paddingTop: ["6rem", "10.5vw"],
              marginBottom: ["1.5rem"],
              fontWeight: 600,
              position: "absolute",
              textAlign: ["right", "center"],
              width: "100%",
              animation: ` ${fadeIn} 1s ease-in-out forwards`,
            }}
          >
            Scroll Sessions
          </Typography>
        </>
      )}
    </Box>
  )
}

export default Header
