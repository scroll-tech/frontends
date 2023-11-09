import { useNavigate } from "react-router-dom"

import { Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { SCROLL_ORIGINS_NFT } from "@/constants"

import NFTImage from "../../components/NFTCard/NFTImage"
import myNFT from "../my/myNFT"

const FinalStep = () => {
  const navigate = useNavigate()

  const handleGoShow = () => {
    navigate("/developer-nft/my")
  }
  return (
    <Container sx={{ pt: ["2.4rem", "4rem"], pb: ["8rem", "14rem"] }}>
      <Stack alignItems="center" spacing="1.6rem">
        <NFTImage sx={{ width: ["108%", "52rem"] }} src={myNFT}></NFTImage>
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
