import { useNavigate } from "react-router-dom"

import { Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { SCROLL_ORIGINS_NFT } from "@/constants"

import NFTCard from "../../components/NFTCard"

const FinalStep = () => {
  const navigate = useNavigate()

  const handleGoShow = () => {
    navigate("/developer-nft/my")
  }
  return (
    <Container sx={{ pt: ["2.4rem", "4rem", "6rem"], pb: ["8rem", "14rem"] }}>
      <Stack alignItems="center" spacing="2.4rem">
        <NFTCard sx={{ width: ["80%", "42.5rem"], mb: "1rem" }}></NFTCard>
        <Typography
          sx={{ fontSize: ["2.4rem", "4.8rem"], fontWeight: 600, lineHeight: ["3.2rem", "7.2rem"], width: ["100%", "61.6rem"], textAlign: "center" }}
        >
          You have successfully minted {SCROLL_ORIGINS_NFT}!
        </Typography>
        <Button color="primary" onClick={handleGoShow}>
          Done
        </Button>
      </Stack>
    </Container>
  )
}

export default FinalStep
