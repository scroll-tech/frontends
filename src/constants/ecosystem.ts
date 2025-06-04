import HeartIcon from "@/assets/svgs/ecosystem/heart.svg"
import NoteIcon from "@/assets/svgs/ecosystem/note.svg"
import SettingsIcon from "@/assets/svgs/ecosystem/settings.svg"
import { GET_IN_TOUCH_URL, LEARN_BUILD_URL, REQUEST_A_DAPP_URL } from "@/constants/link"

export const ECOSYSTEM_PAGE_SYMBOL = "ecosystem"

export const DIVERGENT_CATEGORY_MAP = {
  Community: ["Community", "DAO", "Governance"],
  DeFi: ["DEX", "DeFi", "Launchpad", "Lending", "Marketplace"],
  Gaming: ["Gaming"],
  Infra: ["Gateway", "Indexer", "Infrastructure", "Node Provider", "Oracle"],
  NFT: ["NFT"],
  Privacy: ["Privacy", "Identity"],
  Social: ["Social"],
  Tooling: ["Tooling"],
  Wallet: ["Wallet", "Hardware Wallet"],
  Bridge: ["Bridge"],
  Payment: ["Payment"],
}

export const ECOSYSTEM_EXPLORER_LIST = [
  {
    icon: NoteIcon,
    href: GET_IN_TOUCH_URL,
    title: "Get in touch",
    content: "Reach out directly if you need more support for your project.",
  },
  {
    icon: HeartIcon,
    href: REQUEST_A_DAPP_URL,
    title: "Request a dApp",
    content: "Can’t find the application you’re looking for? We want to know!",
  },
  {
    icon: SettingsIcon,
    href: LEARN_BUILD_URL,
    title: "Learn how to build with Scroll",
    content: "For a walkthrough, start with the User Guide's Setup page.",
  },
]

export const TWITTER_ORIGIN = "https://twitter.com/"

export const ECOSYSTEM_NETWORK_LIST = ["All networks", "Mainnet", "Testnet"]

export const NORMAL_HEADER_HEIGHT = "6.5rem"
