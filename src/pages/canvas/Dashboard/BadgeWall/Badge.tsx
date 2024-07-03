import { useMemo } from "react"
import Img from "react-cool-img"

import { Box, Badge as MuiBadge } from "@mui/material"

import useCanvasStore, { BadgeDetailDialogType } from "@/stores/canvasStore"
import { getBadgeImgURL } from "@/utils"

import ToolTip from "../../components/Tooltip"

const Badge = ({ badge, index, badgewidth }) => {
  const { changeBadgeDetailDialog, changeSelectedBadge, upgradableBadges } = useCanvasStore()

  const handleShowBadgeDetailDialog = () => {
    changeSelectedBadge({ ...badge.metadata, upgradable: upgradableBadge })
    changeBadgeDetailDialog(BadgeDetailDialogType.VIEW)
  }

  const upgradableBadge = useMemo(() => upgradableBadges.find(item => item.id === badge.metadata.id)?.upgradable, [upgradableBadges, badge])

  return (
    <ToolTip title={<Box sx={{ fontWeight: 600 }}>{badge.metadata?.name}</Box>}>
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
            padding: `${badgewidth * 0.1}px`,
          },

          "&:hover:before": {
            content: '""',
            zIndex: -2,
            textAlign: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(0deg)",
            position: "absolute",
            width: `${badgewidth * 2}px`,
            height: `${badgewidth * 2}px`,
            backgroundImage: "conic-gradient(#10101000, #fff 60%, #101010)",
            animation: "rotate 1.5s linear infinite",
          },
          "&:hover:after": {
            content: '""',
            position: "absolute",
            zIndex: -1,
            left: "4px",
            top: "4px",
            width: "calc(100% - 8px)",
            height: "calc(100% - 8px)",
            /*bg color*/
            backgroundColor: "#101010",
          },
        }}
        onClick={handleShowBadgeDetailDialog}
      >
        <MuiBadge invisible={!upgradableBadge} color="primary" variant="dot">
          {/* <BadgeGlowBox></BadgeGlowBox> */}
          <Img
            alt={badge.metadata?.name}
            style={{ width: "100%", borderRadius: "0.8rem" }}
            src={getBadgeImgURL(badge.metadata?.image)}
            placeholder="/imgs/canvas/badgePlaceholder.svg"
          />
        </MuiBadge>
      </Box>
    </ToolTip>
  )
}

export default Badge
