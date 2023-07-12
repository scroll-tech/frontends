import { ReactComponent as DoubleEyesIcon } from "@/assets/svgs/refactor/double-eyes.svg"
import { ReactComponent as SettingsIcon } from "@/assets/svgs/refactor/settings.svg"

export const DIVERGENT_CATEGORY_MAP = {
  Community: ["Community", "DAO", "Governance"],
  DeFi: ["DEX", "DeFi", "Launchpad", "Lending", "Marketplace", "Payment"],
  Gaming: ["Gaming"],
  Infra: ["Bridge", "Gateway", "Indexer", "Infrastructure", "Node Provider", "Oracle"],
  NFT: ["NFT"],
  Privacy: ["Privacy", "Identity"],
  Social: ["Social"],
  Tooling: ["Tooling"],
  Wallet: ["Wallet", "Hardware Wallet"],
}

export const LIST_YOUR_DAPP_LINK = "https://scrollzkp.typeform.com/buildwithscroll"

export const LOOKING_FOR_A_DAPP_LINK = ""

export const LEARN_BUILD_LINK = "https://deploy-preview-10--scroll-documentation.netlify.app/en/docs/getting-started/overview/"

export const ECOSYSTEM_EXPLORER_LIST = [
  {
    icon: SettingsIcon,
    href: LEARN_BUILD_LINK,
    title: "Learn how to build with Scroll",
    content:
      "Lorem ipsum dolor sit amet, consectetur elit. Donec dictum auctor sem et malesuada. Sed facilisis, lorem libero fringilla dictum auctor mauris.",
  },
  {
    icon: DoubleEyesIcon,
    href: LOOKING_FOR_A_DAPP_LINK,
    title: "Looking for a Dapp?",
    content:
      "Lorem ipsum dolor sit amet, consectetur elit. Donec dictum auctor sem et malesuada. Sed facilisis, lorem libero fringilla dictum auctor mauris.",
  },
]
