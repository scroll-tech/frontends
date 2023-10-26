import dayjs from "dayjs"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import Alert from "../components/Alert"
import NFTCard from "../components/NFTCard"
import Statistic from "../components/Statistic"

const MintNFT = () => {
  const navigate = useNavigate()
  const { isMobile, isPortrait } = useCheckViewport()
  const [mintedAmount] = useState(640)

  // eslint-disable-next-line
  const [ineligible, setIneligible] = useState(false)

  const handleMint = () => {
    // TODO:
    // setIneligible(true)
    navigate("./flow")
  }

  return (
    <SectionWrapper
      dark
      sx={{
        pt: [0, "8rem"],
        pb: ["8rem", "16rem"],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8rem",
        "& .MuiTypography-root": {
          color: theme => theme.palette.primary.contrastText,
        },

        "@media (max-width: 1280px)": {
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
        },
        "@media (max-width: 1200px)": {
          gridTemplateColumns: "1fr",
          gap: "2.4rem",
          justifyItems: "center",
        },
      }}
    >
      <NFTCard sx={{ width: ["80%", "42rem"], py: ["1.2rem", "1.8rem"] }}></NFTCard>
      <Stack direction="column" spacing={isPortrait ? "2.4rem" : "4.8rem"} alignItems={isPortrait ? "center" : "flex-start"}>
        <Typography sx={{ fontSize: ["4rem", "7.8rem"], fontWeight: 600, lineHeight: ["5.6rem", "8.5rem"] }}>Scroll Origins</Typography>
        <Stack direction="row" spacing={isMobile ? "2.4rem" : "4.8rem"}>
          <Statistic label="NFTs Minted">{mintedAmount}</Statistic>
          <Statistic label="Released">{dayjs(DEVELOPER_NFT_PHRASES.Starts).format("MMM D, YYYY")}</Statistic>
        </Stack>
        {ineligible ? (
          <Alert type="multiline" severity="error" sx={{ width: ["100%", "47.5rem"] }}>
            Selected Wallet is not eligible to mint because you didn’t deploy a project within 45 days of Genesis Block
          </Alert>
        ) : (
          <Button color="primary" onClick={handleMint}>
            Mint now
          </Button>
        )}
      </Stack>
    </SectionWrapper>
  )
}

export default MintNFT
