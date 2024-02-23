import { useEffect, useState } from "react"

import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Stack, SvgIcon } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore from "@/stores/skellyStore"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(50px)",
  "& .MuiDialog-paper": {
    background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
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
  backgroundImage: " url('https://avatars.githubusercontent.com/u/387772?s=200&v=4')",
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

const NameDialog = () => {
  const { profileDialogVisible, changeProfileDialog } = useSkellyStore()
  const { username, checkIfProfileMinted, profileContract, queryUsername } = useSkellyContext()
  const [, setLoading] = useState(false)

  const [profileName, setProfileName] = useState(username)

  useEffect(() => {
    setProfileName(username)
  }, [username])

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
      await tx.wait()
      await checkIfProfileMinted()
      queryUsername()
      handleClose()
    } catch (error) {
      console.error("Failed to change username:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledDialog maxWidth={false} onClose={handleClose} open={profileDialogVisible}>
      <DialogTitle
        sx={{
          m: 0,
          p: ["2rem", "3rem"],
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <Avatar>{/* <Button sx={{ borderRadius: "0.8rem", width: "16.5rem", fontSize: "1.6rem", padding: "0" }}>Choose NFT</Button> */}</Avatar>
        <StyledInputBase autoFocus onChange={handleChange} placeholder="Enter your name" value={profileName} />
        <Stack direction="row" justifyContent="center" gap="1.6rem">
          <Button sx={{ borderRadius: "0.8rem", width: "16.5rem", fontSize: "1.6rem", padding: "0" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            // loading={loading}
            sx={{ borderRadius: "0.8rem", width: "16.5rem", fontSize: "1.6rem", padding: "0" }}
            onClick={() => changeUsername()}
          >
            Save Changes
          </Button>
        </Stack>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default NameDialog
