import { create } from "zustand"

interface CanvasProfileStore {
  cropAvatarDialogVisible: boolean
  previewAvatarURL: any
  NFTsDialogVisible: boolean
  editProfileVisible: boolean

  changeCropAvatarDialogVisible: (visible: boolean) => void
  changePreviewAvatarURL: (base64: any) => void
  changeNFTsDialogVisible: (visible: boolean) => void
  changeEditProfileVisible: (editProfileVisible: boolean) => void
}

const useCanvasProfileStore = create<CanvasProfileStore>()((set, get) => ({
  cropAvatarDialogVisible: false,
  previewAvatarURL: null,
  NFTsDialogVisible: false,
  editProfileVisible: false,

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
  changeNFTsDialogVisible: NFTsDialogVisible => {
    set({
      NFTsDialogVisible,
    })
  },
  changeEditProfileVisible: (editProfileVisible: boolean) => {
    set({
      editProfileVisible,
    })
  },
}))

export default useCanvasProfileStore
