import { useQuery } from "@tanstack/react-query"
import Img from "react-cool-img"

import { Box } from "@mui/material"

import { fetchAvatarURL, generateAvatarURL, generateNFTURL } from "@/apis/canvas-profile"
import FlipCard from "@/components/FlipCard"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasProfileStore from "@/stores/canvasProfileStore"

import AvatarTooltip from "./AvatarTooltip"
import HeartbeatAvatar from "./HeartbeatAvatar"
import NFTAvatar from "./NFTAvatar"
import PictureAvatar from "./PictureAvatar"

const Avatar = props => {
  const { sx } = props

  const { walletCurrentAddress } = useRainbowContext()
  const { NFTImageURL } = useCanvasProfileStore()

  const { data, isFetching } = useQuery({
    queryKey: ["canvasAvatar", walletCurrentAddress],
    queryFn: () => {
      return scrollRequest(fetchAvatarURL(walletCurrentAddress))
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !NFTImageURL,
  })
  // alert(failureReason)
  const renderAvatar = () => {
    if (NFTImageURL) {
      return (
        <FlipCard
          sx={{ width: "100%", aspectRatio: "1/1" }}
          frontContent={
            <AvatarTooltip title="click to view heartbeat">
              <NFTAvatar src={NFTImageURL}></NFTAvatar>
            </AvatarTooltip>
          }
          backContent={<HeartbeatAvatar></HeartbeatAvatar>}
        ></FlipCard>
      )
    }

    if (isFetching) {
      return <Img src="/imgs/canvas/badgePlaceholder.svg" alt="avatar-loading" width="100%"></Img>
    }

    if (data?.tokenID) {
      return (
        <FlipCard
          sx={{ width: "100%", aspectRatio: "1/1" }}
          frontContent={
            <AvatarTooltip title="click to view heartbeat">
              <NFTAvatar src={generateNFTURL(walletCurrentAddress)}></NFTAvatar>
            </AvatarTooltip>
          }
          backContent={<HeartbeatAvatar></HeartbeatAvatar>}
        ></FlipCard>
      )
    }

    if (data?.avatar) {
      return (
        <FlipCard
          sx={{ width: "100%", aspectRatio: "1/1" }}
          frontContent={
            <AvatarTooltip title="click to view heartbeat">
              <PictureAvatar src={generateAvatarURL(data.avatar)}></PictureAvatar>
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
