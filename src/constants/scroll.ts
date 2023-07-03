import { isProduction, requireEnv } from "@/utils"

import { EXPLORER_URL } from "./common"

export const TESTNET_NAME = "Scroll " + (isProduction ? "Alpha" : requireEnv("REACT_APP_SCROLL_ENVIRONMENT")) + " Testnet"

export const SITE_MAP = {
  Home: "/portal",
  Ecosystem: "/ecosystem",
  Bridge: "/bridge",
  L1Explorer: EXPLORER_URL.L1,
  L2Explorer: EXPLORER_URL.L2,
  RollupExplorer: "/rollupscan",
  Swap: "https://uniswap-v3.scroll.io/",
  Architecture: "/blog/architecture",
}

export const NAVIGATIONS = [
  {
    name: "Testnet",
    description: "Main Testnet Portal",
    subdomainOrPath: "",
  },
  {
    name: "Guide",
    description: "",
    isExternal: true,
    subdomainOrPath: "guide",
  },
  {
    name: "Bridge",
    description: "Use our Hop fork to transfer tokens between L1 and L2.",
    subdomainOrPath: "/bridge",
  },
  {
    name: "Rollup Explorer",
    description: "See L2 block data being committed to and finalized on L1.",
    isActive: true,
    subdomainOrPath: "/rollupscan",
  },
  {
    name: "L1 Block Explorer",
    description: "See your L1 transactions on Goerli's block explorer.",
    isExternal: true,
    subdomainOrPath: EXPLORER_URL.L1,
  },
  {
    name: "L2 Block Explorer",
    description: "See your L2 transactions on our fork of Blockscout.",
    isExternal: true,
    subdomainOrPath: EXPLORER_URL.L2,
  },
  {
    name: "Unifra Explorer",
    description: "See L2 and L1 transactions alongside the rollup status in one interface.",
    isExternal: true,
    subdomainOrPath: EXPLORER_URL.Unifra,
  },
]

export const DOCUMENTATION = [
  {
    name: "Architecture Overview",
    description: "",
    link: SITE_MAP.Architecture,
  },
  {
    name: "User Guide",
    description: "",
    link: "https://guide.scroll.io",
  },
]

export const MEDIAS = [
  {
    name: "twitter",
    imgSrc: "/imgs/media/twitter.png",
    href: "https://twitter.com/Scroll_ZKP",
  },
  {
    name: "discord",
    imgSrc: "/imgs/media/discord.png",
    href: "https://discord.gg/scroll",
  },
  {
    name: "gitHub",
    imgSrc: "/imgs/media/github.png",
    href: "https://github.com/scroll-tech",
  },
  {
    name: "YouTube",
    imgSrc: "/imgs/media/youtube.png",
    href: "https://www.youtube.com/@Scroll_ZKP",
  },
]
