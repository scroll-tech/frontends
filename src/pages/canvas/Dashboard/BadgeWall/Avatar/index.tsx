import { useQuery } from "@tanstack/react-query"
import Img from "react-cool-img"

import { fetchAvatarURL, generateAvatarURL } from "@/apis/canvas"
import { useRainbowContext } from "@/contexts/RainbowProvider"

import NFTAvatar from "./NFTAvatar"
import PictureAvatar from "./PictureAvatar"

const Avatar = props => {
  const { src } = props

  const { walletCurrentAddress } = useRainbowContext()

  const { data, isFetching } = useQuery({
    queryKey: ["canvasAvatar", walletCurrentAddress],
    queryFn: async () => {
      return await scrollRequest(fetchAvatarURL(walletCurrentAddress))
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  if (isFetching) {
    return <Img src="/imgs/canvas/badgePlaceholder.svg" alt="avatar-loading" width="100%"></Img>
  }

  if (data?.tokenID) {
    return <NFTAvatar contractType={data?.contractType} contractAddress={data?.contract} tokenId={data?.tokenID}></NFTAvatar>
  }

  if (data?.avatar) {
    return <PictureAvatar src={generateAvatarURL(data.avatar)}></PictureAvatar>
  }

  return <Img src={src} placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="avatar" width="100%"></Img>
}

export default Avatar
