import { Stack } from "@mui/material"

import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore, { EnsSubdomainDialogTypeEnum } from "@/stores/canvasProfileStore"
import useCanvasStore from "@/stores/canvasStore"

import ClaimENS from "./ClaimENS"
import CongratsENS from "./CongratsENS"
import CreateENS from "./CreateENS"

const ENSSubdomainDialog = () => {
  const { changeEnsSubdomainDialogType, ensSubdomainDialogType, ensSubdomainDialogAllowBack } = useCanvasProfileStore()
  const { changePerksDialogVisible } = useCanvasStore()

  const handleClose = () => {
    changeEnsSubdomainDialogType(EnsSubdomainDialogTypeEnum.HIDDEN)
  }

  const handleBack = () => {
    if (ensSubdomainDialogType === EnsSubdomainDialogTypeEnum.CLAIM) {
      changeEnsSubdomainDialogType(EnsSubdomainDialogTypeEnum.HIDDEN)
      changePerksDialogVisible(true)
    } else if (ensSubdomainDialogType === EnsSubdomainDialogTypeEnum.CREATE_SUBDOMAIN) {
      changeEnsSubdomainDialogType(EnsSubdomainDialogTypeEnum.CLAIM, true)
    }
  }

  return (
    <Dialog
      allowBack={ensSubdomainDialogAllowBack}
      onBack={handleBack}
      sx={{
        "& .MuiDialog-paper": {
          height: "76rem",
          width: "64rem",
        },
      }}
      contentSx={{ overflow: "visible" }}
      onClose={handleClose}
      open={!!ensSubdomainDialogType}
    >
      <Stack direction="column" maxWidth="57.6rem" py={["0.8rem"]} alignItems="center" height="100%" textAlign="center">
        {ensSubdomainDialogType === EnsSubdomainDialogTypeEnum.CLAIM && <ClaimENS></ClaimENS>}
        {[EnsSubdomainDialogTypeEnum.CREATE_SUBDOMAIN, EnsSubdomainDialogTypeEnum.UPDATE_SUBDOMAIN].includes(ensSubdomainDialogType) && (
          <CreateENS></CreateENS>
        )}
        {ensSubdomainDialogType === EnsSubdomainDialogTypeEnum.SUCCESS && <CongratsENS></CongratsENS>}
      </Stack>
    </Dialog>
  )
}

export default ENSSubdomainDialog
