import { create } from "zustand"

import { ETHEREUM_YEAR_BADGE_ADDRESS, SCR_HOLDING_BADGE_ADDRESS } from "@/constants"
import { notifyPerks, persistPerks } from "@/services/perksService"
import { truncateAddress } from "@/utils"

const DEFAULT_ETHEREUM_YEAR_BADGE_IMAGE = "/imgs/canvas/Badge_Ethereum_Year.png"
export const DEFAULT_SCR_HOLDING_BADGE_IMAGE = "/imgs/canvas/SCR_Holding_Badge.png"

const SCR_HOLDING_BADGE_NAME = "SCR Holding Badge"
const ETHEREUM_YEAR_BADGE_NAME = "Ethereum Year Badge"

interface PerkMetadata {
  name: string
  badgeContract: string
  imageURL: string
  owned: boolean
}

export interface Perk {
  id: string
  title: string
  description: string
  metadata: PerkMetadata[]
  claimable: boolean
  claimed: boolean

  checkClaimableFunc: () => void
}

interface PerksStore {
  perks: Perk[]
  perksDialogVisible: boolean
  firstSeePerks: boolean // check if user see perks for the first time
  newPerksIds: string[] // diff new perk list and old perk list
  generatePerks: (props: any) => void
  appendNewPerksIds: () => void
  changePerksDialogVisible: (visible: boolean) => void

  clearPerks: () => void
}

const usePerkStore = create<PerksStore>()((set, get) => ({
  perks: [],
  perksDialogVisible: false,
  firstSeePerks: false,
  newPerksIds: [],

  generatePerks: async props => {
    const { walletCurrentAddress, userBadges, ensClaimed, nftClaimed } = props

    // console.log(userBadges, "userBadges")

    const perkList = [
      {
        id: "claim-ens-subdomain",
        title: "Claim your ENS subdomain",
        description: `Make your ${truncateAddress(
          walletCurrentAddress,
        )} address readable for free! This is your personalized address that people can send crypto to.`,

        metadata: [
          {
            name: ETHEREUM_YEAR_BADGE_NAME,
            badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
            imageURL: DEFAULT_ETHEREUM_YEAR_BADGE_IMAGE,
            owned: false,
          },
          {
            name: SCR_HOLDING_BADGE_NAME,
            badgeContract: SCR_HOLDING_BADGE_ADDRESS,
            imageURL: DEFAULT_SCR_HOLDING_BADGE_IMAGE,
            owned: false,
          },
        ],

        checkClaimableFunc: () => {
          const yearBadge = userBadges.find(badge => badge.badgeContract === ETHEREUM_YEAR_BADGE_ADDRESS)
          const scrBadge = userBadges.find(badge => badge.badgeContract === SCR_HOLDING_BADGE_ADDRESS)
          return {
            claimable: !!yearBadge && !!scrBadge,

            metadata: [
              {
                name: ETHEREUM_YEAR_BADGE_NAME,
                badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
                imageURL: yearBadge ? yearBadge.image : DEFAULT_ETHEREUM_YEAR_BADGE_IMAGE,
                owned: !!yearBadge,
              },
              {
                name: SCR_HOLDING_BADGE_NAME,
                badgeContract: SCR_HOLDING_BADGE_ADDRESS,
                imageURL: scrBadge ? scrBadge.image : DEFAULT_SCR_HOLDING_BADGE_IMAGE,
                owned: !!scrBadge,
              },
            ],
          }
        },
        claimable: false,
        claimed: ensClaimed ?? false,
      },
      {
        id: "nft-profile-setup",
        title: "Set up an NFT profile",
        description: "Set your profile picture to an NFT you own to show off your prized possessions.",
        metadata: [
          {
            name: ETHEREUM_YEAR_BADGE_NAME,
            badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
            imageURL: DEFAULT_ETHEREUM_YEAR_BADGE_IMAGE,
            owned: false,
          },
        ],
        checkClaimableFunc: () => {
          const yearBadge = userBadges.find(badge => badge.badgeContract === ETHEREUM_YEAR_BADGE_ADDRESS)
          return {
            claimable: !!yearBadge,
            metadata: [
              {
                name: ETHEREUM_YEAR_BADGE_NAME,
                badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
                imageURL: yearBadge ? yearBadge.image : DEFAULT_ETHEREUM_YEAR_BADGE_IMAGE,
                owned: !!yearBadge,
              },
            ],
          }
        },
        claimable: false,
        claimed: nftClaimed ?? false,
      },
      // {
      //   id: "new-perk-1",
      //   title: "Set up an NFT profile",
      //   description: "Set your profile picture to an NFT you own to show off your prized possessions.",
      //   metadata: [
      //     {
      //       name: ETHEREUM_YEAR_BADGE_NAME,
      //       badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
      //       imageURL: DEFAULT_ETHEREUM_YEAR_BADGE_IMAGE,
      //       owned: false,
      //     },
      //   ],
      //   checkClaimableFunc: () => {
      //     const yearBadge = userBadges.find(badge => badge.badgeContract === ETHEREUM_YEAR_BADGE_ADDRESS)
      //     return {
      //       claimable: !!yearBadge,
      //       metadata: [
      //         {
      //           name: ETHEREUM_YEAR_BADGE_NAME,
      //           badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
      //           imageURL: yearBadge ? yearBadge.image : DEFAULT_ETHEREUM_YEAR_BADGE_IMAGE,
      //           owned: !!yearBadge,
      //         },
      //       ],
      //     }
      //   },
      //   claimable: false,
      //   claimed: nftClaimed ?? false,
      // },
    ]

    const { firstSeePerks, newPerksIds } = notifyPerks(perkList)

    const perkListWithClaimable = perkList.map(perk => {
      const checkResult = perk.checkClaimableFunc()
      return { ...perk, ...checkResult }
    })
    set({ firstSeePerks, newPerksIds, perks: perkListWithClaimable.sort((a, b) => (a.claimed === b.claimed ? 0 : a.claimed ? 1 : -1)) })
  },

  appendNewPerksIds: () => {
    const { newPerksIds } = get()
    persistPerks(newPerksIds, true)
    set({
      newPerksIds: [],
    })
  },

  changePerksDialogVisible: visible => {
    set({
      perksDialogVisible: visible,
    })
  },

  clearPerks: () => {
    set({
      perks: [],
      perksDialogVisible: false,
      firstSeePerks: false,
      newPerksIds: [],
    })
  },
}))

export default usePerkStore
