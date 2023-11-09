import { useEffect, useState } from "react"

// import { useNavigate } from "react-router-dom"
import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import SectionWrapper from "@/components/SectionWrapper"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import { formatDate } from "@/utils"

import NFTImage from "../../components/NFTCard/NFTImage"
import Statistic from "../../components/Statistic"
import myNFT from "./myNFT"

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, max-content)",
  rowGap: "2.4rem",
  columnGap: "4.8rem",
  [theme.breakpoints.down("sm")]: {
    columnGap: "2.4rem",
  },
}))

const MintNFT = () => {
  // const navigate = useNavigate()

  const { isLandscape } = useCheckViewport()
  const [mintedAmount] = useState(640)
  const [rarity] = useState("20%")

  useEffect(() => {
    // TODO: if has NFT, then display, if not, navigate back to /mint
    // navigate("/developer-nft/mint")
  }, [])

  return (
    <SectionWrapper
      dark
      sx={{
        pt: ["2.4rem", "3.2rem", "7.8rem"],
        pb: ["8rem", "32rem"],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.6rem",
        "& .MuiTypography-root": {
          color: theme => theme.palette.primary.contrastText,
        },
        "@media (max-width: 1280px)": {
          gap: 0,
        },
        "@media (max-width: 1200px)": {
          display: "grid",
          gridTemplateColumns: "minmax(min-content, 1fr) 1fr",
          justifyItems: "center",
        },
        "@media (max-width: 900px)": {
          gridTemplateColumns: "1fr",
          justifyItems: "center",
        },
      }}
    >
      <NFTImage sx={{ width: ["100%", "44rem", "44rem", "52rem"] }} src={myNFT}></NFTImage>
      <Stack direction="column" sx={{ gap: ["1.6rem", "2.4rem", "4.8rem"] }} alignItems={isLandscape ? "flex-start" : "center"}>
        <Typography
          sx={{
            fontSize: ["4rem", "7.2rem"],
            fontWeight: 600,
            maxWidth: ["auto", "63rem"],
            lineHeight: ["5.6rem", "9.6rem"],
            textAlign: ["center", "center", "left", "left"],
          }}
        >
          You have successfully minted a Scroll Origins NFT!
        </Typography>
        <Grid>
          <Statistic label="NFT rarity">{rarity}</Statistic>
          <Statistic label="You minted on">{formatDate(DEVELOPER_NFT_PHRASES.Starts)}</Statistic>
          <Statistic label="Total NFTs minted">{mintedAmount}</Statistic>
          <Statistic label="Released on">{formatDate(DEVELOPER_NFT_PHRASES.Ends)}</Statistic>
        </Grid>
      </Stack>
    </SectionWrapper>
  )
}

export default MintNFT
