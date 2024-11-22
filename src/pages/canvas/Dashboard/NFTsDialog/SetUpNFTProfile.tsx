import Img from "react-cool-img"

import { Stack, Typography } from "@mui/material"

import AdvertisingNFT1 from "@/assets/images/canvas/advertising-nft-1.webp"
import AdvertisingNFT2 from "@/assets/images/canvas/advertising-nft-2.png"
import AdvertisingNFT3 from "@/assets/images/canvas/advertising-nft-3.webp"
import LoadingButton from "@/components/LoadingButton"
import useCanvasProfileStore, { NFTsDialogTypeEnum } from "@/stores/canvasProfileStore"

import NFTAvatar from "../BadgeWall/Avatar/NFTAvatar"

const ADVERTISING_NFT_LIST = [
  { url: AdvertisingNFT1, rotate: "-15deg", y: "15%", x: "8%" },
  { url: AdvertisingNFT2, rotate: "0deg", y: "0", zIndex: 1 },
  { url: AdvertisingNFT3, rotate: "15deg", y: "15%", x: "-8%" },
]

const SetUpNFTProfile = props => {
  const { changeNFTsDialogType } = useCanvasProfileStore()

  const handleGoToConfirm = () => {
    changeNFTsDialogType(NFTsDialogTypeEnum.SET_UP)
  }

  return (
    <Stack direction="column" alignItems="center" sx={{ textAlign: "center" }}>
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600, color: "primary.contrastText", mt: "0.8rem" }}>
        Set up an NFT profile
      </Typography>
      <Typography
        sx={{
          fontSize: "1.8rem",
          lineHeight: "2.8rem",
          fontWeight: 500,

          color: "primary.contrastText",
          mt: "0.8rem",
          maxWidth: "50rem",
        }}
      >
        Set your profile picture to an NFT you own to show off your prized possessions.
      </Typography>
      <Stack direction="row" sx={{ mt: "6.8rem" }}>
        {ADVERTISING_NFT_LIST.map(({ url, rotate, x, y, zIndex }) => (
          <NFTAvatar
            sx={{
              width: "15.6rem",
              aspectRatio: "1/1",
              borderRadius: "1.6rem",
              zIndex: zIndex ?? 0,
              transform: `translate(${x},${y}) rotate(${rotate})`,
            }}
            src={url}
          ></NFTAvatar>
        ))}
      </Stack>
      <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", color: "primary.contrastText", mt: "6.4rem", mb: "1.6rem" }}>
        Collect Ethereum year badge to qualify.
      </Typography>
      <Img src="/imgs/canvas/Badge_Ethereum_Year.png" width="100px" height="100px"></Img>
      <LoadingButton sx={{ borderRadius: "1rem", width: "100%", height: "5.6rem", fontSize: "2rem", mt: "4.8rem" }} onClick={handleGoToConfirm}>
        Claim Now
      </LoadingButton>
    </Stack>
  )
}

export default SetUpNFTProfile
