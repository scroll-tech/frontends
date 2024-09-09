import { Box, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Dialog from "@/app/canvas/components/Dialog"
import ConnectStickerSvg from "@/assets/svgs/canvas/connect-sticker.svg"
import ScrollButton from "@/components/Button"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { switchNetwork } from "@/utils"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
    backdropFilter: "blur(50px)",

    [theme.breakpoints.up("sm")]: {
      width: "64rem",
      height: "56rem",
    },
  },
}))

const StyledDialogContent = styled(Box)(() => ({
  height: "100%",
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

const WrongNetwork = () => {
  const { walletCurrentAddress, connect } = useRainbowContext()

  return (
    <StyledDialog open noClose>
      <StyledDialogContent>
        <SvgIcon
          sx={{ fontSize: ["12rem", "18rem"], height: "auto", marginBottom: ["1.6rem", "4rem"] }}
          component={ConnectStickerSvg}
          inheritViewBox
        ></SvgIcon>
        <Typography
          sx={{
            fontSize: ["2rem", "3.2rem"],
            fontWeight: 600,
            lineHeight: ["3.2rem", "4.8rem"],
            marginBottom: "0.8rem",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Switch to Scroll Network
        </Typography>
        <Typography
          sx={{
            fontSize: ["1.6rem", "1.8rem"],
            lineHeight: ["2.4rem", "2.8rem"],
            color: "primary.contrastText",
            textAlign: "center",
          }}
        >
          You can only view your Canvas on Scroll Network.
        </Typography>
        <ButtonContainer>
          {!walletCurrentAddress ? (
            <ScrollButton color="primary" onClick={connect}>
              Connect Wallet
            </ScrollButton>
          ) : (
            <ScrollButton color="primary" onClick={() => switchNetwork(CHAIN_ID.L2)}>
              Switch to Scroll
            </ScrollButton>
          )}
        </ButtonContainer>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default WrongNetwork
