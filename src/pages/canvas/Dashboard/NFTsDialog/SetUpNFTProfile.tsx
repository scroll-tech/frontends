import { useMemo } from "react"

import { Stack, Typography } from "@mui/material"

import AdvertisingNFT1 from "@/assets/images/canvas/advertising-nft-1.webp"
import AdvertisingNFT2 from "@/assets/images/canvas/advertising-nft-2.png"
import AdvertisingNFT3 from "@/assets/images/canvas/advertising-nft-3.webp"
import useCheckViewport from "@/hooks/useCheckViewport"
import useCanvasProfileStore, { NFTsDialogTypeEnum } from "@/stores/canvasProfileStore"
import usePerkStore from "@/stores/perksStore"

import PerksBadge from "../../components/PerksBadge"
import PerksButton from "../../components/PerksButton"
import PerksClaimedLabel from "../../components/PerksClaimedLabel"
import NFTAvatar from "../BadgeWall/Avatar/NFTAvatar"

const ADVERTISING_NFT_LIST = [
  { url: AdvertisingNFT1, rotate: "-15deg", y: "15%", x: "8%" },
  { url: AdvertisingNFT2, rotate: "0deg", y: "0", zIndex: 1 },
  { url: AdvertisingNFT3, rotate: "15deg", y: "15%", x: "-8%" },
]

const SetUpNFTProfile = props => {
  // NFTsDialogAllowBack means from PerksDialog then prevent from re-claiming
  const { changeNFTsDialogType, NFTsDialogAllowBack } = useCanvasProfileStore()
  const { isMobile } = useCheckViewport()

  const { perks } = usePerkStore()

  const NFTPerk = useMemo(() => perks.find(perk => perk.id === "nft-profile-setup")!, [perks])

  const handleGoToConfirm = () => {
    changeNFTsDialogType(NFTsDialogTypeEnum.SET_UP)
  }

  return (
    <>
      <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["3.2rem", "4.8rem"], fontWeight: 600, color: "primary.contrastText" }}>
        Set up an NFT profile
      </Typography>
      <Typography
        sx={{
          fontSize: ["1.6rem", "1.8rem"],
          lineHeight: ["2.4rem", "2.8rem"],
          color: "primary.contrastText",
          mt: "0.8rem",
          maxWidth: "50rem",
        }}
      >
        Set your profile picture to an NFT you own to show off your prized possessions.
      </Typography>
      <Stack direction="column" alignItems="center" sx={{ flex: 1 }}>
        <Stack direction="row" sx={{ mt: ["5rem", "6.8rem"] }}>
          {ADVERTISING_NFT_LIST.map(({ url, rotate, x, y, zIndex }) => (
            <NFTAvatar
              key={url}
              sx={{
                width: ["9rem", "15.6rem"],
                aspectRatio: "1/1",
                borderRadius: ["1rem", "1.6rem"],
                zIndex: zIndex ?? 0,
                transform: `translate(${x},${y}) rotate(${rotate})`,
              }}
              src={url}
            ></NFTAvatar>
          ))}
        </Stack>
        <Typography
          sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], color: "primary.contrastText", mt: "6.4rem", mb: "1.6rem" }}
        >
          Collect the following badge(s) to qualify:
        </Typography>
        <PerksBadge {...NFTPerk.metadata[0]} width={isMobile ? "56px" : "100px"} height={isMobile ? "56px" : "100px"}></PerksBadge>
      </Stack>

      {NFTPerk.claimed && NFTsDialogAllowBack ? (
        <PerksClaimedLabel sx={{ mt: [0, "4.8rem"] }}></PerksClaimedLabel>
      ) : (
        <PerksButton sx={{ mt: [0, "4.8rem"] }} disabled={!NFTPerk.claimable} onClick={handleGoToConfirm}>
          Claim Now
        </PerksButton>
      )}
    </>
  )
}

export default SetUpNFTProfile
