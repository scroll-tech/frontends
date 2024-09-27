import { create } from "zustand"

import BadgeEthereumYearSvg from "@/assets/svgs/canvas-perks/badge-ethereum-year.svg"
import BadgePlaceholderSvg from "@/assets/svgs/canvas-perks/badge-placeholder.svg"
import { ETHEREUM_YEAR_BADGE_ADDRESS } from "@/constants/badge"
import { truncateAddress } from "@/utils"

const createPerkValidator = (condition, defaultSvg) => {
  return () => {
    const badge = condition()
    return {
      valid: !!badge,
      badge: badge ? badge.image : defaultSvg,
    }
  }
}

// const areAllRequiresValid = requires => {
//   return requires.every(require => require().valid)
// }

interface Perk {
  id: string
  title: string
  description: string
  requires: Array<() => { valid: boolean; badge: string }>
  areAllValid: boolean
  onClick: () => void
  isClaimed?: boolean
}

interface EnsSubdomainStore {
  perks: Perk[]
  generatePerks: (props: any) => void
  updatePerkValidStatus: (props: any) => void
}

const usePerkStore = create<EnsSubdomainStore>()(set => ({
  perks: [],
  generatePerks: props => {
    const { walletCurrentAddress, userBadges, changeEnsSubdomainDialogVisible } = props
    const perkList = [
      {
        id: "claim-ens-subdomain",
        title: "Claim your ENS subdomain",
        description: `Make your ${truncateAddress(
          walletCurrentAddress,
        )} address readable for free! This is your personalized address that people can send crypto to.`,
        requires: [
          createPerkValidator(() => userBadges.find(badge => badge.badgeContract === ETHEREUM_YEAR_BADGE_ADDRESS), BadgeEthereumYearSvg),
          createPerkValidator(() => userBadges.filter(badge => badge.badgeContract !== ETHEREUM_YEAR_BADGE_ADDRESS)[0], BadgePlaceholderSvg),
          createPerkValidator(() => userBadges.filter(badge => badge.badgeContract !== ETHEREUM_YEAR_BADGE_ADDRESS)[1], BadgePlaceholderSvg),
          createPerkValidator(() => userBadges.filter(badge => badge.badgeContract !== ETHEREUM_YEAR_BADGE_ADDRESS)[2], BadgePlaceholderSvg),
        ],
        areAllValid: false,
        onClick: () => {
          changeEnsSubdomainDialogVisible("claim")
        },
        isClaimed: false,
      },
      {
        id: "nft-profile-setup",
        title: "Set up an NFT profile",
        description: "Set your profile picture to an NFT you own to show off your prized possessions.",
        requires: [createPerkValidator(() => userBadges.find(badge => badge.badgeContract === ETHEREUM_YEAR_BADGE_ADDRESS), BadgeEthereumYearSvg)],
        areAllValid: false,
        onClick: () => {
          console.log("NFT profile setup clicked")
        },
      },
    ]

    perkList.forEach(task => {
      // task.areAllValid = areAllRequiresValid(task.requires)
      task.areAllValid = true
    })

    set({ perks: perkList.sort((a, b) => (a.isClaimed === b.isClaimed ? 0 : a.isClaimed ? 1 : -1)) })
  },

  updatePerkValidStatus: props => {},
}))

export default usePerkStore
