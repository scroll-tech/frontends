import { useRef, useState } from "react"
import { CircleStencil } from "react-advanced-cropper"
import "react-advanced-cropper/dist/style.css"
import Img from "react-cool-img"

import { Stack } from "@mui/material"

import Button from "@/pages/canvas/components/Button"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore from "@/stores/canvasProfileStore"

import AvatarCropper from "./AvatarCropper"

const CropAvatarDialog = () => {
  const { cropAvatarDialogVisible, previewAvatarURL, changeCropAvatarDialogVisible } = useCanvasProfileStore()

  const [previewImg, setPreviewImg] = useState("")
  const cropperRef = useRef<any>()
  const handleClose = () => {
    changeCropAvatarDialogVisible(false)
  }

  const handleApplyAvatar = () => {
    const croppedAvatarUrl = cropperRef.current.getCanvas()?.toDataURL()
    setPreviewImg(croppedAvatarUrl)

    const base64Data = croppedAvatarUrl.replace(/^data:image\/png;base64,/, "") // 移除前缀
    const buffer = Buffer.from(base64Data, "base64")
    console.log(buffer, "buffer")
  }

  return (
    <Dialog title="Edit profile" open={!!cropAvatarDialogVisible} onClose={handleClose}>
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
      <Button
        color="primary"
        variant="contained"
        sx={{ borderRadius: "0.8rem", width: "100%", fontSize: "2rem", padding: 0 }}
        onClick={handleApplyAvatar}
      >
        Apply
      </Button>
      <Img src={previewImg} width={300} height={300}></Img>
    </Dialog>
  )
}

export default CropAvatarDialog
