import { useEffect } from "react"

import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/bridge/close.svg"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore from "@/stores/skellyStore"

import GridDragDrop from "./GridDragDrop"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  //   width: "64rem",
  //   border-radius: 16px;
  // background: linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%);
  // backdrop-filter: blur(50px);
  borderRadius: "1.6rem",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(50px)",
  zIndex: 998,
  "& .MuiDialog-paper": {
    // backgroundColor: "transparent",
    background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
    maxWidth: "120rem",
    width: "100%",
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "3rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}))

const Avatar = styled(Box)(({ theme }) => ({
  width: "30rem",
  height: "30rem",
  borderRadius: "50%",
  margin: "0 14rem",
  backgroundImage:
    "linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://avatars.githubusercontent.com/u/387772?s=200&v=4')",
  backgroundBlendMode: "multiply",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#FFFFFF",
  fontSize: "3.2rem",
  fontWeight: 600,
  lineHeight: "4.4rem",
  marginBottom: "4.8rem",
  marginTop: "3rem",
  "& .MuiInputBase-input": {
    textAlign: "center",
  },
}))

const BadgesDialog = () => {
  const { badgesDialogVisible, changeBadgesDialog, sortedBadges } = useSkellyStore()
  const { setBadgesInstance, badgesInstance } = useSkellyContext()

  const handleClose = () => {
    changeBadgesDialog(false)
  }

  const handleSave = () => {
    console.log(badgesInstance)
    changeBadgesDialog(false)
    setBadgesInstance(sortedBadges)
  }
  //   const { classes } = useStyles()
  //   const { hisisible, changeHistoryVisible } = useBridgeStore()
  //   const { walletCurrentAddress } = useRainbowContext()
  //   const handleClose = () => {
  //     changeHistoryVisible(false)
  //   }
  //   const {
  //     txHistory: { refreshPageTransactions },
  //   } = useBridgeContext()

  //   useEffect(() => {
  //     if (historyVisible && walletCurrentAddress) {
  //       refreshPageTransactions(1)
  //     }
  //   }, [historyVisible, walletCurrentAddress])

  return (
    <StyledDialog maxWidth={false} open={badgesDialogVisible}>
      <DialogTitle
        sx={{
          m: 0,
          p: ["2rem", "3rem"],
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        id="customized-dialog-title"
      >
        <Typography variant="h3" sx={{ flexGrow: 1, color: "#ffffff", textAlign: "center" }}>
          Drag badges to cutomize{" "}
        </Typography>
        <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"] }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <GridDragDrop />
        <Stack direction="row" justifyContent="center" gap="1.6rem">
          <Button sx={{ borderRadius: "0.8rem", width: "16.5rem", fontSize: "1.6rem", padding: "0" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ borderRadius: "0.8rem", width: "16.5rem", fontSize: "1.6rem", padding: "0" }} onClick={handleSave}>
            Save Changes
          </Button>
        </Stack>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default BadgesDialog
