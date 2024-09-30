import Img from "react-cool-img"

import NFTAvatar from "./NFTAvatar"
import PictureAvatar from "./PictureAvatar"

const Avatar = props => {
  const { type, src } = props

  if (type === "NFT") {
    return <NFTAvatar></NFTAvatar>
  }

  if (type === "picture") {
    return <PictureAvatar src={src}></PictureAvatar>
  }
  return <Img src={src} placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="avatar" width="100%"></Img>
}

export default Avatar
