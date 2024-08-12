import { Contract } from "ethers"
import produce from "immer"
import { create } from "zustand"

import { Badge, ETHEREUM_YEAR_BADGE, SCROLL_BADGES } from "@/constants"
import {
  checkBadgeEligibility,
  checkBadgeUpgradable,
  fetchCanvasDetail,
  getOrderedAttachedBadges,
  queryCanvasUsername,
  queryUserBadgesWrapped,
  upgradeBadge,
} from "@/services/canvasService"

// import { testAsyncFunc } from "@/services/canvasService"

export enum MintedStatus {
  MINTED = "MINTED",
  NOT_MINTED = "NOT_MINTED",
  UNKNOWN = "UNKNOWN",
}

export enum BadgeDetailDialogType {
  HIDDEN = "",
  MINT = "mint", // no badge
  MINT_WITH_BACK = "mintWithBack", // no badge
  UPGRADE = "upgrade",
  VIEW = "view",
  NO_PROFILE = "noProfile", // no badge
}

export enum BadgesDialogType {
  HIDDEN = "",
  MINT = "mint",
  UPGRADE = "upgrade",
}

type MintableBadge = Badge & { mintable: boolean }

export type UpgradableBadge = Badge & { upgradable: boolean; id: string }

interface CanvasStore {
  // /invite/referralCode
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
  pickMintableBadgesLoading: boolean
  pickUpgradableBadgesLoading: boolean
  profileAddress: string | null
  profileMinted: boolean | null
  username: string
  canvasUsername: string
  userBadges: Array<any>
  attachedBadges: Array<string>
  orderedAttachedBadges: Array<string>
  mintableBadges: Array<MintableBadge>
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
  changeIsBadgeMinting: (id, loading) => void
  changeIsBadgeUpgrading: (id, loading) => void
  checkIfProfileMinted: (instance: Contract, address: string, test?: boolean) => Promise<any>
  fetchCurrentCanvasDetail: (signer, walletAddress, profileAddress) => void
  checkAndFetchCurrentWalletCanvas: (prividerOrSigner, unsignedProfileRegistryContract, walletAddress) => Promise<any>
  fetchOthersCanvasDetail: (prividerOrSigner, othersAddress, profileAddress) => void
  changeProfileMintedLoading: (loading: boolean) => void
  changeProfileDetailLoading: (loading: boolean) => void
  queryUsername: () => void
  queryAttachedBadges: () => void
  queryVisibleBadges: (provider, address) => void
  queryUserBadges: (provider, address) => void
  pickMintableBadges: (provider, address, refresh?) => void
  pickUpgradableBadges: (provider) => void
  addFirstBadge: (provider, badgeId, badgeImage, badgeContract) => void
  clearCanvas: () => void
  recordFirstBadgePosition: (position) => void
  changeBadgeAnimationVisible: (visible: boolean) => void
  changeInitialMint: (initialMint: boolean) => void
  queryFirstMintUsername: (provider) => void
  changeInputReferralCode: (inputReferralCode) => void
  // jointBadgeList: () => Promise<void>
  upgradeBadgeAndRefreshUserBadges: (provider, badge: { id: string; badgeContract: string }) => Promise<any>
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

  // now
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
  pickMintableBadgesLoading: false,
  pickUpgradableBadgesLoading: false,
  username: "",
  canvasUsername: "",
  userBadges: [],
  attachedBadges: [],
  orderedAttachedBadges: [],
  mintableBadges: [],
  upgradableBadges: [],
  badgeOrder: [],
  firstBadgeWithPosition: {},
  badgeAnimationVisible: false,
  initialMint: false,

  inputReferralCode: ["", "", "", "", ""],

  badgeList: SCROLL_BADGES,

  checkIfProfileMinted: async (registryInstance, userAddress, test) => {
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
      // return { profileAddress: null, minted: null }
    }
  },
  fetchOthersCanvasDetail: async (privider, othersAddress, profileAddress) => {
    const { name, userBadges, attachedBadges, orderedAttachedBadges, badgeOrder } = await fetchCanvasDetail(privider, othersAddress, profileAddress)
    set({
      canvasUsername: name,
      userBadges,
      attachedBadges,
      orderedAttachedBadges,
      badgeOrder,
    })
  },

  // fetch wallet profile when viewing others canvas
  checkAndFetchCurrentWalletCanvas: async (prividerOrSigner, unsignedProfileRegistryContract, walletAddress) => {
    set({
      walletDetailLoading: true,
    })
    try {
      const { minted, profileAddress } = await get().checkIfProfileMinted(unsignedProfileRegistryContract, walletAddress)

      if (minted) {
        const { profileContract, name } = await queryCanvasUsername(prividerOrSigner, profileAddress)
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

  fetchCurrentCanvasDetail: async (signer, walletAddress, profileAddress) => {
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

  changeProfileName: profileName => {
    set({
      profileName,
    })
  },
  changeIsProfileMinting: isProfileMinting => {
    set({
      isProfileMinting,
    })
  },
  changeIsBadgeMinting: (badgeContract, loading) => {
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

  changeIsBadgeUpgrading: (id, loading) => {
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

  changeIsFirstBadgeMinting: isFirstBadgeMinting => {
    set({
      isFirstBadgeMinting,
    })
  },
  changeProfileMintedLoading: profileMintedChecking => {
    set({
      profileMintedChecking,
    })
  },

  changeProfileDetailLoading: profileDetailLoading => {
    set({
      profileDetailLoading,
    })
  },

  // after switching wallet address
  clearCanvas: () => {
    set({
      referralCode: "",
      // close all dialog
      mintFlowVisible: false,
      profileDialogVisible: false,
      referDialogVisible: false,
      customizeDisplayDialogVisible: false,
      badgeDetailDialogVisible: BadgeDetailDialogType.HIDDEN,
      badgesDialogVisible: BadgesDialogType.HIDDEN,
      initialMint: false,
      // reset profile mint status
      profileMinted: null,
      profileName: "",
      username: "",
      canvasUsername: "",
      userBadges: [],
      mintableBadges: [],
      attachedBadges: [],
      orderedAttachedBadges: [],
      badgeOrder: [],
    })
  },

  // after calling checkIfProfileMinted, no profileContract
  queryFirstMintUsername: async provider => {
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

  queryUserBadges: async (provider, walletAddress) => {
    set({
      queryUserBadgesLoading: true,
    })
    const userBadges = await queryUserBadgesWrapped(provider, walletAddress, false)
    set({
      userBadges,
      queryUserBadgesLoading: false,
    })
  },

  // auto attach
  queryVisibleBadges: async (provider, walletAddress) => {
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

  // not in use
  pickMintableBadges: async (provider, walletCurrentAddress, refresh) => {
    set({
      pickMintableBadgesLoading: true,
    })

    const { userBadges, mintableBadges, badgeList } = get()
    const preMintableBadges = [...mintableBadges]

    const checkedBadgeList: Array<MintableBadge> = []
    const checkPromiseList: Array<any> = []
    const checkingList: Array<any> = []
    const LIMIT = 3

    for (const badge of badgeList) {
      const isUserBadge = userBadges.some(userBadge => userBadge.badgeContract === badge.badgeContract)
      const preCheckedBadge = preMintableBadges.find(item => item.badgeContract === badge.badgeContract)

      if (isUserBadge) {
        continue
      }

      if (preCheckedBadge && !refresh) {
        checkedBadgeList.push(preCheckedBadge)
        continue
      }

      const checking = new Promise(async resolve => {
        const isEligibleBadge = await checkBadgeEligibility(provider, walletCurrentAddress, badge)
        resolve({
          ...badge,
          mintable: isEligibleBadge,
        })
      })
      checkPromiseList.push(checking)

      if (checkPromiseList.length >= LIMIT) {
        const c: any = checking.then(() => checkingList.splice(checkingList.indexOf(c), 1))
        checkingList.push(c)
        if (checkingList.length >= LIMIT) {
          await Promise.race(checkingList)
        }
      }
    }
    const asyncCheckedBadges = await Promise.allSettled(checkPromiseList)

    checkedBadgeList.push(
      ...asyncCheckedBadges
        .filter((item): item is PromiseFulfilledResult<MintableBadge> => item.status === "fulfilled" && item.value.mintable)
        .map(item => item.value),
    )

    const finalMintableBadges = badgeList
      .filter(({ badgeContract }) => {
        const curBadge = checkedBadgeList.find(item => item.badgeContract === badgeContract)
        return curBadge?.mintable
      })
      .map(item => ({ ...item, mintable: true }))

    set({
      pickMintableBadgesLoading: false,
      mintableBadges: finalMintableBadges,
    })
  },

  pickUpgradableBadges: async provider => {
    set({
      pickUpgradableBadgesLoading: true,
    })
    const { userBadges } = get()
    const checkPromiseList = userBadges.map(badge => checkBadgeUpgradable(provider, badge))
    const asyncCheckedBadges = await Promise.allSettled(checkPromiseList)
    const finalUpgradableBadges = asyncCheckedBadges
      .filter((item): item is PromiseFulfilledResult<UpgradableBadge> => item.status === "fulfilled" && item.value.upgradable)
      .map(item => item.value)

    set({
      pickUpgradableBadgesLoading: false,
      // upgradableBadges: userBadges.slice(0, 2).map(item => ({ ...item, upgradable: true })),
      upgradableBadges: finalUpgradableBadges,
    })
  },

  // jointBadgeList: async () => {
  //   const { badges } = await scrollRequest(BADGE_LIST_URL)
  //   set({
  //     badgeList: [...SCROLL_BADGES.slice(0, SCROLL_BADGES.length - 1), ...badges, SCROLL_BADGES[SCROLL_BADGES.length - 1]],
  //   })
  // },

  addFirstBadge: async (providerOrSigner, badgeId, badgeImage, badgeContract) => {
    set({
      // queryUsernameLoading: true,
      userBadges: [{ id: badgeId, name: ETHEREUM_YEAR_BADGE.name, description: ETHEREUM_YEAR_BADGE.description, image: badgeImage, badgeContract }],
      attachedBadges: [badgeId],
      orderedAttachedBadges: [badgeId],
      badgeOrder: [1],
    })
  },

  upgradeBadgeAndRefreshUserBadges: async (provider, badge) => {
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
  changeReferralCode: code => {
    set({
      referralCode: code,
    })
  },

  changeMintFlowVisible: mintFlowVisible => {
    set({
      mintFlowVisible,
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

  changeCustomizeDisplayDialogVisible: visible => {
    set({
      customizeDisplayDialogVisible: visible,
    })
  },

  changeBadgesDialogVisible: visible => {
    set({
      badgesDialogVisible: visible,
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
  recordFirstBadgePosition: firstBadgeWithPosition => {
    set({
      firstBadgeWithPosition,
    })
  },
  changeBadgeAnimationVisible: badgeAnimationVisible => {
    set({
      badgeAnimationVisible,
    })
  },
  changeInitialMint: initialMint => {
    set({
      initialMint,
    })
  },

  changeInputReferralCode: inputReferralCode => {
    set({
      inputReferralCode,
    })
  },
}))

export default useCanvasStore
