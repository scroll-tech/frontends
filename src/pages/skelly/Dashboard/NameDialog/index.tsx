import { useEffect, useState } from "react"

import { Box, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import useValidateSkellyName from "@/hooks/useValidateSkellyName"
import Button from "@/pages/skelly/components/Button"
import useSkellyStore from "@/stores/skellyStore"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  "& .MuiDialog-paper": {
    backgroundColor: "#101010",
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "0 3.2rem 4.8rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "64rem",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontSize: "8.8rem",
    height: "8.8rem",
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
  },
}))

const NameDialog = () => {
  const { profileDialogVisible, changeProfileDialog, username, profileContract, queryUsername } = useSkellyStore()

  const [loading, setLoading] = useState(false)

  const [profileName, setProfileName] = useState(username)

  const { helpText, clearHelpText, validating, renderValidation } = useValidateSkellyName(profileName)

  useEffect(() => {
    if (profileDialogVisible) {
      clearHelpText()
      setProfileName(username)
    }
  }, [profileDialogVisible, username])

  const handleClose = () => {
    changeProfileDialog(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value)
  }

  const changeUsername = async () => {
    setLoading(true)
    try {
      const tx = await profileContract!.changeUsername(profileName)
      const txReceipt = await tx.wait()
      if (txReceipt.status === 1) {
        queryUsername()
        handleClose()
      } else {
        return "due to any operation that can cause the transaction or top-level call to revert"
      }
    } catch (error) {
      console.error("Failed to change username:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeydown = async e => {
    if (e.keyCode === 13) {
      changeUsername()
    }
  }

  return (
    <StyledDialog maxWidth={false} onClose={handleClose} open={profileDialogVisible}>
      <DialogTitle
        sx={{
          m: 0,
          p: ["2rem", "2.4rem"],
          pb: 0,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "2.4rem"], color: "primary.contrastText" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <Typography sx={{ mt: "-1.6rem", fontSize: "3.2rem", fontWeight: 600, lineHeight: "5.6rem", color: "primary.contrastText" }}>
          Change name
        </Typography>
        <Box sx={{ position: "relative", marginBottom: "13.6rem", marginTop: "14.4rem" }}>
          <StyledInputBase
            inputProps={{
              maxLength: 15,
              minLength: 4,
            }}
            autoFocus
            placeholder="Enter your name"
            value={profileName}
            onChange={handleChange}
            onKeyDown={handleKeydown}
          />
          <Stack
            direction="row"
            gap="0.5rem"
            sx={{
              position: "absolute",
              top: "11.2rem",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {renderValidation()}
          </Stack>
        </Box>
        <Stack direction="row" justifyContent="center" gap="1.6rem">
          <Button
            color="secondary"
            variant="contained"
            sx={{ borderRadius: "0.8rem", width: "18.5rem", fontSize: "1.8rem", padding: "0" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            loading={loading}
            gloomy={!!helpText || validating || username === profileName}
            sx={{ borderRadius: "0.8rem", width: "18.5rem", fontSize: "1.6rem", padding: "0" }}
            onClick={changeUsername}
          >
            {loading ? "Saving" : "Save Changes"}
          </Button>
        </Stack>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default NameDialog
