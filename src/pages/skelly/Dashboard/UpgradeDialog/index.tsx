import { useMemo } from "react"

import { Dialog, DialogContent, DialogTitle, IconButton, List, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

// import { ReactComponent as BackSvg } from "@/assets/svgs/skelly/back.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore from "@/stores/skellyStore"

import BadgeItem from "./BadgeItem"
import Badges from "./Badges"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(50px)",
  "& .MuiDialog-paper": {
    // background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
    backgroundColor: "#101010",
    width: "64rem",
    height: "67.4rem",
    padding: "3.2rem",
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2.4rem",
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
}))

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  "& .MuiListItem-root": {
    gap: "1.6rem",
  },
}))

const UpgradeDialog = () => {
  const { upgradeDialogVisible, changeUpgradeDialog } = useSkellyStore()
  const { userBadges } = useSkellyContext()

  const handleClose = () => {
    changeUpgradeDialog(false)
  }

  const visibleBadges = useMemo(() => {
    return Badges.filter(badge => userBadges.every(userBadge => userBadge.badgeContract !== badge.badgeAddress))
  }, [userBadges])

  return (
    <StyledDialog maxWidth={false} onClose={handleClose} open={upgradeDialogVisible}>
      <StyledDialogTitle>
        <Typography sx={{ fontSize: "3.2rem", lineHeight: 1, color: "#ffffff", fontWeight: 600 }}>Badges for mint</Typography>
        <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledList>
          {visibleBadges.map((badge, index) => (
            <BadgeItem key={index} badge={badge} />
          ))}
        </StyledList>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default UpgradeDialog
