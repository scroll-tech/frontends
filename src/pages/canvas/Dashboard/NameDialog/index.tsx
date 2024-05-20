import { useEffect, useState } from "react"

import { Box, InputBase, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import useValidateCanvasName from "@/hooks/useValidateCanvasName"
import Button from "@/pages/canvas/components/Button"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasStore from "@/stores/canvasStore"

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontSize: "6.4rem",
    height: "7.2rem",
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.2rem",
      lineHeight: "4.8rem",
    },
  },
}))

const NameDialog = () => {
  const { profileDialogVisible, changeProfileDialog, username, profileContract, queryUsername } = useCanvasStore()

  const [loading, setLoading] = useState(false)

  const [profileName, setProfileName] = useState(username)

  const { helpText, clearHelpText, validating, renderValidation } = useValidateCanvasName(profileName)

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
    setProfileName(e.target.value.trim())
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
    <Dialog onClose={handleClose} open={profileDialogVisible}>
      <Box sx={{ width: ["100%", "auto"], height: ["100%", "auto"] }}>
        <Typography
          sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, textAlign: "center", lineHeight: ["3.2rem", 1], color: "primary.contrastText" }}
        >
          Change name
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: ["100%", "57.6rem"],
            marginBottom: "13.6rem",
            marginTop: [0, "14.4rem"],
            top: ["calc(50% - 12rem)", "unset"],
          }}
        >
          <StyledInputBase
            inputProps={{
              maxLength: 15,
              minLength: 4,
            }}
            autoFocus
            placeholder="name"
            value={profileName}
            onChange={handleChange}
            onKeyDown={handleKeydown}
          />
          <Stack
            direction="row"
            gap="0.5rem"
            alignItems="center"
            sx={{
              position: "absolute",
              top: ["6.4rem", "11.2rem"],
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {renderValidation()}
          </Stack>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          gap="1.6rem"
          sx={[
            { mb: [0, "1.2rem"] },
            theme => ({
              [theme.breakpoints.down("sm")]: {
                position: "absolute",
                width: "calc(100% - 4rem)",
                bottom: "2.4rem",
                "& > div": {},
              },
            }),
          ]}
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{ borderRadius: "0.8rem", width: ["100%", "18.5rem"], fontSize: "1.6rem", padding: 0, borderColor: "#fff !important" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            loading={loading}
            gloomy={!!helpText || validating || username === profileName}
            sx={{ borderRadius: "0.8rem", width: ["100%", "18.5rem"], fontSize: "1.6rem", padding: 0 }}
            onClick={changeUsername}
          >
            {loading ? "Saving" : "Save Changes"}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  )
}

export default NameDialog
