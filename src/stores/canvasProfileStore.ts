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
    contractAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
    tokenId: "31703445546616290914096692282728113635967647495258376160375559125425176182874",
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
