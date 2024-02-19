import React, { useState } from "react"

import { Box, Card, CardContent, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as LogoSvg } from "@/assets/svgs/common/scroll-logo-icon.svg"
import { ReactComponent as LeftSvg } from "@/assets/svgs/skelly/arrow-left.svg"
import { ReactComponent as RightSvg } from "@/assets/svgs/skelly/arrow-right.svg"

interface CarouselItem {
  title: string
  description: string
}

interface CarouselProps {
  items: CarouselItem[]
}

const BadgeCard = styled(Card)(({ theme }) => ({
  width: "44.4rem",
  height: "44.4rem",
  padding: "1.6rem",
  borderRadius: "2rem",
  background: "#FFF8F3",
  textAlign: "center",
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
}))

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : items.length - 3))
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < items.length - 3 ? prevIndex + 1 : 0))
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ margin: "5rem 0" }}>
        {items.slice(currentIndex, currentIndex + 3).map((item, index) => (
          <BadgeCard key={index} sx={{ minWidth: 200 }}>
            <CardContent>
              <SvgIcon component={LogoSvg} sx={{ fontSize: "8.8rem" }} inheritViewBox />
              <Typography variant="h5" sx={{ margin: "1.6rem 0" }} component="div">
                {item.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: "3.2rem", marginBottom: "4.4rem" }}>
                {item.description}
              </Typography>
              <Typography variant="h5">
                <SvgIcon component={LogoSvg} sx={{ fontSize: "4.8rem" }} inheritViewBox /> Dawn Wallet
              </Typography>
            </CardContent>
          </BadgeCard>
        ))}
      </Stack>
      <Box display="flex" justifyContent="flex-end" gap={"1.6rem"} marginTop={2} paddingBottom="9.5rem">
        <ArrorButton onClick={handlePrev} sx={{ background: "#FFF8F3" }} aria-label="previous">
          <SvgIcon component={LeftSvg} sx={{}} inheritViewBox />
        </ArrorButton>
        <ArrorButton onClick={handleNext} sx={{ background: "#FFF8F3" }} aria-label="next">
          <SvgIcon component={RightSvg} sx={{ fontSize: "2.2rem" }} inheritViewBox />
        </ArrorButton>
      </Box>
    </Box>
  )
}

export default Carousel
