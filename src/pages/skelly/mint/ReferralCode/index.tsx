import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Button from "@/components/Button"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"
import { switchNetwork } from "@/utils"

import ReferralCodeInput from "./ReferralCodeInput"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 6.5rem)",
  padding: "7.8rem 0",
  backgroundColor: "#101010",
  [theme.breakpoints.down("sm")]: {
    minHeight: "calc(100vh - 6.2rem)",
    padding: "0 1rem",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "5.6rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "7.2rem",
  marginBottom: "1.2rem",
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "2rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "3.2rem",
}))

const ReferralCode = props => {
  const { code } = props
  const navigate = useNavigate()
  const { isMobile } = useCheckViewport()
  const { connect, walletCurrentAddress, chainId } = useRainbowContext()
  const { changeMintStep, referralCode } = useSkellyStore()
  const [isChecking, setIsChecking] = useState(false)

  const handleContinue = async () => {
    changeMintStep(MintStep.NAME)

    if (code) {
      navigate("/scroll-skelly/mint")
    }
  }

  const renderAction = () => {
    if (!walletCurrentAddress) {
      return (
        <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={connect}>
          Connect wallet
        </Button>
      )
    } else if (chainId !== CHAIN_ID.L2) {
      return (
        <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={() => switchNetwork(CHAIN_ID.L2)}>
          Switch to Scroll
        </Button>
      )
    }
    return (
      <Button color="primary" gloomy={isChecking || (code && !referralCode)} width={isMobile ? "23rem" : "28.2rem"} onClick={handleContinue}>
        Continue
      </Button>
    )
  }

  return (
    <Container>
      <Title>Mint your Scroll Skelly</Title>
      <SubTitle>Earn badges of attestations across the ecosystem.</SubTitle>
      <Box sx={{ width: "66.5rem", height: "29.8rem", mt: "4.8rem", mb: "3rem" }}>
        <img src="/imgs/skelly/heartbeat.webp" alt="heartbeat"></img>
      </Box>
      <ReferralCodeInput code={code} isChecking={isChecking} setIsChecking={setIsChecking} />

      {renderAction()}
    </Container>
  )
}

export default ReferralCode
