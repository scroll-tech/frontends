import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Card, CardContent, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as LeftSvg } from "@/assets/svgs/canvas/arrow-left.svg"
import { ReactComponent as RightSvg } from "@/assets/svgs/canvas/arrow-right.svg"
import useCheckViewport from "@/hooks/useCheckViewport"
import { Badge } from "@/pages/canvas/Dashboard/UpgradeDialog/Badges"

interface CarouselProps {
  items: Badge[]
}

const BadgeCard = styled(Card)(({ theme }) => ({
  // minWidth: "44.4rem",
  width: "calc((100% - 6rem) / 3)",
  height: "44.4rem",
  borderRadius: "2rem",
  background: "#FFF8F3",
  textAlign: "center",
  transition: "transform 0.5s ease",
  flex: " 0 0 auto",
  cursor: "pointer",
  "&  *": {
    cursor: "pointer !important",
  },
  [theme.breakpoints.down("md")]: {
    width: "39.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "27.2rem",
    height: "30.4rem",
  },
}))

const ArrorButton = styled(IconButton)(({ theme }) => ({
  background: "#FFF8F3",
  width: "4.8rem",
  height: "4.8rem",
  borderRadius: "0.8rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    background: "#FFF8F3",
  },
  "&.Mui-disabled": {
    color: "#ccc",
    background: "#F0F0F0",
  },
}))

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { isLandscape, isMobile } = useCheckViewport()
  const navigate = useNavigate()

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : items.length - 3))
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < items.length - 3 ? prevIndex + 1 : 0))
  }

  const isPrevDisabled = currentIndex === 0
  const isNextDisabled = (currentIndex + 1) * 3 >= items.length

  const translateX = useMemo(() => {
    return `translateX(calc(((100% + 3rem)  * -1) * ${currentIndex}))`
  }, [currentIndex])

  const handleCardClick = (e, item) => {
    // if a link in badge description is clicked, then do not open detail page
    if (e.target.tagName !== "A") {
      navigate(`/scroll-canvas/badge-contract/${item.badgeContract}`)
    }
  }

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={[
          { margin: ["1.6rem 0 3rem", "5rem 0"], gap: ["0.8rem", "1.6rem", "3rem"] },
          theme => ({
            [theme.breakpoints.down("md")]: {
              overflowX: "auto",
              paddingBottom: "1rem",
            },
          }),
        ]}
        style={{ transform: translateX, transition: "transform 0.5s ease" }}
      >
        {items.map((item, index) => (
          <BadgeCard onClick={e => handleCardClick(e, item)} key={index}>
            <CardContent
              sx={{
                padding: ["2.4rem 1.6rem !important", "3rem 3rem 4rem !important"],
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.6rem",
              }}
            >
              <img alt="logo" src={item.image} style={{ height: isMobile ? "4.8rem" : "8.8rem", borderRadius: "0.8rem" }} />
              <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.2rem", fontWeight: 600 }} component="div">
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: ["1.6rem", "2rem"],
                  fontWeight: 400,
                  lineHeight: ["2.4rem", "3.2rem"],
                  // mb: [0, "1.2rem"],
                  flex: 1,

                  display: "-webkit-box",
                  width: "100%",
                  "-webkit-box-orient": "vertical",
                  "-webkit-line-clamp": "4",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </Typography>
              <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.8rem", "3.2rem"], fontWeight: 600, mt: [0, "2.8rem"] }}>
                <img
                  alt="issuer logo"
                  src={item.issuer.logo}
                  style={{ height: isMobile ? "3.2rem" : "4.8rem", borderRadius: "0.5rem", marginRight: "1.4rem" }}
                />
                {item.issuer.name}
              </Typography>
            </CardContent>
          </BadgeCard>
        ))}
      </Stack>
      {isLandscape && (
        <Box display="flex" justifyContent="flex-end" gap={"1.6rem"} marginTop={2} paddingBottom="9.5rem">
          <ArrorButton onClick={handlePrev} disabled={isPrevDisabled} aria-label="previous">
            <SvgIcon sx={{ fontSize: "1.6rem" }} component={LeftSvg} inheritViewBox />
          </ArrorButton>
          <ArrorButton onClick={handleNext} disabled={isNextDisabled} aria-label="next">
            <SvgIcon sx={{ fontSize: "1.6rem" }} component={RightSvg} inheritViewBox />
          </ArrorButton>
        </Box>
      )}
    </Box>
  )
}

export default Carousel
