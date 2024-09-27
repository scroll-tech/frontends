import { useEffect } from "react"

import { Stack } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasStore from "@/stores/canvasStore"
import usePerkStore from "@/stores/perksStore"

import PerkItem from "./PerkItem"

const PerksDialog = () => {
  const { perksDialogVisible, changePerksDialogVisible, changeEnsSubdomainDialogVisible, userBadges } = useCanvasStore()
  const { walletCurrentAddress } = useRainbowContext()
  const { perks, generatePerks } = usePerkStore()

  useEffect(() => {
    generatePerks({ walletCurrentAddress, userBadges, changeEnsSubdomainDialogVisible })
  }, [walletCurrentAddress, userBadges])

  // const handleShowENSSubdomainDialog = () => {
  //   changeEnsSubdomainDialogVisible(EnsSubdomainDialogType.CLAIM)
  // }

  const handleClose = () => {
    changePerksDialogVisible(false)
  }

  return (
    <Dialog
      title="Scroll Perks"
      sx={{
        "& .MuiDialog-paper": {
          height: "76rem",
        },
      }}
      onClose={handleClose}
      open={perksDialogVisible}
    >
      <Stack maxWidth="57.6rem" mt={"2.4rem"} gap={"2.4rem"}>
        {perks.map((perk, index) => (
          <PerkItem perk={perk} key={index} />
        ))}
      </Stack>
    </Dialog>
  )
}

export default PerksDialog
