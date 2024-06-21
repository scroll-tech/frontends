import { Box, Typography, keyframes } from "@mui/material"
import { styled } from "@mui/system"

import useCheckViewport from "@/hooks/useCheckViewport"
import useImagesLoaded from "@/hooks/useImagesLoaded"

interface FadeInBoxProps {
  delay?: string
  backgroundurl: string
  animation?: string
  style?: any
}

const FadeInDiv = styled("div")<FadeInBoxProps>(({ theme, delay, backgroundurl, animation, style }) => ({
  animation: `${fadeIn} 1s ease-in-out ${delay ?? ""} forwards ${animation ? `, ${animation}` : ""}`,
  opacity: 0,
  position: "absolute",
  // left: "0",
  // right: "0",
  // bottom: 0,
  // width: "100%",
  // height: "56.4vw",
  background: `url(${backgroundurl}) no-repeat center / cover`,
  ...style,
}))

const HeroBox = styled(Box)(({ theme }) => ({
  background: `
               url(/imgs/sessions/2-Right-Building-PNG.png) no-repeat right bottom / 36.5%,
               url(/imgs/sessions/2-Left-Building-PNG.png) no-repeat left bottom /  32.92%,
               url(/imgs/sessions/0-BG-PNG.png) no-repeat center / cover
              `,
  height: "56.4vw",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    height: "72vw",
  },
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

interface ImageConfig {
  url: string
  delay?: string
  animation?: string
  style?: any
}

const Header = () => {
  const sessionImages: { [key: string]: ImageConfig } = {
    humans: { url: "/imgs/sessions/3-Humans-png.png", delay: "0.8s", style: { width: "91.21vw", left: "5vw", height: "17.285vw", bottom: 0 } },
    ethScroll: {
      url: "/imgs/sessions/Scroll-Eth.png",
      delay: "0.8s",
      animation: `${Floating} 4s ease-in-out infinite`,
      style: { width: "4.66vw", right: "4.4vw", height: "7.67vw", bottom: "36vw" },
    },
    layer2Back: {
      url: "/imgs/sessions/Scroll-Layer2-back.png",
      delay: "1s",
      style: { width: "2.845vw", height: "3.814vw", left: "2.8vw", bottom: "38.56vw" },
    },
    tallTower: { url: "/imgs/sessions/1-Left-TallTower-PNG.png", style: { width: "3.82vw", height: "21.15vw", left: "1.6vw", bottom: "29.2vw" } },
    layer3: {
      url: "/imgs/sessions/Scroll-Layer3.png",
      delay: "1.1s",
      style: { width: "4.12vw", height: "8.8644vw", left: "1.74vw", bottom: "32.15vw" },
    },
    layer1: { url: "/imgs/sessions/Scroll-Layer1.png", delay: "1.2s", style: { width: "3.07vw", height: "3.24vw", left: "2vw", bottom: "42vw" } },
    leftCloud: {
      url: "/imgs/sessions/LeftCloud.png",
      animation: `${HorizontalFloating} 10s ease-in-out infinite`,
      style: { width: "8.95vw", height: "14.68vw", left: "0", bottom: "22vw" },
    },
  }

  const imageUrls = Object.values(sessionImages).map(image => image.url)
  const { allLoaded } = useImagesLoaded(imageUrls)
  const { isMobile } = useCheckViewport()

  return (
    <Box
      sx={{
        width: "100%",
        height: ["72vw", "72vw", "56.4vw"],
        marginTop: ["-6.2rem", "-6.5rem"],
        backgroundSize: "cover",
        position: "relative",
        textAlign: "center",
        mb: "2.4rem",
        backgroundColor: "#f6fdfd",
      }}
    >
      {allLoaded && (
        <>
          <HeroBox />
          {Object.entries(sessionImages).map(([key, { url, delay = "0s", animation = "", style }]) => (
            <FadeInDiv key={key} backgroundurl={url} delay={delay} animation={animation} style={style} />
          ))}
        </>
      )}
      <Typography
        sx={{
          fontSize: ["3rem", "7.8rem"],
          lineHeight: ["4rem", "8.8rem"],
          paddingTop: ["6rem", "11rem", "10.5vw"],
          marginBottom: ["1.5rem"],
          fontWeight: 600,
          top: ["6vw", 0],
          position: "absolute",
          textAlign: ["center"],
          width: "100%",
          animation: ` ${fadeIn} 1s ease-in-out forwards`,
        }}
      >
        Scroll
        {isMobile ? <br /> : " "}
        Sessions
      </Typography>
    </Box>
  )
}

export default Header
