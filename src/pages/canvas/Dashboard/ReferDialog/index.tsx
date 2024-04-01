import { Typography } from "@mui/material"
import { styled } from "@mui/system"

import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasStore from "@/stores/canvasStore"

import Coupon from "./coupon"
import Record from "./record"

const Title = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "4rem",
  fontWeight: 600,
  lineHeight: 1,
  marginBottom: "1.6rem",
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  color: "#EEEEEE",
  textAlign: "center",
  fontSize: "1.8rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2.8rem",
  marginBottom: "3.2rem",
}))

const ReferDialog = () => {
  const { referDialogVisible, changeReferDialog } = useCanvasStore()

  const handleClose = () => {
    changeReferDialog(false)
  }

  return (
    <Dialog open={referDialogVisible} onClose={handleClose}>
      <Title>Refer friends & you both earn</Title>
      <SubTitle>
        Your friend gets 50% off the mint fee <br />
        while you receive 0.0005 ETH per successful referral
      </SubTitle>
      <Record />
      <Coupon shouldFetch={referDialogVisible} />
    </Dialog>
  )
}

export default ReferDialog
