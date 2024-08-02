import { motion, useTime, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import Img from "react-cool-img"

import { Box, Container, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import Button from "@/components/Button"

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
    // left: "3.2rem",
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
  const [totalCanvasCount, setTotalCanvasCount] = useState(0)
  const [totalBadgeCount, setTotalBadgeCount] = useState(0)

  const [randomNumbers, setRandomNumbers] = useState(pickRandomNumbers())
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

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "1512 / 850",
        maxHeight: ["72vw", "72vw", "53.4vw"],
        backgroundSize: "auto 100%",
        position: "relative",
        textAlign: "center",
        backgroundColor: "themeBackground.dark",
        background: "url(/imgs/canvas-badge/header_bg.webp) center/100% no-repeat",
        pt: "6.4vw",
        "& p": {
          color: "#FFF8F3 !important",
        },
      }}
    >
      {/* <Box> */}
      <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: ["7rem", "8.8rem"], fontWeight: 600, mb: "1.6rem" }}>Canvas and Badge</Typography>
      <Stack alignItems="center" gap="3.2rem">
        <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: 500 }}>
          Map your journey and earn badges across Scroll’s ecosystem.
        </Typography>
        <Stack direction="row" gap="2.4rem" sx={{ width: "62.4rem" }}>
          <Statistic label="Total Canvas Minted">
            <Counter number={totalCanvasCount}></Counter>
          </Statistic>
          <Statistic label="Total Badges Minted">
            <Counter number={totalBadgeCount}></Counter>
          </Statistic>
        </Stack>
        <Stack direction="row" gap="1.6rem">
          <BadgesButton color="primary">Visit Canvas</BadgesButton>
          <BadgesButton color="tertiary">Issue Badges</BadgesButton>
        </Stack>
      </Stack>
      <AnimatedContainer sx={{ mt: ["", "2.8rem"], px: ["", "", "3rem"] }}>
        <Box sx={{ position: "relative", maxWidth: "132.8rem", height: "33.7rem", mx: "auto" }}>
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
