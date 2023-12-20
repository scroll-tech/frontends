import { ReactComponent as DoubleEyesIcon } from "@/assets/svgs/ecosystem/double-eyes.svg"
import { ReactComponent as HeartIcon } from "@/assets/svgs/ecosystem/heart.svg"
import { ReactComponent as SettingsIcon } from "@/assets/svgs/ecosystem/settings.svg"
import { ReactComponent as TwitterIcon } from "@/assets/svgs/ecosystem/twitter.svg"
import { ReactComponent as WebsiteIcon } from "@/assets/svgs/ecosystem/website.svg"
import { isProduction } from "@/utils"

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

export const LIST_YOUR_DAPP_LINK = "https://tally.so/r/nGppyZ"

export const REQUEST_A_DAPP_LINK = "https://tally.so/r/3jlj59"

export const LEARN_BUILD_LINK = "https://docs.scroll.io/en/getting-started/overview/"

export const ECOSYSTEM_EXPLORER_LIST = [
  {
    icon: DoubleEyesIcon,
    href: LIST_YOUR_DAPP_LINK,
    title: "List your Dapp",
    content: "Join a supportive, collaborative ecosystem with a greater purpose.",
  },
  {
    icon: HeartIcon,
    href: REQUEST_A_DAPP_LINK,
    title: "Request a dApp",
    content: "Can’t find the application you’re looking for? We want to know!",
  },
  {
    icon: SettingsIcon,
    href: LEARN_BUILD_LINK,
    title: "Learn how to build with Scroll",
    content: "For a walkthrough, start with the User Guide's Setup page.",
  },
]

export const ECOSYSTEM_SOCIAL_LIST = [
  {
    name: "Website",
    icon: WebsiteIcon,
    prefixLink: "",
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
    prefixLink: "https://twitter.com/",
  },
]

export const TWITTER_ORIGIN = "https://twitter.com/"

export const ECOSYSTEM_NETWORK_LIST = ["All networks", "Mainnet", "Testnet"]

export const NORMAL_HEADER_HEIGHT = isProduction ? "6.5rem" : "11.5rem"
