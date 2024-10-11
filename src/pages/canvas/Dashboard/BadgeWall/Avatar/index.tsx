import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import Img from "react-cool-img"

import { Box } from "@mui/material"

import { fetchAvatarURL, generateAvatarURL } from "@/apis/canvas"
import { CANVAS_AVATAR_TYPE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"

import Tooltip from "../../../components/Tooltip"
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

  const avatarType = useMemo(() => {
    if (data?.tokenID) {
      return CANVAS_AVATAR_TYPE.NFT
    }
    if (data?.avatar) {
      return CANVAS_AVATAR_TYPE.PICTURE
    }
    return CANVAS_AVATAR_TYPE.HEARTBEAT
  }, [data])

  const renderAvatar = () => {
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

  return (
    <Tooltip
      title={
        <>
          {avatarType !== CANVAS_AVATAR_TYPE.HEARTBEAT && <>click to view heartbeat</>}
          {avatarType === CANVAS_AVATAR_TYPE.HEARTBEAT && (
            <Box sx={{ width: "21.4rem" }}>
              <b>Activity Heartbeat:</b>
              <br></br>
              Heart beats faster when you are more active on Scroll
            </Box>
          )}
        </>
      }
      followCursor
      PopperProps={{
        popperOptions: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: ({ placement, reference, popper }) => {
                  if (placement === "bottom") {
                    return [popper.width / 4, 27]
                  } else {
                    return [popper.width / 4, 12]
                  }
                },
              },
            },
          ],
        },
      }}
    >
      <Box>{renderAvatar()}</Box>
    </Tooltip>
  )
}

export default Avatar
