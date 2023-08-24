import { ReactComponent as DoubleEyesIcon } from "@/assets/svgs/refactor/double-eyes.svg"
import { ReactComponent as SettingsIcon } from "@/assets/svgs/refactor/settings.svg"
import { ReactComponent as TwitterIcon } from "@/assets/svgs/twitter.svg"
import { ReactComponent as WebsiteIcon } from "@/assets/svgs/website.svg"

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

export const LOOKING_FOR_A_DAPP_LINK = "https://scrollzkp.typeform.com/to/mHYILHJx"

export const LEARN_BUILD_LINK = "https://docs.scroll.io/en/getting-started/overview/"

export const ECOSYSTEM_EXPLORER_LIST = [
  {
    icon: SettingsIcon,
    href: LEARN_BUILD_LINK,
    title: "Learn how to build with Scroll",
    content:
      "Scroll is compatible with Ethereum at bytecode-level, meaning everything works right out of the box. For a walkthrough, start with the User Guide's Setup page.",
  },
  {
    icon: DoubleEyesIcon,
    href: LOOKING_FOR_A_DAPP_LINK,
    title: "Request a dApp",
    content:
      "At Scroll, we want to provide the most vibrant ecosystem for our users. Can’t find the application you’re looking for on Scroll? We want to know!",
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
