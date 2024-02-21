import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as LogoSvg } from "@/assets/svgs/common/scroll-logo-icon.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { ReactComponent as DefaultBadgeSvg } from "@/assets/svgs/skelly/default-badge.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import ScrollButton from "@/components/Button"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  background: "rgba(16, 16, 16, 0.60)",
  // backdropFilter: "unset",
  "& .MuiDialog-paper": {
    backgroundColor: "#101010",
    width: "64rem",
    height: "67.4rem",
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "0 3rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledScrollButton = styled(ScrollButton)(({ theme }) => ({
  width: "24rem",
  height: "5.4rem",
  fontSize: "2rem",
  fontWeight: 600,
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1.6rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2rem",
  },
}))

const UpgradedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#FF6F43",
  width: "100%",
  height: "4.8rem",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  fontSize: "1.6rem",
  fontWeight: 600,
}))

const UpgradedButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  lineHeight: "2.4rem",
  height: "3.2rem",
  width: "12.4rem",
  border: "1px solid #Fff",
  padding: "0",
  marginLeft: "1.6rem",
}))

const BadgeDetailDialog = () => {
  const { badgeDetailDialogVisible, changeBadgeDetailDialog } = useSkellyStore()
  const navigate = useNavigate()

  const handleClose = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
  }

  const handleMint = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.MINTED)
  }

  const hangleViewSkelly = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    navigate("/scroll-skelly")
  }

  const handleViewBadge = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    navigate("/scroll-skelly/badge")
  }

  const BackButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: "1.6rem",
    right: "1.6rem",
  }))

  return (
    <StyledDialog onClose={handleClose} maxWidth={false} open={badgeDetailDialogVisible !== BadgeDetailDialogTpye.HIDDEN}>
      <DialogTitle
        sx={{
          m: 0,
          p: [0],
        }}
      >
        {badgeDetailDialogVisible === BadgeDetailDialogTpye.UPGRADE && (
          <UpgradedBox>
            UPGRADE AVAILABLE
            <UpgradedButton variant="contained" color="primary" onClick={handleMint}>
              Upgrade now
            </UpgradedButton>
          </UpgradedBox>
        )}

        <BackButton
          onClick={handleClose}
          sx={{
            top: badgeDetailDialogVisible === BadgeDetailDialogTpye.UPGRADE ? "6.4rem" : "1.6rem",
          }}
        >
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </BackButton>
      </DialogTitle>
      <StyledDialogContent>
        <SvgIcon sx={{ width: "20rem", height: "20rem", marginBottom: "4rem" }} component={DefaultBadgeSvg} inheritViewBox></SvgIcon>
        {badgeDetailDialogVisible !== BadgeDetailDialogTpye.MINTED ? (
          <>
            <Typography
              sx={{ fontSize: "3.2rem", fontWeight: 600, lineHeight: "0.8rem", marginBottom: "3.2rem", color: "#fff", textAlign: "center" }}
            >
              Scroll Power Badge
            </Typography>
            <Typography sx={{ fontSize: "2rem", fontWeight: 600, lineHeight: "2.4rem", color: "#fff", textAlign: "center", marginBottom: "1.2rem" }}>
              This is some explanation of the badge and how to earn the badge. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum
              arcu sit amet enim ullamcorper fringilla. Sed vel mauris consectetur, congue enim et, congue felis. Fusce.
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 600,
                lineHeight: "2.4rem",
                color: "#fff",
                textAlign: "center",
                marginBottom: "3.2rem",
              }}
            >
              <SvgIcon sx={{ marginRight: "0.8rem", width: "3.2rem", height: "3.2rem" }} component={LogoSvg} inheritViewBox></SvgIcon>
              Scroll
            </Typography>
          </>
        ) : (
          <Typography sx={{ fontSize: "2.4rem", fontWeight: 600, color: "#fff", marginBottom: "2.4rem", textAlign: "center" }}>
            You have successfully minted <br />
            Scroll native badge!
          </Typography>
        )}
        <ButtonContainer>
          {badgeDetailDialogVisible === BadgeDetailDialogTpye.MINT && (
            <StyledScrollButton color="primary" onClick={handleMint}>
              Mint badge
            </StyledScrollButton>
          )}

          {badgeDetailDialogVisible === BadgeDetailDialogTpye.MINTED && (
            <StyledScrollButton color="primary" onClick={hangleViewSkelly}>
              View Scroll Skelly
            </StyledScrollButton>
          )}
          <StyledScrollButton color="dark" onClick={handleViewBadge}>
            View badge details
          </StyledScrollButton>
          {badgeDetailDialogVisible !== BadgeDetailDialogTpye.MINT && (
            <SvgIcon sx={{ width: "3.2rem", height: "3.2rem", color: "#fff" }} component={ShareSvg} inheritViewBox></SvgIcon>
          )}
        </ButtonContainer>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default BadgeDetailDialog
