import Img from "react-cool-img"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { FIRST_BADGE } from "@/constants/canvas"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import { mintBadge } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { isUserRejected } from "@/utils"

import StepWrapper from "./StepWrapper"

const FirstBadgeStep = props => {
  const { provider, walletCurrentAddress } = useRainbowContext()
  const { isFirstBadgeMinting, changeIsFirstBadgeMinting, changeMintFlowVisible, queryVisibleBadges } = useCanvasStore()
  const alertWarning = useSnackbar()

  const handleMintBadge = async () => {
    changeIsFirstBadgeMinting(true)
    try {
      const result = await mintBadge(provider, walletCurrentAddress, FIRST_BADGE.nftAddress, FIRST_BADGE.nftAbi, FIRST_BADGE.badgeContract)
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
      description={
        <>
          A badge is an attestation of status or achievement, permanently recorded on your Canvas.<br></br>
          Mint your first badge, showing off the age of your Ethereum address.
        </>
      }
      action={
        <Stack direction="column" gap="2.4rem">
          <Button color="primary" width="28.2rem" loading={isFirstBadgeMinting} onClick={handleMintBadge}>
            {isFirstBadgeMinting ? "Minting badge" : "Mint badge"}
          </Button>
          <TextButton underline="always" sx={{ color: "#A0A0A0 !important", fontSize: "2rem", lineHeight: "3.5rem" }} onClick={handleViewMyCanvas}>
            Skip and go to my Canvas
          </TextButton>
        </Stack>
      }
      sx={{ mt: "7.2rem", mb: "11rem" }}
    >
      <Box sx={{ width: "20rem", mb: "0.8rem" }}>
        <Img src={FIRST_BADGE.image} placeholder="/imgs/canvas/badgePlaceholder.svg" alt="Ethereum Year"></Img>
      </Box>
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600 }}>{FIRST_BADGE.name}</Typography>
    </StepWrapper>
  )
}

export default FirstBadgeStep
