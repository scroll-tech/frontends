import { useSwiper } from "swiper/react"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"

import StepWrapper from "./StepWrapper"

const InitialStep = () => {
  const swiper = useSwiper()

  const handleStartFlow = () => {
    swiper.slideNext()
  }
  return (
    <StepWrapper src="/imgs/nft/flow-initial-step.svg">
      <Stack direction="column" sx={{ gap: ["1.6rem", "2.4rem", "5.6rem"] }}>
        <Typography sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["3.2rem", "7.2rem"], fontWeight: 600 }}>
          Congratulations to be eligible for a Scroll Early Developer NFT and a key contributor in our community
        </Typography>
        <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: [400, 500] }}>
          Scroll cares about building a community with mind-like people, that’s why we prepared this little quiz help you learn more about our value
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
