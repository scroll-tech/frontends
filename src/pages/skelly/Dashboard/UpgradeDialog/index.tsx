import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Dialog, DialogContent, DialogTitle, IconButton, List, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

// import { ReactComponent as BackSvg } from "@/assets/svgs/skelly/back.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { ReactComponent as EmptySvg } from "@/assets/svgs/skelly/empty.svg"
import Button from "@/components/Button"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSkellyStore from "@/stores/skellyStore"

import BadgeItem from "./BadgeItem"
import Badges from "./Badges"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(16, 16, 16, 0.60)",
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
  const { upgradeDialogVisible, changeUpgradeDialog, userBadges } = useSkellyStore()
  const { walletCurrentAddress, provider } = useRainbowContext()
  const navigate = useNavigate()

  const handleClose = () => {
    changeUpgradeDialog(false)
  }

  const moveToEcosystem = () => {
    navigate("/ecosystem")
    changeUpgradeDialog(false)
  }

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

  return (
    <StyledDialog maxWidth={false} onClose={handleClose} open={upgradeDialogVisible}>
      <StyledDialogTitle>
        <Typography sx={{ fontSize: "3.2rem", lineHeight: 1, color: "#ffffff", fontWeight: 600 }}>Badges for mint</Typography>
        <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        {visibleBadges.length ? (
          <StyledList>
            {visibleBadges.map((badge, index) => (
              <BadgeItem key={index} badge={badge} />
            ))}
          </StyledList>
        ) : (
          <Stack justifyContent="center" alignItems="center" height="100%">
            <SvgIcon sx={{ width: "20rem", height: "20rem" }} component={EmptySvg} inheritViewBox></SvgIcon>
            <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600, mb: "0.8rem", color: "#fff" }}>
              No eligible badges for minting
            </Typography>
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", mb: "4rem", color: "#fff" }}>
              Explore protocols offering badges on the ecosystem page.
            </Typography>
            <Button sx={{ width: "15.6rem", height: "4rem", fontSize: "1.6rem" }} color="primary" onClick={moveToEcosystem}>
              Go to ecosystem
            </Button>
          </Stack>
        )}
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default UpgradeDialog
