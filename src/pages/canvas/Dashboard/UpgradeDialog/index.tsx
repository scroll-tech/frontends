import { useEffect, useState } from "react"

// import Img from "react-cool-img"
// import { useNavigate } from "react-router-dom"
import { List } from "@mui/material"
import { styled } from "@mui/system"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import { checkBadgeEligibility } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"

import Dialog from "../../components/Dialog"
import Empty from "../../components/Empty"
import BadgeItem from "./BadgeItem"
import Badges from "./Badges"

const StyledList = styled(List)(({ theme }) => ({
  width: "57.6rem",
  height: "62.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  padding: "2.4rem 0 0",
  overflowY: "auto",
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(209, 205, 204, 0.30)",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  // Firefox
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(209, 205, 204, 0.30) transparent",

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
          let isValidBadge = await checkBadgeEligibility(provider, walletCurrentAddress, badge)

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
      <Dialog onClose={handleClose} open={upgradeDialogVisible}>
        <Empty title="No eligible badges for minting" sx={{ width: "57.6rem", height: "62.7rem" }}></Empty>
      </Dialog>
    )
  }

  return (
    <Dialog title="Badges for mint" open={upgradeDialogVisible} onClose={handleClose}>
      <StyledList>
        {visibleBadges.map((badge, index) => (
          <BadgeItem key={index} badge={badge} />
        ))}
      </StyledList>
    </Dialog>
  )
}

export default UpgradeDialog
