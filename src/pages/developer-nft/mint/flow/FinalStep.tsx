import { useNavigate } from "react-router-dom"

import { Box, Container, Stack, Typography } from "@mui/material"

import NFTImage from "@/assets/images/nft-image.png"
import Button from "@/components/Button"

import NFTCard from "../../components/NFTCard"

const FinalStep = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }
  return (
    <Container sx={{ pt: "7.4rem", pb: "14rem" }}>
      <Stack alignItems="center" spacing="3rem">
        <Box
          sx={{
            background: "url(/imgs/nft/big-loop.svg) center no-repeat",
            width: "52rem",
            height: "52rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NFTCard size="large" image={NFTImage} name="Scroll Early Developer NFT"></NFTCard>
        </Box>
        <Typography sx={{ fontSize: "4.8rem", fontWeight: 600, lineHeight: "6.8rem" }}>You have successfully minted your NFT!</Typography>
        <Button color="primary" onClick={handleGoHome}>
          Back to home
        </Button>
      </Stack>
    </Container>
  )
}

export default FinalStep
