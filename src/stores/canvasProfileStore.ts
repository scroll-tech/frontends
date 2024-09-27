import { create } from "zustand"

interface CanvasProfileStore {
  cropAvatarDialogVisible: boolean
  previewAvatarURL: any

  changeCropAvatarDialogVisible: (visible: boolean) => void
  changePreviewAvatarURL: (base64: any) => void
}

const useCanvasProfileStore = create<CanvasProfileStore>()((set, get) => ({
  cropAvatarDialogVisible: false,
  previewAvatarURL: null,

  changeCropAvatarDialogVisible: cropAvatarDialogVisible => {
    set({
      cropAvatarDialogVisible,
    })
  },
  changePreviewAvatarURL: previewAvatarURL => {
    set({
      previewAvatarURL,
    })
  },
}))

export default useCanvasProfileStore
