import { motion, useTime, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Img from "react-cool-img"

import { Box, Container, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import Button from "@/components/Button"
import useCheckViewport from "@/hooks/useCheckViewport"

import Counter from "./Counter"
import Statistic from "./Statistic"

const AnimatedContainer = motion(Container)

const ImageWrapper = motion(Box)
// wrapper 1328x337
// use scale value instead of absolute value

const BADGES = [
  {
    image: "/imgs/canvas-badge/Ambient.webp",
    key: "Ambient",
    width: "13.9rem",
    top: 0,
  },
  {
    image: "/imgs/canvas-badge/Zebra.webp",
    key: "Zebra",
    width: "18.8rem",
    top: "13.5rem",
    left: "9.55rem",
  },
  {
    image: "/imgs/canvas-badge/Panda.png",
    key: "Panda",
    width: "13.5rem",
    top: 0,
    left: "17.4rem",
  },
  {
    image: "/imgs/canvas-badge/Pencils.png",
    key: "Pencils",
    width: "16.9rem",
    top: "8.2rem",
    left: "27rem",
  },
  {
    image: "/imgs/canvas-badge/EAS.png",
    key: "EAS",
    width: "20.3rem",
    top: "13.5rem",
    left: "41.8rem",
  },
  {
    image: "/imgs/canvas-badge/SymTrader.png",
    key: "SymTrader",
    width: "13.5rem",
    top: 0,
    left: "45.9rem",
  },
  {
    image: "/imgs/canvas/Badge_Ethereum_Year.png",
    key: "Ethererum",
    width: "16.9rem",
    top: "6.75rem",
    left: "59.45rem",
  },
  {
    image: "/imgs/canvas-badge/Passport.png",
    key: "Passport",
    width: "20.3rem",
    top: "13.5rem",
    left: "73.1rem",
  },
  {
    image: "/imgs/canvas-badge/Cog.png",
    key: "Cog",
    width: "12.5rem",
    top: 0,
    left: "78.7rem",
  },
  {
    image: "/imgs/canvas-badge/Scrolly.png",
    key: "Scrolly",
    width: "13.5rem",
    top: 0,
    left: "101.9rem",
  },
  {
    image: "/imgs/canvas-badge/Scroller.png",
    key: "Scroller",
    width: "16.8rem",
    top: "8.2rem",
    left: "92.8rem",
  },
  {
    image: "/imgs/canvas-badge/Flock-x.png",
    key: "Flock",
    width: "20.2rem",
    top: "13.5rem",
    left: "106.4rem",
  },
  {
    image: "/imgs/canvas-badge/Symbiosis.png",
    key: "Symbiosis",
    width: "13.8rem",
    top: 0,
    left: "119rem",
  },
]

const BadgesButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.themeBackground.dark,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))

function pickRandomNumbers(excludeNumbers: number[] = []) {
  const count = Math.random() < 0.5 ? 3 : 4
  const numbers = Array.from({ length: BADGES.length }, (_, i) => i).filter(item => !excludeNumbers.includes(item))

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }

  return numbers.slice(0, count)
}

const Header = () => {
  const { isMobile } = useCheckViewport()
  const [totalCanvasCount, setTotalCanvasCount] = useState(0)
  const [totalBadgeCount, setTotalBadgeCount] = useState(0)
  const [badgesScale, setBadgesScale] = useState(1)

  const [randomNumbers, setRandomNumbers] = useState(pickRandomNumbers())
  const badgesContainerRef = useRef<any>()

  const time = useTime()
  const transform = useTransform(time, value => Math.floor(value / 3000))
  useEffect(() => {
    const unsubscribe = transform.onChange(() => {
      setRandomNumbers(pre => pickRandomNumbers(pre))
    })

    return () => unsubscribe()
  }, [transform])

  useEffect(() => {
    setTotalCanvasCount(444232)
    setTotalBadgeCount(910946)
    const counterTimer = setInterval(() => {
      setTotalCanvasCount(pre => pre + ~~(Math.random() * 100))
      setTotalBadgeCount(pre => pre + ~~(Math.random() * 500))
    }, 5e3)
    return () => {
      clearInterval(counterTimer)
    }
  }, [])

  useEffect(() => {
    const handleWindowResize = () => {
      console.log(badgesContainerRef.current?.clientWidth, "vvv")
      if (badgesContainerRef.current?.clientWidth && badgesContainerRef.current.clientWidth < 1328) {
        setBadgesScale(badgesContainerRef.current.clientWidth / 1328)
      } else {
        setBadgesScale(1)
      }
    }
    handleWindowResize()

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return (
    <Box
      sx={[
        {
          width: "100%",
          aspectRatio: ["unset", "unset", "1512 / 850"],
          height: "53.4vw",
          backgroundSize: "auto 100%",
          position: "relative",
          textAlign: "center",
          backgroundColor: "themeBackground.dark",
          background: "url(/imgs/canvas-badge/header_bg.webp) center bottom / 100% no-repeat",
          pt: ["5.6rem", "6.4vw"],
          px: ["2rem"],
          "& p": {
            color: "#FFF8F3 !important",
          },
          "@media(max-width: 1600px)": {
            height: "72vw",
          },
        },
        theme => ({
          [theme.breakpoints.down("md")]: {
            height: "72vh",
          },
          [theme.breakpoints.down("sm")]: {
            height: "62rem",
          },
        }),
      ]}
    >
      <Typography sx={{ fontSize: ["3.8rem", "7.8rem"], lineHeight: ["5.6rem", "8.8rem"], fontWeight: 600, mb: [0, "1.6rem"] }}>
        Canvas and Badge
      </Typography>
      <Stack alignItems="center" gap={isMobile ? "2.4rem" : "3.2rem"}>
        <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], lineHeight: ["1.8rem", "3.6rem"], fontWeight: 500 }}>
          Map your journey and earn badges across Scroll’s ecosystem.
        </Typography>
        <Stack direction="row" gap={isMobile ? "0.8rem" : "2.4rem"} sx={{ width: ["100%", "62.4rem"], mt: ["1.2rem", 0] }}>
          <Statistic label="Total Canvas Minted">
            <Counter number={totalCanvasCount}></Counter>
          </Statistic>
          <Statistic label="Total Badges Minted">
            <Counter number={totalBadgeCount}></Counter>
          </Statistic>
        </Stack>
        <Stack direction={isMobile ? "column" : "row"} gap="1.6rem" sx={{ width: ["100%", "auto"] }}>
          <BadgesButton color="primary">Visit Canvas</BadgesButton>
          <BadgesButton color="tertiary">Issue Badges</BadgesButton>
        </Stack>
      </Stack>
      <AnimatedContainer sx={{ mt: ["9.5rem", "6rem", "2.8rem"], px: "0 !important" }} ref={badgesContainerRef}>
        <Box
          sx={{
            position: "relative",
            width: "132.8rem",
            height: ["auto", "33.7rem"],
            mx: "auto",
            transform: `scale(${badgesScale})`,
            transformOrigin: "top left",
          }}
        >
          {BADGES.map(({ image, top, left, width }, index) => (
            <ImageWrapper
              style={{ willChange: "opacity", zIndex: randomNumbers.includes(index) ? 1 : 0 }}
              animate={{ opacity: randomNumbers.includes(index) ? [0.2, 1] : [0.2, 0.2] }}
              transition={{
                duration: 1,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 2,
              }}
              sx={{ position: "absolute", top, left }}
            >
              <Img src={image} style={{ width }}></Img>
            </ImageWrapper>
          ))}
        </Box>
      </AnimatedContainer>
      {/* </Box> */}
    </Box>
  )
}

export default Header
