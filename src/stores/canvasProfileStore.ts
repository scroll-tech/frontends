import { create } from "zustand"

interface CanvasProfileStore {
  cropAvatarDialogVisible: boolean
  previewAvatarURL: any

  NFTsDialogVisible: boolean
  NFT: any

  changeCropAvatarDialogVisible: (visible: boolean) => void
  changePreviewAvatarURL: (base64: any) => void

  changeNFTsDialogVisible: (visible: boolean) => void

  changeNFT: (NFT: any) => void
}

const useCanvasProfileStore = create<CanvasProfileStore>()((set, get) => ({
  cropAvatarDialogVisible: false,
  previewAvatarURL: null,
  NFTsDialogVisible: false,
  NFT: {
    contractType: "ERC1155",
    contractAddress: "0x574344045f02405959895404afde61ebb11a27e9",
    tokenId: "4",
  },

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

  // TODO: delete
  changeNFT: NFT => {
    set({
      NFT,
    })
  },
}))

export default useCanvasProfileStore
