import { useState } from "react"

import { Box, Button, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import Alert from "@/components/Alert/NFTAlert"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import RequestWarning from "@/components/RequestWarning"
import { ANNOUNCING_SCROLL_ORIGINS_NFT, ContractReleaseDate, DESIGNING_SCROLL_ORIGINS } from "@/constants"
import { CHAIN_ID, L2_NAME, SCROLL_ORIGINS_NFT } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import BadgeDetailDialog from "@/pages/skelly/dashboard/BadgeDetailDialog"
import useNFTStore from "@/stores/nftStore"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"
import { formatDate, switchNetwork } from "@/utils"

import NFTCard from "../components/NFTCard"
import Statistic from "../components/Statistic"

// import MintFlowDialog from "./MintFlowDialog"

const CustomLink = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontSize: "inherit",
  textUnderlineOffset: "2px",
  textDecorationThickness: "1px",
  fontWeight: 700,
}))

const InfoBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
}))

const UpgradedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#FF6F43",
  width: "33.8rem",
  height: "4.8rem",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  fontSize: "1.6rem",
  fontWeight: 600,
  borderRadius: "0.8rem",
}))

const UpgradedButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  lineHeight: "2.4rem",
  height: "3.2rem",
  width: "12.4rem",
  border: "1px solid #Fff",
  padding: "0",
  marginLeft: "1.6rem",
}))

const MintHome = props => {
  const { chainId, connect } = useRainbowContext()

  const { isMobile, isPortrait, isLandscape } = useCheckViewport()
  const { isEligible, isMinting } = useNFTStore()
  const [loading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { changeBadgeDetailDialog } = useSkellyStore()

  const renderAction = () => {
    if (chainId === CHAIN_ID.L2) {
      return (
        <ScrollButton color="primary" loading={loading || isMinting} width={isMobile ? "23rem" : "28.2rem"}>
          View on Scrollscan
        </ScrollButton>
      )
    } else if (chainId) {
      return (
        <ScrollButton color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={() => switchNetwork(CHAIN_ID.L2)}>
          Switch to {L2_NAME}
        </ScrollButton>
      )
    }
    return (
      <ScrollButton color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={connect}>
        Connect wallet to upgrade
      </ScrollButton>
    )
  }

  const handleCloseWarning = () => {
    setErrorMessage("")
  }

  const handleMint = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.MINTED)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#101010",
        gap: "8rem",
        minHeight: "92vh",
        "& .MuiTypography-root": {
          color: theme => theme.palette.primary.contrastText,
        },
        "@media (max-width: 1280px)": {
          gap: "2rem",
          display: "grid",
          gridTemplateColumns: "minmax(min-content, 1fr) 1fr",
          justifyItems: "center",
        },

        "@media (max-width: 900px)": {
          gridTemplateColumns: "1fr",
        },
        "@media (max-width: 600px)": {
          gap: "2.4rem",
        },
      }}
    >
      <NFTCard sx={{ width: ["80%", "42.5rem", "36rem", "42.5rem"] }}></NFTCard>
      <Stack direction="column" spacing={isPortrait ? "2.4rem" : "4.8rem"} alignItems={isLandscape ? "flex-start" : "center"}>
        <Box sx={{ textAlign: ["center", "center", "left"] }}>
          <UpgradedBox>
            UPGRADE AVAILABLE
            <UpgradedButton variant="contained" color="primary" onClick={handleMint}>
              Upgrade now
            </UpgradedButton>
          </UpgradedBox>
          <Typography sx={{ fontSize: ["4rem", "5.6rem"], fontWeight: 600, lineHeight: ["5.6rem", "9.6rem"] }}>Scroll Origins NFT Badge</Typography>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], maxWidth: ["100%", "56rem"] }}>
            <CustomLink href={ANNOUNCING_SCROLL_ORIGINS_NFT} underline="always" external>
              Scroll Origins
            </CustomLink>{" "}
            is a{" "}
            <CustomLink href={DESIGNING_SCROLL_ORIGINS} underline="always" external>
              specially designed NFT
            </CustomLink>{" "}
            program to celebrate alongside early developers building on Scroll within 60 days of Genesis Block (Before December 9, 2023 10:59PM GMT).
          </Typography>
        </Box>

        <InfoBox gap={isMobile ? "2.4rem" : "4.8rem"}>
          <Statistic label="Owner">@vitalik</Statistic>
          <Statistic label="Issued by">Scroll</Statistic>
          <Statistic label="Minted on">{formatDate(ContractReleaseDate)}</Statistic>
          <Statistic label="Badge Rarity">Epic</Statistic>
        </InfoBox>
        <Box
          sx={{
            height: "8rem",
            "@media (max-width: 1200px) and (min-width: 600px)": {
              marginTop: "4.8rem !important",
            },
          }}
        >
          {!isEligible && <>{renderAction()}</>}
          {isEligible === -1 && (
            <Alert severity="error" sx={{ width: ["100%", "42.8rem"] }}>
              The wallet address is not eligible. Please reach out to Scroll Discord, ‘scroll-origins-support,’ if you have any questions about{" "}
              {SCROLL_ORIGINS_NFT}.
            </Alert>
          )}
        </Box>
      </Stack>
      {/* <MintFlowDialog open={isEligible === 1} minting={isMinting} onClose={handleCloseFlow}></MintFlowDialog> */}
      <RequestWarning open={!!errorMessage} onClose={handleCloseWarning}>
        {errorMessage}
      </RequestWarning>
      <BadgeDetailDialog />
    </Box>
  )
}

export default MintHome
