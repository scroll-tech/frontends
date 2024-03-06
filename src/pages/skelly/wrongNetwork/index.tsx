import { Box, Dialog, DialogContent, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as ConnectStickerSvg } from "@/assets/svgs/skelly/connect-sticker.svg"
import ScrollButton from "@/components/Button"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { switchNetwork } from "@/utils"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(50px)",
  "& .MuiDialog-paper": {
    background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
    backgroundColor: "#101010",
    width: "64rem",
    height: "67.4rem",
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

const WrongNetwork = () => {
  const { chainId, connect } = useRainbowContext()

  return (
    <StyledDialog maxWidth={false} open>
      <StyledDialogContent>
        <SvgIcon sx={{ fontSize: ["1.6rem", "18rem"], marginBottom: "4rem" }} component={ConnectStickerSvg} inheritViewBox></SvgIcon>
        <Typography sx={{ fontSize: "3.2rem", fontWeight: 600, lineHeight: "0.8rem", marginBottom: "3.2rem", color: "#fff", textAlign: "center" }}>
          Switch to Scroll Network
        </Typography>
        <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", color: "primary.contrastText", textAlign: "center", marginBottom: "1.2rem" }}>
          You can only view your Skelly on Scroll Network.
        </Typography>
        <ButtonContainer>
          {chainId ? (
            <StyledScrollButton color="primary" onClick={() => switchNetwork(CHAIN_ID.L2)}>
              Switch to Scroll
            </StyledScrollButton>
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

export default WrongNetwork
