import { useRouter } from "next/navigation"
import { useMemo } from "react"

import { Box, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Dialog from "@/app/canvas/components/Dialog"
import InsufficientSvg from "@/assets/svgs/canvas/insufficient.svg"
import ScrollButton from "@/components/Button"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"
import { switchNetwork } from "@/utils"

const StyledDialogContent = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1.6rem",
  alignItems: "center",
  marginTop: "4rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2rem",
    marginTop: "1.6rem",
  },
}))

const InsufficientDialog = ({ open, onClose }) => {
  const { chainId, connect } = useRainbowContext()
  const router = useRouter()
  const { changeProfileName, changeMintFlowVisible } = useCanvasStore()

  const isWrongNetwork = useMemo(() => {
    return chainId !== CHAIN_ID.L2
  }, [chainId])

  const handleGoToBridge = () => {
    changeProfileName("")
    changeMintFlowVisible(false)
    router.push("/bridge")
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogContent>
        <SvgIcon sx={{ fontSize: ["12rem", "18rem"], marginBottom: ["1.6rem", "4rem"] }} component={InsufficientSvg} inheritViewBox></SvgIcon>
        <Typography
          sx={{
            fontSize: ["2rem", "3.2rem"],
            lineHeight: ["3.2rem", "4.8rem"],
            fontWeight: 600,
            marginBottom: "0.8rem",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Oops! Not enough ETH <br /> to pay for transaction fees
        </Typography>
        <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: "2.8rem", color: "primary.contrastText", textAlign: "center" }}>
          Bridge more ETH to your wallet
        </Typography>
        <ButtonContainer>
          {chainId ? (
            isWrongNetwork ? (
              <ScrollButton width="21.6rem" color="primary" onClick={() => switchNetwork(CHAIN_ID.L2)}>
                Switch to Scroll
              </ScrollButton>
            ) : (
              <ScrollButton width="21.6rem" color="primary" onClick={handleGoToBridge}>
                Bridge into Scroll
              </ScrollButton>
            )
          ) : (
            <ScrollButton width="21.6rem" color="primary" onClick={connect}>
              Connect Wallet
            </ScrollButton>
          )}
        </ButtonContainer>
      </StyledDialogContent>
    </Dialog>
  )
}

export default InsufficientDialog
