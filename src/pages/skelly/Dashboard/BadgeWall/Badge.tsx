import Img from "react-cool-img"

import { Box } from "@mui/material"
import { styled } from "@mui/system"

import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"
import { getBadgeImgURL } from "@/utils"

import ToolTip from "../../components/Tooltip"

const BadgeBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "absolute",
}))

const Badge = ({ badge, index, badgewidth }) => {
  const { changeBadgeDetailDialog, changeSelectedBadge } = useSkellyStore()

  const handleShowBadgeDetailDialog = () => {
    changeSelectedBadge(badge.metadata)
    changeBadgeDetailDialog(BadgeDetailDialogTpye.VIEW)
  }

  return (
    <ToolTip title={<Box sx={{ fontWeight: 600 }}>{badge.metadata?.name}</Box>}>
      <BadgeBox
        key={index}
        style={{
          top: `${badge.top}px`,
          left: `${badge.left}px`,
          width: `${badgewidth}px`,
          height: `${badgewidth}px`,
          padding: `${badgewidth / 10}px`,
        }}
        onClick={handleShowBadgeDetailDialog}
      >
        <Img
          alt={badge.metadata?.name}
          style={{ width: "100%", borderRadius: "0.8rem" }}
          src={getBadgeImgURL(badge.metadata?.image)}
          placeholder="/imgs/skelly/badgePlaceholder.svg"
        />
      </BadgeBox>
    </ToolTip>
  )
}

export default Badge
