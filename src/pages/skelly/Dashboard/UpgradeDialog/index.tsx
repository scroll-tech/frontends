import { useEffect, useState } from "react"

import BeachAccessIcon from "@mui/icons-material/BeachAccess"
import ImageIcon from "@mui/icons-material/Image"
import WorkIcon from "@mui/icons-material/Work"
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
} from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as BackSvg } from "@/assets/svgs/skelly/back.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { ReactComponent as DefaultBadgeSvg } from "@/assets/svgs/skelly/default-badge.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import ScrollButton from "@/components/Button"
import useSkellyStore from "@/stores/skellyStore"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  //   border-radius: 16px;
  // background: linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%);
  // backdrop-filter: blur(50px);
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
  height: "64.4rem",
  width: "64.4rem",
  alignItems: "center",
}))

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  "& .MuiListItem-root": {
    gap: "1.6rem",
  },
}))

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    // backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}))

const StyledListItemAvatar = styled(ListItemAvatar)(({ theme }) => ({
  "& .MuiAvatar-root": {
    width: "8rem",
    height: "8rem",
    backgroundColor: "#000",
  },
}))

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontSize: "2.4rem",
    fontWeight: 600,
    lineHeight: "3.2rem",
    color: "#fff",
  },
  "& .MuiListItemText-secondary": {
    fontSize: "1.8rem",
    fontWeight: 600,
    lineHeight: "2.4rem",
    color: "#fff",
  },
}))

const StyledScrollButton = styled(ScrollButton)(({ theme }) => ({
  width: "24rem",
  height: "5.4rem",
  fontSize: "2rem",
  fontWeight: 600,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  border: "0.15rem solid #fff",
  display: "flex",
  width: "16rem",
  height: "4.8rem",
  padding: "0.8rem 2.4rem",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.8rem",
  flexShrink: 0,
  flexWrap: "wrap",
  fontSize: "1.8rem",
  fontWeight: 600,
  backgroundColor: "transparent",
  color: "#fff",
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "3rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2rem",
  },
}))

const UpgradeDialog = () => {
  const { upgradeDialogVisible, changeUpgradeDialog } = useSkellyStore()
  const [step, setStep] = useState(0)

  const handleClose = () => {
    changeUpgradeDialog(false)
  }

  return (
    <StyledDialog maxWidth={false} open={upgradeDialogVisible}>
      {step === 0 ? (
        <>
          <DialogTitle
            sx={{
              m: 0,
              p: ["2rem", "3rem"],
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "3.2rem", color: "#ffffff", fontWeight: 600 }}>Badges for mint</Typography>
            <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
              <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
            </IconButton>
          </DialogTitle>
          <StyledDialogContent>
            <StyledList>
              {[1, 2, 3].map((item, index) => (
                <StyledListItem secondaryAction={<StyledButton onClick={() => setStep(1)}>Mint now</StyledButton>}>
                  <StyledListItemAvatar>
                    <Avatar sx={{ fontSize: "8rem" }}>
                      <ImageIcon />
                    </Avatar>
                  </StyledListItemAvatar>
                  <StyledListItemText
                    primary="Badge Name"
                    secondary={
                      <Typography className="MuiListItemText-secondary">
                        Issued by
                        <ImageIcon />
                        Syncswap
                      </Typography>
                    }
                  />
                </StyledListItem>
              ))}
            </StyledList>
          </StyledDialogContent>
        </>
      ) : (
        <>
          <DialogTitle
            sx={{
              m: 0,
              p: ["2rem", "3rem"],
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ p: 0, fontSize: "1.8rem", color: "#fff", "&:hover": { backgroundColor: "unset" } }} onClick={() => setStep(0)}>
              <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff", marginRight: "1.2rem" }} component={BackSvg} inheritViewBox></SvgIcon>Back
            </IconButton>
            <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
              <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
            </IconButton>
          </DialogTitle>
          <StyledDialogContent>
            <SvgIcon
              sx={{ width: "20rem", height: "20rem", marginTop: "10.5rem", marginBottom: "4rem" }}
              component={DefaultBadgeSvg}
              inheritViewBox
            ></SvgIcon>
            <Typography
              sx={{ fontSize: "3.2rem", fontWeight: 600, lineHeight: "4.8rem", marginBottom: "3.2rem", color: "#fff", textAlign: "center" }}
            >
              You have successfully minted <br />
              Badge name!
            </Typography>
            <ButtonContainer>
              <StyledScrollButton href="/ecosystem" color="primary">
                View Scroll Skelly
              </StyledScrollButton>
              <StyledScrollButton color="dark" target="_blank" href="https://docs.scroll.io/en/home/">
                View badge details
              </StyledScrollButton>
              <SvgIcon sx={{ width: "3.2rem", height: "3.2rem", color: "#fff" }} component={ShareSvg} inheritViewBox></SvgIcon>
            </ButtonContainer>
          </StyledDialogContent>
        </>
      )}
    </StyledDialog>
  )
}

export default UpgradeDialog
