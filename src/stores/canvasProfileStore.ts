import { create } from "zustand"

interface CanvasProfileStore {
  cropAvatarDialogVisible: boolean
  previewAvatarURL: any
  NFTsDialogVisible: boolean
  editProfileVisible: boolean
  NFTImageURL: string

  changeCropAvatarDialogVisible: (visible: boolean) => void
  changePreviewAvatarURL: (base64: any) => void
  changeNFTsDialogVisible: (visible: boolean) => void
  changeEditProfileVisible: (editProfileVisible: boolean) => void
  changeNFTImageURL: (NFTImageURL: string) => void
}

const useCanvasProfileStore = create<CanvasProfileStore>()((set, get) => ({
  cropAvatarDialogVisible: false,
  previewAvatarURL: null,
  NFTsDialogVisible: false,
  editProfileVisible: false,
  NFTImageURL: "",

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
  changeNFTImageURL: (NFTImageURL: string) => {
    set({
      NFTImageURL,
    })
  },
}))

export default useCanvasProfileStore
