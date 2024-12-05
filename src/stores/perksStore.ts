// import { type Address } from "viem"
import { create } from "zustand"

import BadgeEthereumYearSvg from "@/assets/svgs/canvas-perks/badge-ethereum-year.svg"
import BadgePlaceholderSvg from "@/assets/svgs/canvas-perks/badge-placeholder.svg"
import { ETHEREUM_YEAR_BADGE_ADDRESS, SCR_HOLDING_BADGE_ADDRESS } from "@/constants"
import { truncateAddress } from "@/utils"

const SCR_HOLDING_BADGE_NAME = "SCR Holding Badge"
const ETHEREUM_YEAR_BADGE_NAME = "Ethereum Year Badge"

interface PerkMetadata {
  name: string
  badgeContract: string
  imageURL: string
}

interface Perk {
  id: string
  title: string
  description: string
  // imageURL: string[]
  metadata: PerkMetadata[]
  claimable: boolean
  claimed: boolean

  checkClaimableFunc: () => void
}

interface EnsSubdomainStore {
  perks: Perk[]
  generatePerks: (props: any) => void
  updatePerkValidStatus: (props: any) => void
}

const usePerkStore = create<EnsSubdomainStore>()(set => ({
  perks: [],
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
            imageURL: BadgeEthereumYearSvg,
          },
          {
            name: SCR_HOLDING_BADGE_NAME,
            badgeContract: SCR_HOLDING_BADGE_ADDRESS,
            imageURL: BadgePlaceholderSvg,
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
                imageURL: yearBadge ? yearBadge.image : BadgeEthereumYearSvg,
              },
              {
                name: SCR_HOLDING_BADGE_NAME,
                badgeContract: SCR_HOLDING_BADGE_ADDRESS,
                imageURL: scrBadge ? scrBadge.image : BadgePlaceholderSvg,
              },
            ],
          }
        },

        claimed: ensClaimed,
      },
      {
        id: "nft-profile-setup",
        title: "Set up an NFT profile",
        description: "Set your profile picture to an NFT you own to show off your prized possessions.",
        imageURL: [BadgeEthereumYearSvg],
        checkClaimableFunc: () => {
          const yearBadge = userBadges.find(badge => badge.badgeContract === ETHEREUM_YEAR_BADGE_ADDRESS)
          return {
            claimable: !!yearBadge,
            metadata: [
              {
                name: ETHEREUM_YEAR_BADGE_NAME,
                badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
                imageURL: yearBadge ? yearBadge.image : BadgeEthereumYearSvg,
              },
            ],
          }
        },
        claimed: nftClaimed,
      },
    ]
    const perkListWithClaimable = perkList.map(perk => {
      const checkResult = perk.checkClaimableFunc()
      return { ...perk, ...checkResult }
    })
    set({ perks: perkListWithClaimable.sort((a, b) => (a.claimed === b.claimed ? 0 : a.claimed ? 1 : -1)) })
  },

  updatePerkValidStatus: props => {},
}))

export default usePerkStore
