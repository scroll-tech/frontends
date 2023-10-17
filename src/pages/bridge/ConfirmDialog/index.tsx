import { useEffect, useMemo, useState } from "react"

import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import FormControlLabel from "@mui/material/FormControlLabel"
import { styled } from "@mui/system"

import Link from "@/components/Link"
import { NETWORKS } from "@/constants/networks"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "60rem",
    padding: "1rem 2.4rem 2.4rem 1rem",
  },
}))

const StyledLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "underline",
  "&:hover": {
    opacity: 0.85,
  },
}))

const ConfirmDialog = ({ open, setOpen, send }) => {
  const [checkbox1Selected, setCheckbox1Selected] = useState<boolean>(false)
  const [checkbox2Selected, setCheckbox2Selected] = useState<boolean>(false)

  const selectedAll = useMemo(() => {
    return checkbox1Selected && checkbox2Selected
  }, [checkbox1Selected, checkbox2Selected])

  useEffect(() => {
    if (!open) {
      setCheckbox1Selected(false)
      setCheckbox2Selected(false)
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSendTransaction = () => {
    setOpen(false)
    send()
  }

  return (
    <StyledDialog maxWidth={false} open={open}>
      <DialogTitle sx={{ fontSize: "2.4rem", mb: "2rem", fontWeight: 600 }}>Move funds to {NETWORKS[0].name}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: "2rem", fontWeight: 500 }}>
          <StyledLink external href="/bridge#end" underline="always">
            What’s happening with my transaction?
          </StyledLink>
        </DialogContentText>
        <FormControlLabel
          sx={{ mb: 2 }}
          control={<Checkbox size="medium" checked={checkbox1Selected} onChange={() => setCheckbox1Selected(!checkbox1Selected)} />}
          label={
            <DialogContentText sx={{ fontSize: "1.4rem", lineHeight: "2rem", cursor: "pointer" }}>
              I understand that it will take 1 hour before I can claim my funds on {NETWORKS[0].name}
            </DialogContentText>
          }
        />
        <FormControlLabel
          sx={{ mb: 2 }}
          control={<Checkbox checked={checkbox2Selected} onChange={() => setCheckbox2Selected(!checkbox2Selected)} />}
          label={
            <DialogContentText sx={{ fontSize: "1.4rem", lineHeight: "2rem", cursor: "pointer" }}>
              I understand that after claiming my funds, I’ll have to send another transaction on L1 and pay another L1 fee
            </DialogContentText>
          }
        />
      </DialogContent>
      <DialogActions sx={{ transform: "scale(0.85)", transformOrigin: "right bottom" }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" variant="contained" disabled={!selectedAll} onClick={handleSendTransaction}>
          Continue
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default ConfirmDialog
