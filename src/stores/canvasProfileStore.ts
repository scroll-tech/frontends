import { create } from "zustand"

export enum NFTsDialogTypeEnum {
  HIDDEN = "",
  CLAIM = "claim",
  SET_UP = "set-up",
}

export enum ENSSubdomainDialogTypeEnum {
  HIDDEN = "",
  CLAIM = "claim",
  CREATE_SUBDOMAIN = "create",
  UPDATE_SUBDOMAIN = "update",
  SUCCESS = "success",
}

interface CanvasProfileStore {
  cropAvatarDialogVisible: boolean
  previewAvatarURL: any

  ENSSubdomainDialogType: ENSSubdomainDialogTypeEnum
  ENSSubdomainDialogAllowBack: boolean

  NFTsDialogType: NFTsDialogTypeEnum
  NFTsDialogAllowBack: boolean
  editProfileVisible: boolean
  NFTImageURL: string

  changeCropAvatarDialogVisible: (visible: boolean) => void
  changePreviewAvatarURL: (base64: any) => void
  changeENSSubdomainDialogType: (type: ENSSubdomainDialogTypeEnum, allowBack?: boolean) => void
  changeNFTsDialogType: (type: NFTsDialogTypeEnum, allowBack?: boolean) => void
  changeEditProfileVisible: (editProfileVisible: boolean) => void
  changeNFTImageURL: (NFTImageURL: string) => void
}

const useCanvasProfileStore = create<CanvasProfileStore>()((set, get) => ({
  cropAvatarDialogVisible: false,
  previewAvatarURL: null,
  ENSSubdomainDialogType: ENSSubdomainDialogTypeEnum.HIDDEN,
  ENSSubdomainDialogAllowBack: false,
  NFTsDialogType: NFTsDialogTypeEnum.HIDDEN,
  NFTsDialogAllowBack: false,
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

  changeNFTsDialogType: (NFTsDialogType: NFTsDialogTypeEnum, allowBack: boolean = false) => {
    set({
      NFTsDialogType,
      NFTsDialogAllowBack: allowBack,
    })
  },

  changeENSSubdomainDialogType: (visible: ENSSubdomainDialogTypeEnum, allowBack: boolean = false) => {
    set({
      ENSSubdomainDialogType: visible,
      ENSSubdomainDialogAllowBack: allowBack,
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
