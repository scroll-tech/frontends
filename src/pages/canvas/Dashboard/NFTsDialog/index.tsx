import { Stack } from "@mui/material"

import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore, { NFTsDialogTypeEnum } from "@/stores/canvasProfileStore"
import usePerkStore from "@/stores/perksStore"

import SetUpNFTProfile from "./SetUpNFTProfile"
import ViewNFTs from "./ViewNFTs"

const NFTsDialog = () => {
  const { NFTsDialogType, NFTsDialogAllowBack, changeNFTsDialogType } = useCanvasProfileStore()

  const { changePerksDialogVisible } = usePerkStore()

  const handleCloseNFTsDialog = () => {
    changeNFTsDialogType(NFTsDialogTypeEnum.HIDDEN)
  }

  const handleBackPerksDialog = () => {
    changeNFTsDialogType(NFTsDialogTypeEnum.HIDDEN)
    changePerksDialogVisible(true)
  }

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          height: "76rem",
          width: "64rem",
          padding: "2.4rem 3.2rem 3.2rem",
        },
      }}
      allowBack={NFTsDialogAllowBack}
      onBack={handleBackPerksDialog}
      contentSx={{ overflow: "visible" }}
      open={NFTsDialogType !== NFTsDialogTypeEnum.HIDDEN}
      onClose={handleCloseNFTsDialog}
    >
      <Stack
        direction="column"
        sx={{
          height: "100%",
          width: "100%",
          py: "0.8rem",
          alignItems: "center",
        }}
        textAlign="center"
      >
        {NFTsDialogType === NFTsDialogTypeEnum.CLAIM && <SetUpNFTProfile></SetUpNFTProfile>}
        {NFTsDialogType === NFTsDialogTypeEnum.SET_UP && <ViewNFTs></ViewNFTs>}
      </Stack>
    </Dialog>
  )
}

export default NFTsDialog
