import dayjs from "dayjs"
import Countdown from "react-countdown"

import { Box, Typography } from "@mui/material"

import GracePeriodGif from "@/assets/images/canvas/grace-period.gif"
import { GRACE_PERIOD_DURATION } from "@/constants"
import { ipfsToBrowserURL } from "@/utils"

import BadgeImage from "../../../components/BadgeImage"
import ToolTip from "../../../components/Tooltip"

const GracePeriodBadge = props => {
  const { badge } = props

  const renderCountDown = ({ hours, days, minutes, seconds, completed }) => {
    return (
      <Typography
        component="span"
        sx={{ color: "primary.main", fontSize: "inherit", fontWeight: "inherit", fontFamily: "var(--developer-page-font-family)" }}
      >
        {completed ? "" : `${days ? days + "d " : ""}${hours ? hours + "h " : ""}${minutes ? minutes + "m " : ""}${seconds}s `}
      </Typography>
    )
  }
  return (
    <ToolTip
      title={
        <Box sx={{ fontWeight: 600, textAlign: "left" }}>
          Your SCR holding badge has been revoked. Regain it within{" "}
          <Countdown date={dayjs(badge.metadata.revokeTime).add(GRACE_PERIOD_DURATION, "m")} renderer={renderCountDown}></Countdown>
          to avoid paying a gas fee to display it again on your canvas.
        </Box>
      }
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            width: "2.4rem",
            height: "2.4rem",
            background: `url(${GracePeriodGif}) center/cover no-repeat`,
            top: "0.8rem",
            right: "0.8rem",
          }}
        ></Box>
        <BadgeImage
          alt={badge.metadata?.name}
          style={{ width: "100%", opacity: 0.6 }}
          src={ipfsToBrowserURL(badge.metadata?.image)}
          placeholder="/imgs/canvas/badgePlaceholder.svg"
        />
      </Box>
    </ToolTip>
  )
}

export default GracePeriodBadge
