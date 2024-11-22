import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore, { NFTsDialogTypeEnum } from "@/stores/canvasProfileStore"
import useCanvasStore from "@/stores/canvasStore"

import SetUpNFTProfile from "./SetUpNFTProfile"
import ViewNFTs from "./ViewNFTs"

const NFTsDialog = () => {
  const { NFTsDialogType, NFTsDialogAllowBack, changeNFTsDialogType } = useCanvasProfileStore()

  const { changePerksDialogVisible } = useCanvasStore()

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
        },
      }}
      allowBack={NFTsDialogAllowBack}
      onBack={handleBackPerksDialog}
      contentSx={{ overflow: "visible" }}
      open={NFTsDialogType !== NFTsDialogTypeEnum.HIDDEN}
      onClose={handleCloseNFTsDialog}
    >
      {NFTsDialogType === NFTsDialogTypeEnum.CLAIM && <SetUpNFTProfile></SetUpNFTProfile>}
      {NFTsDialogType === NFTsDialogTypeEnum.SET_UP && <ViewNFTs></ViewNFTs>}
    </Dialog>
  )
}

export default NFTsDialog
