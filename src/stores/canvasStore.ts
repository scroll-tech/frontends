import { Contract } from "ethers"
import { create } from "zustand"

import { ETHEREUM_YEAR_BADGE } from "@/constants/badges"
import { Badge, default as badgeList } from "@/pages/canvas/Dashboard/UpgradeDialog/Badges"
import {
  checkBadgeEligibility,
  fetchCanvasDetail,
  getOrderedAttachedBadges,
  queryCanvasUsername,
  queryUserBadgesWrapped,
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

type MintableBadge = Badge & { mintable: boolean }

interface CanvasStore {
  // /invite/referralCode
  referralCode: string
  profileDialogVisible: boolean
  referDialogVisible: boolean
  badgesDialogVisible: boolean
  upgradeDialogVisible: boolean
  badgeDetailDialogVisible: BadgeDetailDialogType
  mintFlowVisible: boolean
  sortedBadges: any
  selectedBadge: any

  changeReferralCode: (code: string) => void
  changeMintFlowVisible: (visible: boolean) => void
  changeProfileDialog: (visible: boolean) => void
  changeReferDialog: (visible: boolean) => void
  changeBadgesDialog: (visible: boolean) => void
  changeSortedBadges: (badges: any) => void
  changeUpgradeDialog: (visible: boolean) => void
  changeBadgeDetailDialog: (visible: BadgeDetailDialogType) => void
  changeSelectedBadge: (badge: any) => void

  profileName: string
  isProfileMinting: boolean
  isBadgeMinting: Map<string, boolean>
  isFirstBadgeMinting: boolean
  profileMintedChecking: boolean
  profileDetailLoading: boolean
  walletDetailLoading: boolean
  queryUsernameLoading: boolean
  queryUserBadgesLoading: boolean
  pickMintableBadgesLoading: boolean
  profileAddress: string | null
  profileMinted: boolean | null
  username: string
  canvasUsername: string
  userBadges: Array<any>
  attachedBadges: Array<any>
  orderedAttachedBadges: Array<any>
  mintableBadges: Array<MintableBadge>
  badgeOrder: Array<any>
  profileContract: Contract | null
  firstBadgeWithPosition: any
  badgeAnimationVisible: boolean
  initialMint: boolean

  changeProfileName: (name: string) => void
  changeIsProfileMinting: (isProfileMinting: boolean) => void
  changeIsFirstBadgeMinting: (isFirstBadgeMinting: boolean) => void
  changeIsBadgeMinting: (id, loading) => void
  checkIfProfileMinted: (instance: Contract, address: string, test?: boolean) => Promise<any>
  fetchCurrentCanvasDetail: (signer, walletAddress, profileAddress) => void
  checkAndFetchCurrentWalletCanvas: (prividerOrSigner, unsignedProfileRegistryContract, walletAddress) => Promise<any>
  fetchOthersCanvasDetail: (prividerOrSigner, othersAddress, profileAddress) => void
  changeProfileMintedLoading: (loading: boolean) => void
  changeProfileDetailLoading: (loading: boolean) => void
  queryUsername: () => void
  queryAttachedBadges: () => void
  queryVisibleBadges: (provider, address) => void
  pickMintableBadges: (provider, address, refresh?) => void
  addFirstBadge: (provider, badgeId, badgeImage, badgeContract) => void
  clearCanvas: () => void
  recordFirstBadgePosition: (position) => void
  changeBadgeAnimationVisible: (visible: boolean) => void
  changeInitialMint: (initialMint: boolean) => void
  queryFirstMintUsername: (provider) => void
}

const useCanvasStore = create<CanvasStore>()((set, get) => ({
  referralCode: "",
  profileDialogVisible: false,
  referDialogVisible: false,
  badgesDialogVisible: false,
  upgradeDialogVisible: false,
  badgeDetailDialogVisible: BadgeDetailDialogType.HIDDEN,
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
  isFirstBadgeMinting: false,
  profileMintedChecking: false,
  profileDetailLoading: false,
  queryUsernameLoading: false,
  walletDetailLoading: false,
  queryUserBadgesLoading: false,
  pickMintableBadgesLoading: false,
  username: "",
  canvasUsername: "",
  userBadges: [],
  attachedBadges: [],
  orderedAttachedBadges: [],
  mintableBadges: [],
  badgeOrder: [],
  firstBadgeWithPosition: {},
  badgeAnimationVisible: false,
  initialMint: false,

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
      badgesDialogVisible: false,
      upgradeDialogVisible: false,
      badgeDetailDialogVisible: BadgeDetailDialogType.HIDDEN,
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

  pickMintableBadges: async (provider, walletCurrentAddress, refresh) => {
    const { userBadges, mintableBadges } = get()
    const preMintableBadges = [...mintableBadges]
    set({
      pickMintableBadgesLoading: true,
    })
    const checkedBadges = await Promise.allSettled(
      badgeList.map(async badge => {
        const isUserBadge = userBadges.some(userBadge => userBadge.badgeContract === badge.badgeContract)
        const preCheckedBadge = preMintableBadges?.find(item => item.badgeContract === badge.badgeContract)
        if (preCheckedBadge && !isUserBadge && !refresh) {
          return preCheckedBadge
        }
        const isEligibleBadge = await checkBadgeEligibility(provider, walletCurrentAddress, badge)

        return {
          ...badge,
          mintable: !isUserBadge && isEligibleBadge,
        }
      }),
    )
    const filteredBadges = checkedBadges
      .filter((item): item is PromiseFulfilledResult<MintableBadge> => item.status === "fulfilled" && item.value.mintable)
      .map(item => item.value)

    set({
      pickMintableBadgesLoading: false,
      mintableBadges: filteredBadges,
    })
  },

  // for test
  addFirstBadge: async (providerOrSigner, badgeId, badgeImage, badgeContract) => {
    set({
      // queryUsernameLoading: true,
      userBadges: [{ id: badgeId, name: ETHEREUM_YEAR_BADGE.name, description: ETHEREUM_YEAR_BADGE.description, image: badgeImage, badgeContract }],
      attachedBadges: [badgeId],
      orderedAttachedBadges: [badgeId],
      badgeOrder: [1],
    })
    // const { profileContract, name }: any = await testAsyncFunc({ name: "Lalala", profileContract: "0x4444" })
    // const { profileContract, name } = await queryCanvasUsername(providerOrSigner, get().profileAddress)
    // set({
    //   username: name,
    //   canvasUsername: name,
    //   profileContract,
    //   queryUserBadgesLoading: false,
    // })
  },

  // getReferrerData: async ()=>{
  //   ge
  // },

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
}))

export default useCanvasStore
