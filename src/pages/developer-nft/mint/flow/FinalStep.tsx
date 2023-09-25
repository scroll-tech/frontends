import { useNavigate } from "react-router-dom"

import { Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"

import NFTCard from "../../components/NFTCard"

const FinalStep = () => {
  const navigate = useNavigate()

  const handleGoShow = () => {
    navigate("/developer-nft/my")
  }
  return (
    <Container sx={{ pt: "7.4rem", pb: "14rem" }}>
      <Stack alignItems="center" spacing="3rem">
        <NFTCard sx={{ width: ["80%", "42rem"] }}></NFTCard>
        <Typography sx={{ fontSize: "4.8rem", fontWeight: 600, lineHeight: "6.8rem", width: "61.6rem", textAlign: "center" }}>
          You have successfully minted Scroll Origin NFT!
        </Typography>
        <Button color="primary" onClick={handleGoShow}>
          Done
        </Button>
      </Stack>
    </Container>
  )
}

export default FinalStep
