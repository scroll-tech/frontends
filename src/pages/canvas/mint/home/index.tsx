import { useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Button from "@/components/Button"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useCanvasStore from "@/stores/canvasStore"
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
  paddingTop: "5.5rem",
  paddingBottom: "6rem",
  backgroundColor: "#101010",
  [theme.breakpoints.down("sm")]: {
    height: "calc(var(--vh, 1vh) * 100 - 6.2rem - 9.6rem)",
    minHeight: "unset",
    padding: "0 1rem",
    overflowY: "auto",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  fontSize: "4rem",
  fontWeight: 600,
  lineHeight: "5.6rem",
  marginBottom: "0.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.4rem",
    lineHeight: "3.2rem",
  },
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  fontSize: "1.8rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
  },
}))

const StickyBox = styled(Box)(({ theme }) => ({
  position: "sticky",
  bottom: "0.8rem",
  zIndex: 1,
  backgroundColor: "#101010",
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    padding: "2.4rem 2rem",
    bottom: 0,
    width: "100%",
    "& > div": {
      width: "100%",
    },
  },
}))

const MintHome = props => {
  const { code } = props
  const { isMobile } = useCheckViewport()
  const { connect, walletCurrentAddress, chainId } = useRainbowContext()
  const { changeProfileName, mintFlowVisible, changeMintFlowVisible } = useCanvasStore()

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
      <Title>Mint your Scroll Canvas</Title>
      <SubTitle>Map your journey and earn badges across the ecosystem.</SubTitle>
      <Box sx={{ height: ["min-content", "28rem"], width: ["100%", "auto"], mt: "0.8rem", mb: ["2.4rem", "1.6rem"] }}>
        <img src="/imgs/canvas/heartbeat.webp" alt="heartbeat" style={{ height: isMobile ? "unset" : "100%" }}></img>
      </Box>
      <ReferralCodeInput code={code} isChecking={isChecking} setIsChecking={setIsChecking} codeStatus={codeStatus} setCodeStatus={setCodeStatus} />
      <StickyBox>{renderAction()}</StickyBox>
      <MintFlowDialog open={mintFlowVisible} onClose={handleCloseFlow}></MintFlowDialog>
    </Container>
  )
}

export default MintHome
