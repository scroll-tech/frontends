import { useQueryClient } from "@tanstack/react-query"
import "@tanstack/react-query"
import { isNil } from "lodash"
import { useEffect } from "react"

import { Stack } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore, { ENSSubdomainDialogTypeEnum, NFTsDialogTypeEnum } from "@/stores/canvasProfileStore"
import useCanvasStore from "@/stores/canvasStore"
import usePerkStore from "@/stores/perksStore"

import PerkItem from "./PerkItem"

const PerksDialog = () => {
  const { walletCurrentAddress } = useRainbowContext()

  const { userBadges } = useCanvasStore()
  const { changeNFTsDialogType, changeENSSubdomainDialogType } = useCanvasProfileStore()
  const { perksDialogVisible, changePerksDialogVisible, perks, generatePerks, appendNewPerksIds, newPerksIds } = usePerkStore()
  const queryClient = useQueryClient()

  const ensSubdomain = queryClient.getQueryData(["ensSubdomain", walletCurrentAddress])

  const avatarObj = queryClient.getQueryData(["canvasAvatar", walletCurrentAddress])

  useEffect(() => {
    if (!isNil(ensSubdomain) && avatarObj) {
      generatePerks({ walletCurrentAddress, userBadges, ensClaimed: !!ensSubdomain, nftClaimed: Boolean((avatarObj as any)?.nftAvatarClaimed) })
    }
  }, [walletCurrentAddress, userBadges, ensSubdomain, avatarObj])

  const actionList = [
    {
      id: "claim-ens-subdomain",
      action: () => {
        changeENSSubdomainDialogType(ENSSubdomainDialogTypeEnum.CLAIM, true)
        handleClosePerksDialog()
      },
    },
    {
      id: "nft-profile-setup",
      action: () => {
        changeNFTsDialogType(NFTsDialogTypeEnum.CLAIM, true)
        handleClosePerksDialog()
      },
    },
  ]

  const pickPerkAction = id => {
    const actionItem = actionList.find(item => item.id === id)
    if (actionItem) {
      return actionItem.action
    }
    return () => void 0
  }

  const handleClosePerksDialog = () => {
    changePerksDialogVisible(false)
    if (newPerksIds.length > 0) {
      appendNewPerksIds()
    }
  }

  return (
    <Dialog
      title="Scroll Perks"
      sx={{
        "& .MuiDialog-paper": {
          height: "76rem",
          width: "64rem",
          padding: "2.4rem 3.2rem 3.2rem",
        },
      }}
      contentSx={{ overflow: "visible", pt: ["0.8rem !important", "2.4rem !important"] }}
      onClose={handleClosePerksDialog}
      open={perksDialogVisible}
    >
      <Stack
        sx={{
          height: "100%",

          width: ["calc(100% + 4rem)", "calc(100% + 6.4rem)"],
          px: ["2rem", "3.2rem"],
          ml: ["-2rem", "-3.2rem"],
          gap: "2.4rem",
          overflowY: "auto",
        }}
      >
        {perks.map((perk, index) => (
          <PerkItem perk={perk} key={index} onClick={pickPerkAction(perk.id)} />
        ))}
      </Stack>
    </Dialog>
  )
}

export default PerksDialog
