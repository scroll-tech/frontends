import { Box, Tooltip } from "@mui/material"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/system"

import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

import NameTip from "../../components/NameTip"

const BadgeBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "absolute",
}))

const CustomTooltip = styled(Tooltip)(({ theme }) => ({}))

const Badge = ({ badge, index, badgeWidth }) => {
  const { changeBadgeDetailDialog } = useSkellyStore()

  return (
    <CustomTooltip
      title={<NameTip />}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
              marginTop: "-6px",
              background: "transparent",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
              marginBottom: "-6px",
              background: "transparent",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
              marginLeft: "-6px",
              background: "transparent",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
              marginRight: "-6px",
              background: "transparent",
            },
          },
        },
      }}
    >
      <BadgeBox
        key={index}
        style={{
          top: `${badge.top}px`,
          left: `${badge.left}px`,
          width: `${badgeWidth}px`,
          height: `${badgeWidth}px`,
          padding: `${badgeWidth / 10}px`,
        }}
        onClick={() => changeBadgeDetailDialog(BadgeDetailDialogTpye.UPGRADE)}
      >
        <img alt="" style={{ borderRadius: "50%" }} src={badge.image} />
      </BadgeBox>
    </CustomTooltip>
  )
}

export default Badge
