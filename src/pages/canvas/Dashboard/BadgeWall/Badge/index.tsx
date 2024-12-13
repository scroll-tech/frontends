import { useMemo } from "react"

import { Box } from "@mui/material"

import { isInGracePeriod } from "@/services/canvasService"
import useCanvasStore, { BadgeDetailDialogType } from "@/stores/canvasStore"

import GracePeriodBadge from "./GracePeriodBadge"
import NormalBadge from "./NormalBadge"

const Badge = ({ badge, index, badgewidth }) => {
  const { changeBadgeDetailDialog, changeSelectedBadge, upgradableBadges } = useCanvasStore()

  const handleShowBadgeDetailDialog = () => {
    changeSelectedBadge({ ...badge.metadata, upgradable })
    changeBadgeDetailDialog(BadgeDetailDialogType.VIEW)
  }
  const upgradable = useMemo(() => upgradableBadges.find(item => item.id === badge.metadata?.id)?.upgradable, [upgradableBadges, badge])

  return (
    <Box
      key={index}
      sx={{
        cursor: "pointer",
        position: "absolute",
        overflow: "hidden",
        top: `${badge.top}px`,
        left: `${badge.left}px`,
        width: `${badgewidth}px`,
        height: `${badgewidth}px`,
        padding: `${badgewidth * 0.15}px`,
        zIndex: 0,
        transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",

        "@keyframes rotate": {
          "100%": {
            transform: "translate(-50%, -50%) rotate(1turn)",
          },
        },
        "&:hover": {
          padding: badge.metadata?.revokeTime ? `${badgewidth * 0.15}px` : `${badgewidth * 0.1}px`,
        },
      }}
      onClick={handleShowBadgeDetailDialog}
    >
      {isInGracePeriod({ revokeTime: badge.metadata?.revokeTime }) ? (
        <GracePeriodBadge badge={badge}></GracePeriodBadge>
      ) : (
        <NormalBadge badge={badge} upgradable={!!upgradable}></NormalBadge>
      )}
    </Box>
  )
}

export default Badge
