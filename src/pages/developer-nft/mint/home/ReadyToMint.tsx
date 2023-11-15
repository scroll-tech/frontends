import { useState } from "react"

import { Box, Stack, Typography } from "@mui/material"

import { fetchParamsByAddressURL } from "@/apis/nft"
import Alert from "@/components/Alert/NFTAlert"
import Button from "@/components/Button"
import RequestWarning from "@/components/RequestWarning"
import { ContractReleaseDate } from "@/constants"
import { CHAIN_ID, L2_NAME, SCROLL_ORIGINS_NFT } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useNFTStore from "@/stores/nftStore"
import { formatDate, switchNetwork } from "@/utils"

import NFTCard from "../../components/NFTCard"
import Statistic from "../../components/Statistic"
import MintFlowDialog from "./MintFlowDialog"

const MintHome = props => {
  const { total } = props
  const { chainId, connect, walletCurrentAddress } = useRainbowContext()

  const { isMobile, isPortrait, isLandscape } = useCheckViewport()
  const { isEligible, isMinting, changeIsEligible } = useNFTStore()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleCheckEligibility = async () => {
    setLoading(true)
    scrollRequest(fetchParamsByAddressURL(walletCurrentAddress))
      .then(data => {
        if (data.proof) {
          changeIsEligible(1)
        } else if (!data.error) {
          changeIsEligible(-1)
        } else {
          throw new Error("Netword error, try again later")
        }
      })
      .catch(e => {
        setErrorMessage(e.message.slice(0, 120))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderAction = () => {
    if (chainId === CHAIN_ID.L2) {
      return (
        <Button color="primary" loading={loading || isMinting} width={isMobile ? "23rem" : "28.2rem"} onClick={handleCheckEligibility}>
          {isMinting ? "Minting" : loading ? "Checking" : "Mint now"}
        </Button>
      )
    } else if (chainId) {
      return (
        <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={() => switchNetwork(CHAIN_ID.L2)}>
          Switch to {L2_NAME}
        </Button>
      )
    }
    return (
      <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={connect}>
        Connect wallet to mint
      </Button>
    )
  }

  const handleCloseFlow = () => {
    changeIsEligible(0)
  }

  const handleCloseWarning = () => {
    setErrorMessage("")
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8rem",
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
        <Typography sx={{ fontSize: ["4rem", "7.8rem"], fontWeight: 600, lineHeight: ["5.6rem", "8.5rem"] }}>{SCROLL_ORIGINS_NFT}</Typography>
        <Stack direction="row" spacing={isMobile ? "2.4rem" : "4.8rem"}>
          <Statistic label="Total NFTs minted">{total ? total.toString() : "-"}</Statistic>
          <Statistic label="NFTs released on">{formatDate(ContractReleaseDate)}</Statistic>
        </Stack>
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
            <Alert severity="error" sx={{ width: ["100%", "47.5rem"] }}>
              Selected account is not eligible to mint because you didn’t deploy a project within 60 days of Genesis Block{" "}
            </Alert>
          )}
        </Box>
      </Stack>
      <MintFlowDialog open={isEligible === 1} minting={isMinting} onClose={handleCloseFlow}></MintFlowDialog>
      <RequestWarning open={!!errorMessage} onClose={handleCloseWarning}>
        {errorMessage}
      </RequestWarning>
    </Box>
  )
}

export default MintHome
