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
      <Stack direction="column" spacing="5.6rem">
        <Typography sx={{ fontSize: "4.6rem", lineHeight: "5.5rem", fontWeight: 500 }}>
          Congratulations to be eligible for a Scroll Early Developer NFT and a key contributor in our community
        </Typography>
        <Typography sx={{ fontSize: "2.4rem", lineHeight: "3.4rem", fontWeight: 600 }}>
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
