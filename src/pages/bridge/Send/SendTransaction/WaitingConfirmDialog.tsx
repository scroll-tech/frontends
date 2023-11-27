import { useMemo } from "react"

import { Avatar, Typography } from "@mui/material"

import useBridgeStore from "@/stores/bridgeStore"

import BridgeDialog from "../../components/Dialog"

const ApprovalDialog = props => {
  const { token = {}, amount, open, onClose } = props

  const { txType } = useBridgeStore()

  const txTyping = useMemo(() => {
    if (txType === "Deposit") {
      return "depositing"
    }
    return "withdrawing"
  }, [txType])

  return (
    <BridgeDialog open={open} onClose={onClose}>
      <Avatar sx={{ width: "6.4rem", height: "6.4rem" }} src={token.logoURI}></Avatar>
      <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.2rem", fontWeight: 500 }}>WaitingConfirmDialog</Typography>
      <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.2rem", fontWeight: 600, textAlign: "center" }}>
        Confirm {txTyping} {amount}
        {token.symbol} in your wallet
      </Typography>
    </BridgeDialog>
  )
}

export default ApprovalDialog
