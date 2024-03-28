import { useEffect, useState } from "react"

// import Img from "react-cool-img"
// import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogTitle, IconButton, List, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

// import { ReactComponent as BackSvg } from "@/assets/svgs/canvas/back.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/canvas/close.svg"
// import Button from "@/components/Button"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"

import Empty from "../../components/Empty"
import BadgeItem from "./BadgeItem"
import Badges from "./Badges"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  backgroundColor: "rgba(16, 16, 16, 0.60)",
  "& .MuiDialog-paper": {
    // background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
    backgroundColor: "#101010",
    width: "64rem",
    height: "67.4rem",
    padding: "3.2rem",
    borderRadius: "1.6rem",
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2.4rem",
  marginRight: "-0.8rem",
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
  const { upgradeDialogVisible, changeUpgradeDialog, userBadges } = useCanvasStore()
  const { walletCurrentAddress, provider } = useRainbowContext()
  // const navigate = useNavigate()

  const handleClose = () => {
    changeUpgradeDialog(false)
  }

  // const moveToEcosystem = () => {
  //   navigate("/ecosystem")
  //   changeUpgradeDialog(false)
  // }

  const [visibleBadges, setVisibleBadges] = useState([])

  useEffect(() => {
    const fetchVisibleBadges = async () => {
      const filteredBadges = await Promise.all(
        Badges.map(async badge => {
          const isUserBadge = userBadges.some(userBadge => userBadge.badgeContract === badge.badgeContract)
          const isValidBadge = await badge.validator(walletCurrentAddress, provider)
          return {
            ...badge,
            isValid: !isUserBadge && isValidBadge,
          }
        }),
      )

      setVisibleBadges(filteredBadges.filter(badge => badge.isValid) as any)
    }

    fetchVisibleBadges()
  }, [userBadges, walletCurrentAddress, provider])

  if (!visibleBadges.length) {
    return (
      <StyledDialog maxWidth={false} onClose={handleClose} open={upgradeDialogVisible}>
        <StyledDialogTitle
          sx={{
            // m: 0,
            // p: ["2rem", "3rem"],
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
            <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
          </IconButton>
        </StyledDialogTitle>
        <DialogContent>
          <Empty title="No eligible badges for minting"></Empty>
        </DialogContent>
      </StyledDialog>
    )
  }

  return (
    <StyledDialog maxWidth={false} onClose={handleClose} open={upgradeDialogVisible}>
      <StyledDialogTitle>
        <Typography sx={{ fontSize: "3.2rem", lineHeight: "5.6rem", color: "#ffffff", fontWeight: 600 }}>Badges for mint</Typography>
        <IconButton sx={{ "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "2.4rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
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
