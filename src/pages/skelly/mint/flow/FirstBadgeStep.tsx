import Img from "react-cool-img"
import { useNavigate } from "react-router-dom"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { FIRST_BADGE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { mintBadge } from "@/services/skellyService"
import useSkellyStore from "@/stores/skellyStore"

import StepWrapper from "./StepWrapper"

const FirstBadgeStep = props => {
  const navigate = useNavigate()
  const { provider, walletCurrentAddress } = useRainbowContext()
  const { isFirstBadgeMinting, changeIsFirstBadgeMinting } = useSkellyStore()
  const handleMintBadge = async () => {
    changeIsFirstBadgeMinting(true)
    const result = await mintBadge(provider, walletCurrentAddress, FIRST_BADGE.nftAddress, FIRST_BADGE.nftAbi, FIRST_BADGE.badgeContract)
    if (result === false) {
      console.log("mint Ethereum Year Badge failed", result)
    } else {
      navigate(`/scroll-skelly/badge/${result}`)
    }
    changeIsFirstBadgeMinting(false)
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
          <Button color="secondary" href="/scroll-skelly">
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
        <Img src={FIRST_BADGE.image} placeholder="/imgs/skelly/badgePlaceholder.svg" alt="Ethereum Year"></Img>
      </Box>
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600 }}>{FIRST_BADGE.name}</Typography>
    </StepWrapper>
  )
}

export default FirstBadgeStep
