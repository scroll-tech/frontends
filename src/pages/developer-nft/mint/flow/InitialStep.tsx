import { useSwiper } from "swiper/react"

import { Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"

const InitialStep = () => {
  const swiper = useSwiper()

  const handleStartFlow = () => {
    swiper.slideNext()
  }
  return (
    <Container sx={{ pt: "12rem" }}>
      <Stack direction="row" spacing="3.25rem">
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
        <img src="/imgs/nft/flow-initial-step.svg" alt="flow-initial-step"></img>
      </Stack>
    </Container>
  )
}

export default InitialStep
