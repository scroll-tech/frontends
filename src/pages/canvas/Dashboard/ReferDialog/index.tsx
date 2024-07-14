import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasStore from "@/stores/canvasStore"

import Coupon from "./coupon"
import Record from "./record"

const Title = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "3.2rem",
  fontWeight: 600,
  lineHeight: 1,
  marginBottom: "1.6rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
    lineHeight: "3.2rem",
    marginBottom: "0.8rem",
  },
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  color: "#EEEEEE",
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: 400,
  lineHeight: "2.8rem",
  marginBottom: "3.2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    marginBottom: "2.4rem",
  },
}))

const ReferDialog = () => {
  const { referDialogVisible, changeReferDialog } = useCanvasStore()

  const handleClose = () => {
    changeReferDialog(false)
  }

  return (
    <Dialog open={referDialogVisible} onClose={handleClose}>
      <Box sx={{ width: ["100%", "auto"], height: ["80%", "auto"] }}>
        <Title>Invite friends & you both earn</Title>
        <SubTitle>
          Your friend gets 50% off the Canvas mint fee <br></br> and you receive 0.0005 ETH per successful referral
        </SubTitle>
        <Record />
        <Coupon shouldFetch={referDialogVisible} />
      </Box>
    </Dialog>
  )
}

export default ReferDialog
