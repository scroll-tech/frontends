import Img from "react-cool-img"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ValidSvg } from "@/assets/svgs/canvas/check.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/canvas/circle-warning.svg"
import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETHEREUM_YEAR_BADGE } from "@/constants/badges"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import useSnackbar from "@/hooks/useSnackbar"
import { checkBadgeEligibility, mintBadge } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { isUserRejected } from "@/utils"

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
      description={
        <>
          A badge is an attestation of status or achievement, permanently recorded on your Canvas.<br></br>
          Mint your first badge, showing off the age of your Ethereum address.
        </>
      }
      action={
        <Stack direction="column" gap="2.4rem" alignItems="center">
          <Button color="primary" width="28.2rem" gloomy={!isEligible} loading={isFirstBadgeMinting} onClick={handleMintBadge}>
            {isFirstBadgeMinting ? "Minting badge" : "Mint badge"}
          </Button>
          <Stack direction="row" gap="0.8rem" alignItems="center">
            {isEligible ? (
              <>
                <SvgIcon sx={{ color: "#85E0D1", fontSize: "2.4rem" }} component={ValidSvg} inheritViewBox></SvgIcon>
                <Typography sx={{ color: "#85E0D1 !important", fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 500 }}>
                  You are eligible to mint the badge
                </Typography>
              </>
            ) : (
              <>
                <SvgIcon sx={{ color: "primary.main", fontSize: "2.4rem" }} component={WarningSvg} inheritViewBox></SvgIcon>
                <Typography sx={{ color: "#FF684B !important", fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 500 }}>
                  Selected account is not eligible to mint the badge yet.
                </Typography>
              </>
            )}
          </Stack>

          <TextButton underline="always" sx={{ color: "#A0A0A0 !important", fontSize: "2rem", lineHeight: "3.5rem" }} onClick={handleViewMyCanvas}>
            Skip and go to my Canvas
          </TextButton>
        </Stack>
      }
      sx={{ mt: "7.2rem", mb: "11rem" }}
    >
      <Box sx={{ width: "20rem", mb: "0.8rem" }}>
        <Img src={ETHEREUM_YEAR_BADGE.image} placeholder="/imgs/canvas/badgePlaceholder.svg" alt="Ethereum Year"></Img>
      </Box>
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600 }}>{ETHEREUM_YEAR_BADGE.name}</Typography>
    </StepWrapper>
  )
}

export default FirstBadgeStep
