import { create } from "zustand"

export enum MintStep {
  REFERRAL_CODE = "referralCode",
  PROFILE = "profile",
}

export enum BadgeDetailDialogTpye {
  HIDDEN = "",
  MINT = "mint",
  MINTED = "minted",
  UPGRADE = "upgrade",
  VIEW = "view",
}

interface SkellyStore {
  referralCode: string
  profileDialogVisible: boolean
  referDialogVisible: boolean
  badgesDialogVisible: boolean
  upgradeDialogVisible: boolean
  badgeDetailDialogVisible: BadgeDetailDialogTpye
  mintStep: MintStep
  sortedBadges: any
  changeReferralCode: (code: string) => void
  changeMintStep: (step: MintStep) => void
  changeProfileDialog: (visible: boolean) => void
  changeReferDialog: (visible: boolean) => void
  changeBadgesDialog: (visible: boolean) => void
  changeSortedBadges: (badges: any) => void
  changeUpgradeDialog: (visible: boolean) => void
  changeBadgeDetailDialog: (visible: BadgeDetailDialogTpye) => void
}

const useSkellyStore = create<SkellyStore>()((set, get) => ({
  referralCode: "",
  profileDialogVisible: false,
  referDialogVisible: false,
  badgesDialogVisible: false,
  upgradeDialogVisible: false,
  badgeDetailDialogVisible: BadgeDetailDialogTpye.HIDDEN,
  mintStep: MintStep.REFERRAL_CODE,
  sortedBadges: {},

  changeSortedBadges: (badges: any) => {
    set({
      sortedBadges: badges,
    })
  },
  changeReferralCode: code => {
    set({
      referralCode: code,
    })
  },

  changeMintStep: step => {
    set({
      mintStep: step,
    })
  },

  changeProfileDialog: visible => {
    set({
      profileDialogVisible: visible,
    })
  },

  changeReferDialog: visible => {
    set({
      referDialogVisible: visible,
    })
  },

  changeBadgesDialog: visible => {
    set({
      badgesDialogVisible: visible,
    })
  },

  changeUpgradeDialog: visible => {
    set({
      upgradeDialogVisible: visible,
    })
  },

  changeBadgeDetailDialog: visible => {
    set({
      badgeDetailDialogVisible: visible,
    })
  },
}))

export default useSkellyStore
