import {
  // Avatar,
  Box,
  Badge as MuiBadge,
} from "@mui/material"

import { ipfsToBrowserURL } from "@/utils"

import BadgeImage from "../../../components/BadgeImage"
import ToolTip from "../../../components/Tooltip"

const NormalBadge = props => {
  const { badge, upgradable } = props
  return (
    <ToolTip title={<Box sx={{ fontWeight: 600 }}>{badge.metadata?.name}</Box>}>
      <MuiBadge invisible={!upgradable} color="primary" variant="dot">
        <BadgeImage
          alt={badge.metadata?.name}
          style={{ width: "100%" }}
          src={ipfsToBrowserURL(badge.metadata?.image)}
          placeholder="/imgs/canvas/badgePlaceholder.svg"
        />
        {/* <Avatar sx={{ width: "100px", height: "100px", fontSize: "4rem" }}>{badge.metadata?.id.slice(0, 4)}</Avatar> */}
      </MuiBadge>
    </ToolTip>
  )
}

export default NormalBadge
