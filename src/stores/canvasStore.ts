import { Contract } from "ethers"
import produce from "immer"
import { create } from "zustand"

import { Badge, ETHEREUM_YEAR_BADGE } from "@/constants"
import {
  checkBadgeUpgradable,
  fetchCanvasDetail,
  fetchIssuer,
  fetchNotionBadgeByAddr,
  getOrderedAttachedBadges,
  queryCanvasUsername,
  queryUserBadgesWrapped,
  upgradeBadge,
} from "@/services/canvasService"

export enum MintedStatus {
  MINTED = "MINTED",
  NOT_MINTED = "NOT_MINTED",
  UNKNOWN = "UNKNOWN",
}

export enum BadgeDetailDialogType {
  HIDDEN = "",
  MINT = "mint", // not in use, only for third party badge example
  UPGRADE = "upgrade",
  VIEW = "view",
  NO_CANVAS = "noCanvas",
}

export enum BadgesDialogType {
  HIDDEN = "",
  UPGRADE = "upgrade",
}

export type UpgradableBadge = Badge & { upgradable: boolean; id: string }

interface CanvasStore {
  referralCode: string
  profileDialogVisible: boolean
  referDialogVisible: boolean
  customizeDisplayDialogVisible: boolean
  badgeDetailDialogVisible: BadgeDetailDialogType
  badgesDialogVisible: BadgesDialogType

  mintFlowVisible: boolean
  sortedBadges: any
  selectedBadge: any

  changeReferralCode: (code: string) => void
  changeMintFlowVisible: (visible: boolean) => void
  changeProfileDialog: (visible: boolean) => void
  changeReferDialog: (visible: boolean) => void
  changeCustomizeDisplayDialogVisible: (visible: boolean) => void
  changeSortedBadges: (badges: any) => void
  changeBadgesDialogVisible: (visible: BadgesDialogType) => void
  changeBadgeDetailDialog: (visible: BadgeDetailDialogType) => void
  changeSelectedBadge: (badge: any) => void

  profileName: string
  isProfileMinting: boolean
  isBadgeMinting: Map<string, boolean>
  isBadgeUpgrading: Map<string, boolean>
  isFirstBadgeMinting: boolean
  profileMintedChecking: boolean
  profileDetailLoading: boolean
  walletDetailLoading: boolean
  queryUsernameLoading: boolean
  queryUserBadgesLoading: boolean
  pickUpgradableBadgesLoading: boolean
  profileAddress: string | null
  profileMinted: boolean | null
  username: string
  canvasUsername: string
  userBadges: Array<any>
  attachedBadges: Array<string>
  orderedAttachedBadges: Array<string>
  upgradableBadges: Array<UpgradableBadge>
  badgeOrder: Array<any>
  profileContract: Contract | null
  firstBadgeWithPosition: any
  badgeAnimationVisible: boolean
  initialMint: boolean

  inputReferralCode: Array<string>
  badgeList: Array<Badge>

  changeProfileName: (name: string) => void
  changeIsProfileMinting: (isProfileMinting: boolean) => void
  changeIsFirstBadgeMinting: (isFirstBadgeMinting: boolean) => void
  changeIsBadgeMinting: (badgeContract: string, loading: boolean) => void
  changeIsBadgeUpgrading: (id: string, loading: boolean) => void
  checkIfProfileMinted: (instance: Contract, address: string, test?: boolean) => Promise<any>
  fetchCurrentCanvasDetail: (signer: any, walletAddress: string, profileAddress: string) => void
  checkAndFetchCurrentWalletCanvas: (providerOrSigner: any, unsignedProfileRegistryContract: Contract, walletAddress: string) => Promise<any>
  fetchOthersCanvasDetail: (provider: any, othersAddress: string, profileAddress: string) => void
  changeProfileMintedLoading: (loading: boolean) => void
  changeProfileDetailLoading: (loading: boolean) => void
  queryUsername: () => void
  queryAttachedBadges: () => void
  queryVisibleBadges: (provider: any, address: string) => void
  queryUserBadges: (provider: any, address: string) => void
  pickUpgradableBadges: (provider: any) => void
  addFirstBadge: (providerOrSigner: any, badgeId: string, badgeImage: string, badgeContract: string) => void
  clearCanvas: () => void
  recordFirstBadgePosition: (position: any) => void
  changeBadgeAnimationVisible: (visible: boolean) => void
  changeInitialMint: (initialMint: boolean) => void
  queryFirstMintUsername: (provider: any) => void
  changeInputReferralCode: (inputReferralCode: Array<string>) => void
  upgradeBadgeAndRefreshUserBadges: (provider: any, badge: { id: string; badgeContract: string }) => Promise<any>
}

const useCanvasStore = create<CanvasStore>()((set, get) => ({
  referralCode: "",
  profileDialogVisible: false,
  referDialogVisible: false,
  customizeDisplayDialogVisible: false,
  badgeDetailDialogVisible: BadgeDetailDialogType.HIDDEN,
  badgesDialogVisible: BadgesDialogType.HIDDEN,
  sortedBadges: [],
  selectedBadge: {},

  profileAddress: null,
  profileContract: null,
  profileMinted: null,

  mintFlowVisible: false,
  profileName: "",
  isProfileMinting: false,
  isBadgeMinting: new Map(),
  isBadgeUpgrading: new Map(),
  isFirstBadgeMinting: false,
  profileMintedChecking: false,
  profileDetailLoading: false,
  queryUsernameLoading: false,
  walletDetailLoading: false,
  queryUserBadgesLoading: false,
  pickUpgradableBadgesLoading: false,
  username: "",
  canvasUsername: "",
  userBadges: [],
  attachedBadges: [],
  orderedAttachedBadges: [],
  upgradableBadges: [],
  badgeOrder: [],
  firstBadgeWithPosition: {},
  badgeAnimationVisible: false,
  initialMint: false,

  inputReferralCode: ["", "", "", "", ""],

  badgeList: [],

  checkIfProfileMinted: async (registryInstance: Contract, userAddress: string, test?: boolean) => {
    try {
      set({
        profileMintedChecking: true,
      })
      const profileAddress = await registryInstance!.getProfile(userAddress)
      const profileMinted = await registryInstance!.isProfileMinted(profileAddress)
      if (test) {
        set({
          profileAddress,
          profileMinted: true,
          profileMintedChecking: false,
        })
        return { profileAddress, minted: true }
      }
      set({
        profileAddress,
        profileMinted,
        profileMintedChecking: false,
      })
      return { profileAddress, minted: profileMinted }
    } catch (error) {
      console.log("Failed to get wallet profile:", error)

      set({
        profileAddress: "",
        profileMinted: false,
        profileMintedChecking: false,
      })
      throw new Error("Failed to check if profile minted")
    }
  },
  fetchOthersCanvasDetail: async (provider: any, othersAddress: string, profileAddress: string) => {
    const { name, userBadges, attachedBadges, orderedAttachedBadges, badgeOrder } = await fetchCanvasDetail(provider, othersAddress, profileAddress)
    set({
      canvasUsername: name,
      userBadges,
      attachedBadges,
      orderedAttachedBadges,
      badgeOrder,
    })
  },

  checkAndFetchCurrentWalletCanvas: async (providerOrSigner: any, unsignedProfileRegistryContract: Contract, walletAddress: string) => {
    set({
      walletDetailLoading: true,
    })
    try {
      const { minted, profileAddress } = await get().checkIfProfileMinted(unsignedProfileRegistryContract, walletAddress)

      if (minted) {
        const { profileContract, name } = await queryCanvasUsername(providerOrSigner, profileAddress)
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
      return true
    } catch (e) {
      return e.message
    } finally {
      set({
        walletDetailLoading: false,
      })
    }
  },

  fetchCurrentCanvasDetail: async (signer: any, walletAddress: string, profileAddress: string) => {
    const { name, profileContract, userBadges, attachedBadges, orderedAttachedBadges, badgeOrder } = await fetchCanvasDetail(
      signer,
      walletAddress,
      profileAddress,
    )
    set({
      username: name,
      canvasUsername: name,
      profileContract,
      userBadges,
      attachedBadges,
      orderedAttachedBadges,
      badgeOrder,
    })
  },

  changeProfileName: (profileName: string) => {
    set({
      profileName,
    })
  },
  changeIsProfileMinting: (isProfileMinting: boolean) => {
    set({
      isProfileMinting,
    })
  },
  changeIsBadgeMinting: (badgeContract: string, loading: boolean) => {
    const newIsBadgeMinting = new Map(get().isBadgeMinting)
    if (loading) {
      newIsBadgeMinting.set(badgeContract, true)
    } else {
      newIsBadgeMinting.delete(badgeContract)
    }
    set({
      isBadgeMinting: newIsBadgeMinting,
    })
  },

  changeIsBadgeUpgrading: (id: string, loading: boolean) => {
    const newIsBadgeUpgrading = new Map(get().isBadgeUpgrading)
    if (loading) {
      newIsBadgeUpgrading.set(id, true)
    } else {
      newIsBadgeUpgrading.delete(id)
    }
    set({
      isBadgeUpgrading: newIsBadgeUpgrading,
    })
  },

  changeIsFirstBadgeMinting: (isFirstBadgeMinting: boolean) => {
    set({
      isFirstBadgeMinting,
    })
  },
  changeProfileMintedLoading: (profileMintedChecking: boolean) => {
    set({
      profileMintedChecking,
    })
  },

  changeProfileDetailLoading: (profileDetailLoading: boolean) => {
    set({
      profileDetailLoading,
    })
  },

  clearCanvas: () => {
    set({
      referralCode: "",
      mintFlowVisible: false,
      profileDialogVisible: false,
      referDialogVisible: false,
      customizeDisplayDialogVisible: false,
      badgeDetailDialogVisible: BadgeDetailDialogType.HIDDEN,
      badgesDialogVisible: BadgesDialogType.HIDDEN,
      initialMint: false,
      profileMinted: null,
      profileName: "",
      username: "",
      canvasUsername: "",
      userBadges: [],
      attachedBadges: [],
      orderedAttachedBadges: [],
      badgeOrder: [],
    })
  },

  queryFirstMintUsername: async (provider: any) => {
    set({
      queryUsernameLoading: true,
    })
    const { profileContract, name } = await queryCanvasUsername(provider, get().profileAddress)
    set({
      username: name,
      canvasUsername: name,
      profileContract,

      queryUsernameLoading: false,
    })
  },
  queryUsername: async () => {
    set({
      queryUsernameLoading: true,
    })
    const username = await get().profileContract!.username()
    set({
      username,
      canvasUsername: username,
      queryUsernameLoading: false,
    })
  },

  queryAttachedBadges: async () => {
    set({
      queryUserBadgesLoading: true,
    })
    const { orderedAttachedBadges, badgeOrder, attachedBadges } = await getOrderedAttachedBadges(get().profileContract)
    set({
      attachedBadges,
      orderedAttachedBadges,
      badgeOrder,
      queryUserBadgesLoading: false,
    })
  },

  queryUserBadges: async (provider: any, walletAddress: string) => {
    set({
      queryUserBadgesLoading: true,
    })
    const userBadges = await queryUserBadgesWrapped(provider, walletAddress, false)
    set({
      userBadges,
      queryUserBadgesLoading: false,
    })
  },

  queryVisibleBadges: async (provider: any, walletAddress: string) => {
    set({
      queryUserBadgesLoading: true,
    })
    const userBadges = await queryUserBadgesWrapped(provider, walletAddress)
    const { orderedAttachedBadges, badgeOrder, attachedBadges } = await getOrderedAttachedBadges(get().profileContract)
    set({
      userBadges,
      attachedBadges,
      orderedAttachedBadges,
      badgeOrder,
      queryUserBadgesLoading: false,
    })
  },

  pickUpgradableBadges: async (provider: any) => {
    set({
      pickUpgradableBadgesLoading: true,
    })
    const { userBadges } = get()
    const checkPromiseList = userBadges.map(badge => checkBadgeUpgradable(provider, badge))
    const asyncCheckedBadges = await Promise.allSettled(checkPromiseList)
    const finalUpgradableBadges = asyncCheckedBadges
      .filter((item): item is PromiseFulfilledResult<UpgradableBadge> => item.status === "fulfilled" && item.value.upgradable)
      .map(item => item.value)

    const fetchIssuerPromiseList = finalUpgradableBadges.map(async item => {
      let issuer
      try {
        const badge = await fetchNotionBadgeByAddr(item.badgeContract)

        if (badge.issuer) {
          issuer = badge.issuer
        } else if (item.issuerName) {
          issuer = await fetchIssuer(item.issuerName)
        }
        return { ...item, issuer }
      } catch (e) {
        return { ...item }
      }
    })
    const upgradableBadgesWithIssuer = await Promise.all(fetchIssuerPromiseList)
    set({
      pickUpgradableBadgesLoading: false,
      upgradableBadges: upgradableBadgesWithIssuer,
    })
  },

  addFirstBadge: async (providerOrSigner: any, badgeId: string, badgeImage: string, badgeContract: string) => {
    set({
      userBadges: [{ id: badgeId, name: ETHEREUM_YEAR_BADGE.name, description: ETHEREUM_YEAR_BADGE.description, image: badgeImage, badgeContract }],
      attachedBadges: [badgeId],
      orderedAttachedBadges: [badgeId],
      badgeOrder: [1],
    })
  },

  upgradeBadgeAndRefreshUserBadges: async (provider: any, badge: { id: string; badgeContract: string }) => {
    const { changeIsBadgeUpgrading } = get()
    changeIsBadgeUpgrading(badge.id, true)
    const metadata = await upgradeBadge(provider, badge)

    set(
      produce(state => {
        const upgradedBadge = state.userBadges.find(item => item.id === badge.id)
        const { name, image, description } = metadata
        upgradedBadge.name = name
        upgradedBadge.image = image
        upgradedBadge.description = description
      }),
    )
    changeIsBadgeUpgrading(badge.id, false)
    return metadata
  },

  changeSortedBadges: (badges: any) => {
    set({
      sortedBadges: badges,
    })
  },
  changeReferralCode: (code: string) => {
    set({
      referralCode: code,
    })
  },

  changeMintFlowVisible: (mintFlowVisible: boolean) => {
    set({
      mintFlowVisible,
    })
  },

  changeProfileDialog: (visible: boolean) => {
    set({
      profileDialogVisible: visible,
    })
  },

  changeReferDialog: (visible: boolean) => {
    set({
      referDialogVisible: visible,
    })
  },

  changeCustomizeDisplayDialogVisible: (visible: boolean) => {
    set({
      customizeDisplayDialogVisible: visible,
    })
  },

  changeBadgesDialogVisible: (visible: BadgesDialogType) => {
    set({
      badgesDialogVisible: visible,
    })
  },

  changeBadgeDetailDialog: (visible: BadgeDetailDialogType) => {
    set({
      badgeDetailDialogVisible: visible,
    })
  },

  changeSelectedBadge: (badge: any) => {
    set({
      selectedBadge: badge,
    })
  },

  recordFirstBadgePosition: (firstBadgeWithPosition: any) => {
    set({
      firstBadgeWithPosition,
    })
  },

  changeBadgeAnimationVisible: (badgeAnimationVisible: boolean) => {
    set({
      badgeAnimationVisible,
    })
  },
  
  changeInitialMint: (initialMint: boolean) => {
    set({
      initialMint,
    })
  },

  changeInputReferralCode: (inputReferralCode: Array<string>) => {
    set({
      inputReferralCode,
    })
  },
}))

export default useCanvasStore