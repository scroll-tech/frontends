import { useQueryClient } from "@tanstack/react-query"
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

  const { perksDialogVisible, changePerksDialogVisible, userBadges } = useCanvasStore()
  const { changeNFTsDialogType, changeENSSubdomainDialogType } = useCanvasProfileStore()
  const { perks, generatePerks } = usePerkStore()
  const queryClient = useQueryClient()

  const ensSubdomain = queryClient.getQueryData(["ensSubdomain", walletCurrentAddress])

  useEffect(() => {
    generatePerks({ walletCurrentAddress, userBadges, ensClaimed: !!ensSubdomain })
  }, [walletCurrentAddress, userBadges, ensSubdomain])

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
      onClose={handleClosePerksDialog}
      open={perksDialogVisible}
    >
      <Stack
        sx={{
          height: "100%",
          pt: ["0.8rem", "2.4rem"],
          gap: "2.4rem",
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
