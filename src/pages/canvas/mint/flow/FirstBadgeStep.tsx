import Img from "react-cool-img"
import { useNavigate } from "react-router-dom"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { FIRST_BADGE } from "@/constants/canvas"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { mintBadge } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"

import StepWrapper from "./StepWrapper"

const FirstBadgeStep = props => {
  const navigate = useNavigate()
  const { provider, walletCurrentAddress } = useRainbowContext()
  const { isFirstBadgeMinting, changeIsFirstBadgeMinting, changeMintFlowVisible } = useCanvasStore()
  const handleMintBadge = async () => {
    changeIsFirstBadgeMinting(true)
    // const result = await testAsyncFunc("0x11cfb299dda2ae8b1fccf9a055394de9a7f953e8b8f115295dc0f2325e8b2130")
    const result = await mintBadge(provider, walletCurrentAddress, FIRST_BADGE.nftAddress, FIRST_BADGE.nftAbi, FIRST_BADGE.badgeContract)
    if (result === false) {
      console.log("mint Ethereum Year Badge failed", result)
    } else {
      navigate(`/scroll-canvas/badge/${result}`)
      setTimeout(() => {
        changeMintFlowVisible(false)
      }, 3e2)
    }
    changeIsFirstBadgeMinting(false)
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
        <Stack direction="row" gap="1.6rem">
          <Button color="secondary" onClick={handleViewMyCanvas}>
            View my Canvas
          </Button>
          <Button color="primary" loading={isFirstBadgeMinting} onClick={handleMintBadge}>
            {isFirstBadgeMinting ? "Minting badge" : "Mint badge"}
          </Button>
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
