import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { CircleStencil } from "react-advanced-cropper"
import "react-advanced-cropper/dist/style.css"
import { useWalletClient } from "wagmi"

import { Stack, Typography } from "@mui/material"

import { setCanvasAvatarURL } from "@/apis/canvas-profile"
import { CANVAS_AVATAR_MAX_SIZE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSnackbar from "@/hooks/useSnackbar"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore from "@/stores/canvasProfileStore"
import { calculateSHA256FromBlob, generateTypedData } from "@/utils"

import PerksButton from "../../components/PerksButton"
import AvatarCropper from "./AvatarCropper"

interface MutationVariables {
  walletAddress: `0x${string}` | undefined
}

const CropAvatarDialog = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { data: client } = useWalletClient()
  const queryClient = useQueryClient()

  const { isMobile } = useCheckViewport()

  const { cropAvatarDialogVisible, previewAvatarURL, changeCropAvatarDialogVisible, changeEditProfileVisible } = useCanvasProfileStore()

  const alertWarning = useSnackbar()

  const cropperRef = useRef<any>()

  const { mutateAsync: setImageMutation, isPending } = useMutation({
    mutationFn: ({ walletAddress }: MutationVariables) => {
      return new Promise((resolve, reject) => {
        cropperRef.current.getCanvas()?.toBlob(async blob => {
          try {
            if (blob.size > CANVAS_AVATAR_MAX_SIZE) {
              reject(new Error("The image size is too large. please try again with a smaller image."))
            }
            const sha256 = await calculateSHA256FromBlob(blob)
            const timestamp = Date.now().toString()
            const signature = await client?.signTypedData(generateTypedData(walletAddress, sha256, undefined, undefined, timestamp) as any)
            const formData = new FormData()
            formData.append("sha256", sha256)
            formData.append("signature", signature || "")
            formData.append("image", blob)
            formData.append("timestamp", timestamp)

            const { avatar } = await scrollRequest(setCanvasAvatarURL(walletAddress), {
              method: "POST",
              body: formData,
            })
            resolve(avatar)
          } catch (e) {
            reject(e)
          }
        }, "image/webp")
      })
    },
    onSuccess: data => {
      handleCloseCropAvatarDialog()
      const canvasAvatar = queryClient.getQueryData(["canvasAvatar", walletCurrentAddress])
      queryClient.setQueryData(["canvasAvatar", walletCurrentAddress], {
        avatar: data,
        nftAvatarClaimed: Boolean((canvasAvatar as any)?.nftAvatarClaimed),
      })
      // queryClient.invalidateQueries({
      //   queryKey: ["canvasAvatar", walletCurrentAddress],
      // })
      changeEditProfileVisible(false)
    },
    onError: error => {
      if (error.name !== "UserRejectedRequestError") {
        alertWarning(error.message)
        // alertWarning("Something went wrong, please try again later.")
      }
    },
  })

  const handleCloseCropAvatarDialog = () => {
    changeCropAvatarDialogVisible(false)
  }

  const handleApplyAvatar = () => {
    setImageMutation({ walletAddress: walletCurrentAddress })
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
      open={!!cropAvatarDialogVisible}
      onClose={handleCloseCropAvatarDialog}
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
        <Typography sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], fontWeight: 600, color: "primary.contrastText" }}>
          Edit profile
        </Typography>
        <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
          <AvatarCropper
            src={previewAvatarURL}
            ref={cropperRef}
            stencilComponent={CircleStencil}
            stencilSize={{
              width: isMobile ? 240 : 320,
              height: isMobile ? 240 : 320,
            }}
            boundaryClassName="canvas-avatar-cropper"
            stencilProps={{ aspectRatio: 1 / 1 }}
          ></AvatarCropper>
        </Stack>
        <PerksButton sx={{ mt: ["3.2rem", "1.6rem"] }} loading={isPending} onClick={handleApplyAvatar}>
          Sign and Apply
        </PerksButton>
      </Stack>
    </Dialog>
  )
}

export default CropAvatarDialog
