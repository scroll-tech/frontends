import { create } from "zustand"

interface CanvasProfileStore {
  cropAvatarDialogVisible: boolean
  previewAvatarURL: any
  NFTsDialogVisible: boolean
  editAnchorEl: HTMLElement | null

  changeCropAvatarDialogVisible: (visible: boolean) => void
  changePreviewAvatarURL: (base64: any) => void
  changeNFTsDialogVisible: (visible: boolean) => void
  changeEditAnchorEl: (editAnchorEl: HTMLElement | null) => void
}

const useCanvasProfileStore = create<CanvasProfileStore>()((set, get) => ({
  cropAvatarDialogVisible: false,
  previewAvatarURL: null,
  NFTsDialogVisible: false,
  editAnchorEl: null,

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
  changeEditAnchorEl: (editAnchorEl: HTMLElement | null) => {
    set({
      editAnchorEl,
    })
  },
}))

export default useCanvasProfileStore
