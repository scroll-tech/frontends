import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Dialog, DialogContent, DialogTitle, IconButton, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { ReactComponent as InsufficientSvg } from "@/assets/svgs/skelly/insufficient.svg"
import ScrollButton from "@/components/Button"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSkellyStore from "@/stores/skellyStore"
import { switchNetwork } from "@/utils"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(50px)",
  "& .MuiDialog-paper": {
    background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
    backgroundColor: "#101010",
    width: "64rem",
    height: "56rem",
    padding: "3.2rem",
    backdropFilter: "blur(50px)",
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "0",
}))

const StyledScrollButton = styled(ScrollButton)(({ theme }) => ({
  // width: "24rem",
  height: "5.4rem",
  fontSize: "2rem",
  fontWeight: 600,
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1.6rem",
  alignItems: "center",
  marginTop: "3.2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2rem",
  },
}))

const InsufficientDialog = ({ open, onClose }) => {
  const { chainId, connect } = useRainbowContext()
  const navigate = useNavigate()
  const { changeProfileName, changeMintFlowVisible } = useSkellyStore()

  const isWrongNetwork = useMemo(() => {
    return chainId !== CHAIN_ID.L2
  }, [chainId])

  const handleGoToBridge = () => {
    changeProfileName("")
    changeMintFlowVisible(false)
    navigate("/bridge")
  }

  return (
    <StyledDialog maxWidth={false} open={open}>
      <DialogTitle
        sx={{
          m: 0,
          p: 0,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={onClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <SvgIcon sx={{ fontSize: ["1.6rem", "18rem"], marginBottom: "4rem" }} component={InsufficientSvg} inheritViewBox></SvgIcon>
        <Typography sx={{ fontSize: "3.2rem", fontWeight: 600, marginBottom: "0.8rem", color: "#fff", textAlign: "center" }}>
          Oops! Not enough ETH <br /> to pay for transaction fees
        </Typography>
        <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", color: "primary.contrastText", textAlign: "center", marginBottom: "2.8rem" }}>
          Bridge more ETH to your wallet
        </Typography>
        <ButtonContainer>
          {chainId ? (
            isWrongNetwork ? (
              <StyledScrollButton color="primary" onClick={() => switchNetwork(CHAIN_ID.L2)}>
                Switch to Scroll
              </StyledScrollButton>
            ) : (
              <StyledScrollButton color="primary" onClick={handleGoToBridge}>
                Bridge into Scroll
              </StyledScrollButton>
            )
          ) : (
            <StyledScrollButton color="primary" onClick={connect}>
              Connect Wallet
            </StyledScrollButton>
          )}
        </ButtonContainer>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default InsufficientDialog
