import { useSwiper } from "swiper/react"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"

import StepWrapper from "./StepWrapper"

const InitialStep = () => {
  const swiper = useSwiper()

  const handleStartFlow = () => {
    swiper.slideNext()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  return (
    <StepWrapper src="/imgs/nft/flow-initial-step.svg">
      <Stack direction="column" sx={{ gap: ["1.6rem", "2.4rem", "5.6rem"] }}>
        <Typography sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["3.2rem", "6.4rem"], fontWeight: 600 }}>
          Congratulations! You are eligible for Scroll Origins and we thank you for being a key contributor.
        </Typography>
        <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: [400, 500] }}>
          Scroll cares about building a community with like-minded people. That’s why we prepared a short quiz help you learn more about our values
          and welcome you to become part of our community
        </Typography>
        <Button color="primary" onClick={handleStartFlow}>
          Start
        </Button>
      </Stack>
    </StepWrapper>
  )
}

export default InitialStep
