import dayjs from "dayjs"
import { useState } from "react"

import { Stack, Typography } from "@mui/material"

import SectionWrapper from "@/components/SectionWrapper"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import NFTCard from "../../components/NFTCard"
import Statistic from "../../components/Statistic"

const MintNFT = () => {
  const { isMobile, isPortrait } = useCheckViewport()
  const [mintedAmount] = useState(640)

  return (
    <SectionWrapper
      dark
      full
      sx={{
        pt: "7.8rem",
        pb: ["8rem", "18.4rem"],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8rem",
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
      <NFTCard sx={{ width: ["80%", "42rem"] }}></NFTCard>
      <Stack direction="column" spacing={isPortrait ? "2.4rem" : "4.8rem"} alignItems={isPortrait ? "center" : "flex-start"}>
        <Typography sx={{ fontSize: ["4rem", "7.8rem"], fontWeight: 600, maxWidth: ["auto", "61rem"], lineHeight: ["5.6rem", "8.5rem"] }}>
          You have minted a Scroll Origin NFT!
        </Typography>
        <Stack direction="row" spacing={isMobile ? "2.4rem" : "4.8rem"}>
          <Statistic label="NFTs Minted">{mintedAmount}</Statistic>
          <Statistic label="Released">{dayjs(DEVELOPER_NFT_PHRASES.Starts).format("MMM D, YYYY")}</Statistic>
        </Stack>
      </Stack>
    </SectionWrapper>
  )
}

export default MintNFT
