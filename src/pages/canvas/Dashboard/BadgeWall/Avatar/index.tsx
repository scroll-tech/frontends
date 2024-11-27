import { useQuery } from "@tanstack/react-query"
import Img from "react-cool-img"

import { Box } from "@mui/material"

import { fetchAvatarURL, generateNFTURL } from "@/apis/canvas-profile"
import FlipCard from "@/components/FlipCard"
import { useRainbowContext } from "@/contexts/RainbowProvider"

import AvatarTooltip from "./AvatarTooltip"
import HeartbeatAvatar from "./HeartbeatAvatar"
import NFTAvatar from "./NFTAvatar"
import PictureAvatar from "./PictureAvatar"

const Avatar = props => {
  const { sx } = props

  const { walletCurrentAddress } = useRainbowContext()

  const { data: avatarObj, isLoading } = useQuery({
    queryKey: ["canvasAvatar", walletCurrentAddress],
    queryFn: () => {
      return scrollRequest(fetchAvatarURL(walletCurrentAddress))
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const { data: avatarNFT, isLoading: avatarNFTLoading } = useQuery({
    queryKey: ["NFTAvatarImageURL", walletCurrentAddress],
    queryFn: () => {
      return scrollRequest(generateNFTURL(walletCurrentAddress))
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!avatarObj?.tokenID,
  })

  const renderAvatar = () => {
    if (isLoading) {
      return <Img src="/imgs/canvas/avatarPlaceholder.svg" alt="avatar-loading" width="100%"></Img>
    }

    if (avatarObj?.tokenID) {
      return (
        <FlipCard
          sx={{ width: "100%", aspectRatio: "1/1" }}
          frontContent={
            <AvatarTooltip title="click to view heartbeat">
              <NFTAvatar src={avatarNFTLoading ? undefined : avatarNFT?.image || "/imgs/canvas/NFTPlaceholder.svg"}></NFTAvatar>
            </AvatarTooltip>
          }
          backContent={<HeartbeatAvatar></HeartbeatAvatar>}
        ></FlipCard>
      )
    }

    if (avatarObj?.avatar) {
      return (
        <FlipCard
          sx={{ width: "100%", aspectRatio: "1/1" }}
          frontContent={
            <AvatarTooltip title="click to view heartbeat">
              <PictureAvatar src={avatarObj.avatar}></PictureAvatar>
            </AvatarTooltip>
          }
          backContent={<HeartbeatAvatar></HeartbeatAvatar>}
        ></FlipCard>
      )
    }

    return <HeartbeatAvatar />
  }

  return <Box sx={sx}>{renderAvatar()}</Box>
}

export default Avatar
