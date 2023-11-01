import dayjs from "dayjs"
import { useEffect, useState } from "react"

import { Stack, Typography } from "@mui/material"

import SectionWrapper from "@/components/SectionWrapper"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import NFTCard from "../../components/NFTCard"
import Statistic from "../../components/Statistic"

const MintNFT = () => {
  const { isMobile, isPortrait, isDesktop } = useCheckViewport()
  const [mintedAmount] = useState(640)

  useEffect(() => {
    // TODO: if has NFT, then display
  }, [])

  return (
    <SectionWrapper
      dark
      sx={{
        pt: ["2.4rem", "3.2rem", "7.8rem"],
        pb: ["8rem", "18.4rem"],
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
      <NFTCard sx={{ width: ["80%", "42rem"] }}></NFTCard>
      <Stack direction="column" spacing={isPortrait ? "2.4rem" : "4.8rem"} alignItems={isDesktop ? "flex-start" : "center"}>
        <Typography
          sx={{
            fontSize: ["4rem", "7.2rem"],
            fontWeight: 600,
            maxWidth: ["auto", "63rem"],
            lineHeight: ["5.6rem", "9.6rem"],
            textAlign: ["center", "center", "center", "left"],
          }}
        >
          You have successfully minted a Scroll Origins NFT!
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
