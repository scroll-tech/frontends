import Img from "react-cool-img"

const PictureAvatar = props => {
  const { src } = props
  return <Img src={src} style={{ borderRadius: "50%" }} placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="avatar" width="100%"></Img>
}

export default PictureAvatar
