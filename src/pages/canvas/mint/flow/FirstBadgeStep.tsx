import Img from "react-cool-img"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETHEREUM_YEAR_BADGE } from "@/constants/badges"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import useSnackbar from "@/hooks/useSnackbar"
import { checkBadgeEligibility, mintBadge } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { isUserRejected, truncateAddress } from "@/utils"

import StepWrapper from "./StepWrapper"

const FirstBadgeStep = props => {
  const { provider, walletCurrentAddress } = useRainbowContext()
  const { isFirstBadgeMinting, changeIsFirstBadgeMinting, changeMintFlowVisible, queryVisibleBadges } = useCanvasStore()
  const alertWarning = useSnackbar()

  const isEligible = useAsyncMemo(async () => {
    const eligibility = await checkBadgeEligibility(provider, walletCurrentAddress, ETHEREUM_YEAR_BADGE)
    return eligibility
  }, [walletCurrentAddress, provider])

  const handleMintBadge = async () => {
    changeIsFirstBadgeMinting(true)
    try {
      const result = await mintBadge(provider, walletCurrentAddress, ETHEREUM_YEAR_BADGE)
      if (result) {
        changeMintFlowVisible(false)
        queryVisibleBadges(provider, walletCurrentAddress)
      }
    } catch (error) {
      if (!isUserRejected(error)) {
        alertWarning("Failed to mint Ethereum Year Badge")
      }
    } finally {
      changeIsFirstBadgeMinting(false)
    }
  }

  const handleViewMyCanvas = () => {
    changeMintFlowVisible(false)
  }

  return (
    <StepWrapper
      title="Mint your first badge"
      description={<>A badge is an attestation of status or achievement, permanently recorded on your Canvas.</>}
      action={
        <Stack direction="column" gap="2.4rem" alignItems="center">
          <Button color="primary" width="28.2rem" gloomy={!isEligible} loading={isFirstBadgeMinting} onClick={handleMintBadge}>
            {isFirstBadgeMinting ? "Minting badge" : "Mint badge"}
          </Button>
          <TextButton underline="always" sx={{ color: "#A0A0A0 !important", fontSize: "2rem", lineHeight: "3.5rem" }} onClick={handleViewMyCanvas}>
            Skip and go to my Canvas
          </TextButton>
        </Stack>
      }
      sx={{ mt: "4.6rem", mb: "8.8rem", textAlign: "center" }}
    >
      <Box sx={{ width: "20rem", mb: "1.6rem", display: "inline-block" }}>
        <Img src={ETHEREUM_YEAR_BADGE.image} placeholder="/imgs/canvas/badgePlaceholder.svg" alt="Ethereum Year"></Img>
      </Box>
      <Typography sx={{ fontSize: "2.4rem", lineHeight: "3.6rem", fontWeight: 600 }}>{ETHEREUM_YEAR_BADGE.name}</Typography>
      {!isEligible ? (
        <>
          <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", maxWidth: "66rem" }}>
            Your wallet ({truncateAddress(walletCurrentAddress as string)})’s first transaction on Ethereum was during the year 2024. You are eligible
            to mint a “Badge” to attest your past achievement on Scroll Canvas
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", maxWidth: "64.3rem" }}>
            Your wallet ({truncateAddress(walletCurrentAddress as string)}) has no transaction on Ethereum
          </Typography>
        </>
      )}
    </StepWrapper>
  )
}

export default FirstBadgeStep
