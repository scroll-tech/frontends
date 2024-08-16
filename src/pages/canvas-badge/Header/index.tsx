import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Img from "react-cool-img"
import { useLocation } from "react-router-dom"

import { Box, Container, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { retrieveCanvasBadgeURL } from "@/apis/canvas-badge"
import Button from "@/components/Button"
import { CANVAS_AND_BADGES_PAGE_SYMBOL, CANVAS_URL, HEADER_BADGES, HEADER_STARS, ISSUE_BADGES_URL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import Counter from "./Counter"
import Statistic from "./Statistic"

const ImageWrapper = motion(Box)

const BadgesButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.themeBackground.dark,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))

const Header = () => {
  const { hash } = useLocation()
  const { isMobile } = useCheckViewport()
  const [badgesScale, setBadgesScale] = useState(1)
  const [starsScale, setStarsScale] = useState(1)

  const badgesContainerRef = useRef<any>()

  const { data } = useQuery({
    queryKey: ["totalCount"],
    queryFn: async () => {
      const data = await scrollRequest(retrieveCanvasBadgeURL, {
        method: "POST",
        body: JSON.stringify({
          canvas: true,
          badges: true,
        }),
      })
      return data
    },
    refetchInterval: 18e4, // 3 mins
    placeholderData: { canvasCount: 100000, badgesCount: 100000 },
  })

  useEffect(() => {
    if (hash) {
      const targetEl = document.getElementById(`${CANVAS_AND_BADGES_PAGE_SYMBOL}-${hash.slice(1)}`)
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "instant",
        })
      }
    }
  }, [hash])

  useEffect(() => {
    const handleWindowResize = () => {
      if (badgesContainerRef.current?.clientWidth && badgesContainerRef.current.clientWidth < 1328) {
        setBadgesScale(badgesContainerRef.current.clientWidth / 1328)
      } else {
        setBadgesScale(1)
      }
      if (window.screen.width < 1512) {
        setStarsScale((window.screen.width - 120) / 1512)
      } else {
        setStarsScale(1)
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
          position: "relative",
          width: "100%",
          aspectRatio: ["unset", "unset", "1512 / 850"],
          height: "52vw",
          backgroundSize: "auto 100%",
          textAlign: "center",
          backgroundColor: "themeBackground.dark",
          background: "url(/imgs/canvas-badge/badges-header-bg.webp) center bottom / 100% no-repeat",
          pt: ["5.6rem", "6.4vw"],
          px: ["2rem"],
          "& p": {
            color: "#FFF8F3 !important",
          },
          "@media(max-width: 1600px)": {
            height: "64vw",
            // backgroundPosition: "center bottom",
          },
        },
        theme => ({
          [theme.breakpoints.down("lg")]: {
            height: "76vw",
          },
          [theme.breakpoints.down("md")]: {
            height: "75rem",
          },
          [theme.breakpoints.down("sm")]: {
            height: "62rem",
          },
        }),
      ]}
    >
      <Container
        sx={{
          position: "absolute",
          top: ["40rem", "4vw"],
          left: "50%",
          transform: `translateX(calc(${starsScale < 1 ? "6rem - 50%" : "-50%"})) scale(${starsScale})`,
          transformOrigin: "top left",
        }}
      >
        {HEADER_STARS.map(({ icon, size, left, top }) => (
          <ImageWrapper
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              times: [0, 0.5, 1],
            }}
          >
            <SvgIcon component={icon} sx={{ fontSize: size, position: "absolute", top, left }} inheritViewBox></SvgIcon>
          </ImageWrapper>
        ))}
      </Container>
      <Typography sx={{ fontSize: ["3.8rem", "7.8rem"], lineHeight: ["5.6rem", "8.8rem"], fontWeight: 600, mb: [0, "1.6rem"] }}>
        Canvas and Badges
      </Typography>
      <Stack alignItems="center" gap={isMobile ? "2.4rem" : "3.2rem"}>
        <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], lineHeight: ["1.8rem", "3.6rem"], fontWeight: 500 }}>
          Build your on-chain persona and collect badges across Scroll’s ecosystem
        </Typography>
        <Stack direction="row" gap={isMobile ? "0.8rem" : "2.4rem"} sx={{ width: ["100%", "62.4rem"], mt: ["1.2rem", 0] }}>
          <Statistic label="Total Canvas Minted">
            <Counter number={data?.canvasCount}></Counter>
          </Statistic>
          <Statistic label="Total Badges Minted">
            <Counter number={data?.badgesCount}></Counter>
          </Statistic>
        </Stack>
        <Stack direction={isMobile ? "column" : "row"} gap="1.6rem" sx={{ width: ["100%", "auto"] }}>
          <BadgesButton color="primary" href={CANVAS_URL}>
            Visit Canvas
          </BadgesButton>
          <BadgesButton color="tertiary" href={ISSUE_BADGES_URL} target="_blank">
            Issue Badges
          </BadgesButton>
        </Stack>
      </Stack>
      <Box sx={{ mt: ["9.5rem", "6rem", "6rem"] }} ref={badgesContainerRef}>
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
          {HEADER_BADGES.map(({ image, top, left, width }, index) => (
            <ImageWrapper
              key={index}
              style={{ willChange: "opacity", zIndex: 1 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 12,
                repeatDelay: 6 + Math.random() * 6,
                times: [0, 0.5, 1],
              }}
              sx={{ position: "absolute", top, left }}
            >
              <Img src={image} style={{ width }}></Img>
            </ImageWrapper>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Header
