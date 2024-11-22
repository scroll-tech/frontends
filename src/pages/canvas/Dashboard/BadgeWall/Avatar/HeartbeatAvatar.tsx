import Img from "react-cool-img"

import { Box } from "@mui/material"

import { getHeartbeatURL } from "@/apis/canvas"
import { useRainbowContext } from "@/contexts/RainbowProvider"

import AvatarTooltip from "./AvatarTooltip"

const HeartbeatAvatar = props => {
  const { walletCurrentAddress } = useRainbowContext()

  return (
    <AvatarTooltip
      title={
        <Box sx={{ width: "21.4rem" }}>
          <b>Activity Heartbeat:</b>
          <br></br>
          Heart beats faster when you are more active on Scroll
        </Box>
      }
    >
      <Img src={getHeartbeatURL(walletCurrentAddress)} placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="avatar" width="100%"></Img>
    </AvatarTooltip>
  )
}

export default HeartbeatAvatar
