import { useRef } from "react"
import Img from "react-cool-img"

import { Box, Stack, Typography } from "@mui/material"

import { EthereumYearBadgeURL, checkBadgeEligibilityURL } from "@/apis/canvas"
import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETHEREUM_YEAR_BADGE } from "@/constants/badges"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import useSnackbar from "@/hooks/useSnackbar"
import { mintBadge } from "@/services/canvasService"
// import {testAsyncFunc} from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { isUserRejected, truncateAddress } from "@/utils"

import StepWrapper from "./StepWrapper"

const FirstBadgeStep = props => {
  const { provider, walletCurrentAddress } = useRainbowContext()

  const {
    isFirstBadgeMinting,
    changeIsFirstBadgeMinting,
    changeMintFlowVisible,
    recordFirstBadgePosition,
    changeBadgeAnimationVisible,
    queryFirstMintUsername,
  } = useCanvasStore()
  const alertWarning = useSnackbar()

  const badgeChecked = useAsyncMemo(async () => {
    const data = await scrollRequest(checkBadgeEligibilityURL(ETHEREUM_YEAR_BADGE.baseUrl, walletCurrentAddress, ETHEREUM_YEAR_BADGE.badgeContract))
    return data
  }, [provider, walletCurrentAddress])
  const firstBadgeRef = useRef<HTMLElement>()

  const renderTip = () => {
    if (!badgeChecked) {
      return "Checking"
    } else if (badgeChecked.eligibility) {
      return `Your wallet (${truncateAddress(walletCurrentAddress as string)})’s first transaction on Ethereum was during the year ${
        badgeChecked.year
      }. You are eligible
      to mint a “Badge” to attest your past achievement on Scroll Canvas`
    }
    return `Your wallet (${truncateAddress(walletCurrentAddress as string)}) has no transaction on Ethereum`
  }

  const handleMintBadge = async () => {
    changeIsFirstBadgeMinting(true)

    try {
      const result = await mintBadge(provider, walletCurrentAddress, ETHEREUM_YEAR_BADGE)
      // defaultBadge.id

      // const result = await testAsyncFunc("0x11cfb299dda2ae8b1fccf9a055394de9a7f953e8b8f115295dc0f2325e8b2130")
      if (result) {
        const { left, top } = firstBadgeRef.current!.getBoundingClientRect()
        recordFirstBadgePosition({
          left,
          top,
          id: result,
          image: EthereumYearBadgeURL(badgeChecked.year),
          badgeContract: ETHEREUM_YEAR_BADGE.badgeContract,
        })
        // recordFirstBadgePosition({ left, top, id: result, image: EthereumYearBadgeURL("2020") })
        changeBadgeAnimationVisible(true)
        changeMintFlowVisible(false)
      }
    } catch (error) {
      if (!isUserRejected(error)) {
        alertWarning("Failed to mint Ethereum Year Badge")
      }
    } finally {
      changeIsFirstBadgeMinting(false)
    }
  }

  const handleViewMyCanvas = async () => {
    const signer = await provider?.getSigner(0)
    queryFirstMintUsername(signer)
    changeMintFlowVisible(false)
  }

  return (
    <StepWrapper
      title="Mint your first badge"
      description={<>A badge is an attestation of status or achievement, permanently recorded on your Canvas.</>}
      action={
        <Stack direction="column" gap="2.4rem" alignItems="center">
          <Button color="primary" width="28.2rem" gloomy={!badgeChecked?.eligibility} loading={isFirstBadgeMinting} onClick={handleMintBadge}>
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
        {!badgeChecked ? (
          <Img style={{ borderRadius: "50%" }} src="/imgs/canvas/badgePlaceholder.svg" alt="Ethereum Year Badge"></Img>
        ) : (
          <Img
            style={{ borderRadius: "50%" }}
            ref={firstBadgeRef}
            src={badgeChecked?.code === 1 ? EthereumYearBadgeURL(badgeChecked.year) : ETHEREUM_YEAR_BADGE.image}
            placeholder="/imgs/canvas/badgePlaceholder.svg"
            alt={ETHEREUM_YEAR_BADGE.name}
          ></Img>
        )}
      </Box>
      <Typography sx={{ fontSize: "2.4rem", lineHeight: "3.6rem", fontWeight: 600 }}>{ETHEREUM_YEAR_BADGE.name}</Typography>
      <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", maxWidth: "66rem" }}>{renderTip()}</Typography>
    </StepWrapper>
  )
}

export default FirstBadgeStep
