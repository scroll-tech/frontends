import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { CircleStencil } from "react-advanced-cropper"
import "react-advanced-cropper/dist/style.css"
import { useWalletClient } from "wagmi"

import { Stack } from "@mui/material"

import { setCanvasAvatarURL } from "@/apis/canvas"
import LoadingButton from "@/components/LoadingButton"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore from "@/stores/canvasProfileStore"
import { calculateSHA256FromBlob, generateTypedData } from "@/utils"

import AvatarCropper from "./AvatarCropper"

interface MutationVariables {
  walletAddress: `0x${string}` | undefined
}

const CropAvatarDialog = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { data: client } = useWalletClient()
  const queryClient = useQueryClient()
  // const { data: client } = useConnectorClient<Config>()
  const { cropAvatarDialogVisible, previewAvatarURL, changeCropAvatarDialogVisible, changeEditAnchorEl } = useCanvasProfileStore()

  const alertWarning = useSnackbar()

  const cropperRef = useRef<any>()

  const { mutateAsync: setImageMutation, isPending } = useMutation({
    mutationFn: ({ walletAddress }: MutationVariables) => {
      return new Promise((resolve, reject) => {
        cropperRef.current.getCanvas()?.toBlob(async blob => {
          try {
            const sha256 = await calculateSHA256FromBlob(blob)
            const signature = await client?.signTypedData(generateTypedData(walletAddress, sha256) as any)
            const formData = new FormData()
            formData.append("sha256", sha256)
            formData.append("signature", signature || "")
            formData.append("image", blob)
            const { avatar } = await scrollRequest(setCanvasAvatarURL(walletAddress), {
              method: "POST",
              body: formData,
            })
            resolve(avatar)
          } catch (e) {
            reject(e)
          }
        })
      })
    },
    onSuccess: data => {
      handleCloseCropAvatarDialog()
      changeEditAnchorEl(null)
      queryClient.invalidateQueries({
        queryKey: ["canvasAvatar"],
      })
    },
    onError: error => {
      alertWarning("Something went wrong, please try again later.")
    },
  })

  const handleCloseCropAvatarDialog = () => {
    changeCropAvatarDialogVisible(false)
  }

  const handleApplyAvatar = () => {
    setImageMutation({ walletAddress: walletCurrentAddress })
  }

  return (
    <Dialog title="Edit profile" open={!!cropAvatarDialogVisible} onClose={handleCloseCropAvatarDialog}>
      <Stack justifyContent="center" alignItems="center" sx={{ mt: "7.2rem", mb: "8.8rem" }}>
        <AvatarCropper
          src={previewAvatarURL}
          ref={cropperRef}
          stencilComponent={CircleStencil}
          stencilSize={{
            width: 320,
            height: 320,
          }}
          boundaryClassName="canvas-avatar-cropper"
          stencilProps={{ aspectRatio: 1 / 1 }}
        ></AvatarCropper>
      </Stack>
      <LoadingButton loading={isPending} sx={{ borderRadius: "0.8rem", width: "100%", fontSize: "2rem", padding: 0 }} onClick={handleApplyAvatar}>
        Sign and Apply
      </LoadingButton>
    </Dialog>
  )
}

export default CropAvatarDialog
