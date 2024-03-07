import { Contract } from "ethers"
import { create } from "zustand"

import { fetchSkellyDetail, getAttachedBadges, querySkellyUsername, queryUserBadgesWrapped } from "@/services/skellyService"

export enum MintStep {
  REFERRAL_CODE = "referralCode",
  NAME = "name",
}

export enum MintedStatus {
  MINTED = "MINTED",
  NOT_MINTED = "NOT_MINTED",
  UNKNOWN = "UNKNOWN",
}

export enum BadgeDetailDialogTpye {
  HIDDEN = "",
  MINT = "mint",
  MINT_WITH_BACK = "mintWithBack",
  MINTED = "minted",
  UPGRADE = "upgrade",
  VIEW = "view",
  NO_PROFILE = "noProfile",
}

interface SkellyStore {
  // /invite/referralCode
  referralCode: string
  profileDialogVisible: boolean
  referDialogVisible: boolean
  badgesDialogVisible: boolean
  upgradeDialogVisible: boolean
  badgeDetailDialogVisible: BadgeDetailDialogTpye
  mintStep: MintStep
  sortedBadges: any
  selectedBadge: any

  changeReferralCode: (code: string) => void
  changeMintStep: (step: MintStep) => void
  changeProfileDialog: (visible: boolean) => void
  changeReferDialog: (visible: boolean) => void
  changeBadgesDialog: (visible: boolean) => void
  changeSortedBadges: (badges: any) => void
  changeUpgradeDialog: (visible: boolean) => void
  changeBadgeDetailDialog: (visible: BadgeDetailDialogTpye) => void
  changeSelectedBadge: (badge: any) => void

  profileMintedLoading: boolean
  profileDetailLoading: boolean
  walletDetailLoading: boolean
  queryUsernameLoading: boolean
  queryUserBadgesLoading: boolean
  profileAddress: string | null
  profileMinted: boolean | null
  username: string
  skellyUsername: string
  userBadges: Array<any>
  attachedBadges: Array<any>
  badgeOrder: Array<any>
  profileContract: Contract | null

  checkIfProfileMinted: (instance: Contract, address: string) => Promise<any>
  fetchCurrentSkellyDetail: (signer, walletAddress, profileAddress) => void
  checkAndFetchCurrentWalletSkelly: (prividerOrSigner, unsignedProfileRegistryContract, walletAddress) => void
  fetchOthersSkellyDetail: (prividerOrSigner, othersAddress, profileAddress) => void
  changeProfileMintedLoading: (loading: boolean) => void
  changeProfileDetailLoading: (loading: boolean) => void
  queryUsername: () => void
  queryAttachedBadges: () => void
  queryVisibleBadges: (provider, address) => void
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
  selectedBadge: {},

  // now
  profileAddress: null,
  profileContract: null,
  profileMinted: null,
  profileMintedLoading: false,
  profileDetailLoading: false,
  queryUsernameLoading: false,
  walletDetailLoading: false,
  queryUserBadgesLoading: false,
  username: "",
  skellyUsername: "",
  userBadges: [],
  attachedBadges: [],
  badgeOrder: [],

  checkIfProfileMinted: async (registryInstance, userAddress) => {
    try {
      set({
        profileMintedLoading: true,
        profileAddress: "",
      })
      const profileAddress = await registryInstance!.getProfile(userAddress)
      const profileMinted = await registryInstance!.isProfileMinted(profileAddress)
      set({
        profileAddress,
        profileMinted,
        profileMintedLoading: false,
      })
      return { profileAddress, minted: profileMinted }
    } catch (error) {
      console.log("Failed to check if profile minted:", error)

      set({
        profileAddress: "",
        profileMinted: false,
        profileMintedLoading: false,
      })
      return { profileAddress: null, minted: null }
    }
  },
  fetchOthersSkellyDetail: async (privider, othersAddress, profileAddress) => {
    const { name, userBadges, attachedBadges, badgeOrder } = await fetchSkellyDetail(privider, othersAddress, profileAddress)
    set({
      skellyUsername: name,
      userBadges,
      attachedBadges,
      badgeOrder,
    })
  },

  // fetch wallet profile when viewing others skelly
  checkAndFetchCurrentWalletSkelly: async (prividerOrSigner, unsignedProfileRegistryContract, walletAddress) => {
    set({
      walletDetailLoading: true,
    })
    const { minted, profileAddress } = await get().checkIfProfileMinted(unsignedProfileRegistryContract, walletAddress)

    if (minted) {
      const { profileContract, name } = await querySkellyUsername(prividerOrSigner, profileAddress)
      set({
        username: name,
        profileContract,
        walletDetailLoading: false,
      })
    } else {
      set({
        username: "",
        profileContract: null,
        walletDetailLoading: false,
      })
    }
  },

  fetchCurrentSkellyDetail: async (signer, walletAddress, profileAddress) => {
    const { name, profileContract, userBadges, attachedBadges, badgeOrder } = await fetchSkellyDetail(signer, walletAddress, profileAddress)
    set({
      username: name,
      skellyUsername: name,
      profileContract,
      userBadges,
      attachedBadges,
      badgeOrder,
    })
  },

  changeProfileMintedLoading: profileMintedLoading => {
    set({
      profileMintedLoading,
    })
  },

  changeProfileDetailLoading: profileDetailLoading => {
    set({
      profileDetailLoading,
    })
  },

  clearStates: () => {
    set({
      referralCode: "",
      mintStep: MintStep.REFERRAL_CODE,
      // not sure
      profileMinted: null,
      username: "",
      skellyUsername: "",
      userBadges: [],
      attachedBadges: [],
      badgeOrder: [],
    })
  },

  queryUsername: async () => {
    set({
      queryUsernameLoading: true,
    })
    const username = await get().profileContract!.username()
    set({
      username,
      skellyUsername: username,
      queryUsernameLoading: false,
    })
  },

  queryAttachedBadges: async () => {
    const badges = await getAttachedBadges(get().profileContract)
    set({
      attachedBadges: badges,
    })
  },

  queryVisibleBadges: async (provider, walletAddress) => {
    set({
      queryUserBadgesLoading: true,
    })
    const userBadges = await queryUserBadgesWrapped(provider, walletAddress)
    const attachedBadges = await getAttachedBadges(get().profileContract)
    set({
      userBadges,
      attachedBadges,
      queryUserBadgesLoading: false,
    })
  },

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

  changeSelectedBadge: badge => {
    set({
      selectedBadge: badge,
    })
  },
}))

export default useSkellyStore
