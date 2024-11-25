import { Stack } from "@mui/material"

import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore, { ENSSubdomainDialogTypeEnum } from "@/stores/canvasProfileStore"
import useCanvasStore from "@/stores/canvasStore"

import ClaimENS from "./ClaimENS"
import CongratsENS from "./CongratsENS"
import CreateENS from "./CreateENS"

const ENSSubdomainDialog = () => {
  const { changeENSSubdomainDialogType, ENSSubdomainDialogType, ENSSubdomainDialogAllowBack } = useCanvasProfileStore()
  const { changePerksDialogVisible } = useCanvasStore()

  const handleClose = () => {
    changeENSSubdomainDialogType(ENSSubdomainDialogTypeEnum.HIDDEN)
  }

  const handleBack = () => {
    if (ENSSubdomainDialogType === ENSSubdomainDialogTypeEnum.CLAIM) {
      changeENSSubdomainDialogType(ENSSubdomainDialogTypeEnum.HIDDEN)
      changePerksDialogVisible(true)
    } else if (ENSSubdomainDialogType === ENSSubdomainDialogTypeEnum.CREATE_SUBDOMAIN) {
      changeENSSubdomainDialogType(ENSSubdomainDialogTypeEnum.CLAIM, true)
    }
  }

  return (
    <Dialog
      allowBack={ENSSubdomainDialogAllowBack}
      onBack={handleBack}
      sx={{
        "& .MuiDialog-paper": {
          height: "76rem",
          width: "64rem",
          padding: "2.4rem 3.2rem 3.2rem",
        },
      }}
      contentSx={{ overflow: "visible" }}
      onClose={handleClose}
      open={!!ENSSubdomainDialogType}
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
        {ENSSubdomainDialogType === ENSSubdomainDialogTypeEnum.CLAIM && <ClaimENS></ClaimENS>}
        {[ENSSubdomainDialogTypeEnum.CREATE_SUBDOMAIN, ENSSubdomainDialogTypeEnum.UPDATE_SUBDOMAIN].includes(ENSSubdomainDialogType) && (
          <CreateENS></CreateENS>
        )}
        {ENSSubdomainDialogType === ENSSubdomainDialogTypeEnum.SUCCESS && <CongratsENS></CongratsENS>}
      </Stack>
    </Dialog>
  )
}

export default ENSSubdomainDialog
