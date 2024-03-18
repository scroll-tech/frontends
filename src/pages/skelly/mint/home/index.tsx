import { useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Button from "@/components/Button"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSkellyStore from "@/stores/skellyStore"
import { switchNetwork } from "@/utils"

import MintFlowDialog from "./MintFlowDialog"
import ReferralCodeInput, { CodeStatus } from "./ReferralCodeInput"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 6.5rem)",
  paddingTop: "6.4rem",
  paddingBottom: "7.2rem",
  backgroundColor: "#101010",
  [theme.breakpoints.down("sm")]: {
    minHeight: "calc(100vh - 6.2rem)",
    padding: "0 1rem",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  fontSize: "5.6rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "7.2rem",
  marginBottom: "0.8rem",
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  fontSize: "2rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "3.2rem",
}))

const StickyBox = styled(Box)(({ theme }) => ({
  position: "sticky",
  bottom: "0.8rem",
  zIndex: 1,
  backgroundColor: "#101010",
}))

const MintHome = props => {
  const { code } = props
  const { isMobile } = useCheckViewport()
  const { connect, walletCurrentAddress, chainId } = useRainbowContext()
  const { changeProfileName, mintFlowVisible, changeMintFlowVisible } = useSkellyStore()
  // const [mintFlowVisible, setMintFlowVisible] = useState(false)
  // TODO: optimize
  const [isChecking, setIsChecking] = useState(false)
  const [codeStatus, setCodeStatus] = useState(CodeStatus.UNKNOWN)

  const handleOpenMintFlow = () => {
    changeMintFlowVisible(true)
  }

  const handleCloseFlow = () => {
    changeProfileName("")
    changeMintFlowVisible(false)
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
      <Button
        color="primary"
        gloomy={isChecking || (code && codeStatus !== CodeStatus.VALID)}
        width={isMobile ? "23rem" : "28.2rem"}
        onClick={handleOpenMintFlow}
      >
        Continue
      </Button>
    )
  }

  return (
    <Container>
      <Title>Mint your Scroll Skelly</Title>
      <SubTitle>Earn badges of attestations across the ecosystem.</SubTitle>
      <Box sx={{ width: "66.5rem", height: "29.8rem", mt: "1.8rem", mb: "2rem" }}>
        <img src="/imgs/skelly/heartbeat.webp" alt="heartbeat"></img>
      </Box>
      <ReferralCodeInput code={code} isChecking={isChecking} setIsChecking={setIsChecking} codeStatus={codeStatus} setCodeStatus={setCodeStatus} />
      <StickyBox>{renderAction()}</StickyBox>
      <MintFlowDialog open={mintFlowVisible} onClose={handleCloseFlow}></MintFlowDialog>
    </Container>
  )
}

export default MintHome
