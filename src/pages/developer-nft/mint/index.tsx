import dayjs from "dayjs"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Stack, Typography } from "@mui/material"

import NFTImage from "@/assets/images/nft-image.png"
import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"
import { DEVELOPER_NFT_PHRASES } from "@/constants"

import Alert from "../components/Alert"
import NFTCard from "../components/NFTCard"
import Statistic from "../components/Statistic"

const MintNFT = () => {
  const navigate = useNavigate()
  const [mintedAmount] = useState(640)

  const [ineligible] = useState(false)

  const handleMint = () => {
    // TODO:
    // setIneligible(true)
    navigate("./flow")
  }

  return (
    <SectionWrapper dark sx={{ pt: "7.8rem", height: "calc(100vh - 7.5rem)", display: "flex", justifyContent: "center" }}>
      <Stack direction="row" spacing="4.8rem" alignItems="center">
        <Stack direction="column" spacing="4.8rem" alignItems="flex-start">
          <Typography sx={{ fontSize: "7.8rem", fontWeight: 600, lineHeight: "8.5rem", width: "49rem" }}>Scroll Early Developer NFT</Typography>
          <Stack direction="row" spacing="4.8rem">
            <Statistic label="NFTs Minted">
              {mintedAmount}
              <Typography component="span" sx={{ fontSize: "2.4rem", fontWeight: 500 }}>
                /unlimited
              </Typography>
            </Statistic>
            <Statistic label="Released">{dayjs(DEVELOPER_NFT_PHRASES.Start).format("MMM D, YYYY")}</Statistic>
          </Stack>
          {ineligible ? (
            <Alert type="multiline" severity="error">
              Selected Wallet is not eligible to mint because you didn’t deploy a project within 45 days of Genesis Block
            </Alert>
          ) : (
            <Button color="primary" onClick={handleMint}>
              Mint Now
            </Button>
          )}
        </Stack>

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
      </Stack>
    </SectionWrapper>
  )
}

export default MintNFT
