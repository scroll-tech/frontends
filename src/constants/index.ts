import { isProduction, requireEnv } from "@/utils/common"

import { SiteMap } from "./networks"

const TESTNET_NAME = "Scroll " + (isProduction ? "Alpha" : requireEnv("REACT_APP_SCROLL_ENVIRONMENT")) + " Testnet"

const navigation = [
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
    subdomainOrPath: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L1"),
  },
  {
    name: "L2 Block Explorer",
    description: "See your L2 transactions on our fork of Blockscout.",
    isExternal: true,
    subdomainOrPath: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2"),
  },
  {
    name: "Unifra Explorer",
    description: "See L2 and L1 transactions alongside the rollup status in one interface.",
    isExternal: true,
    subdomainOrPath: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_UNIFRA"),
  },
]

const documentation = [
  {
    name: "Architecture Overview",
    description: "",
    link: SiteMap.Architecture,
  },
  {
    name: "User Guide",
    description: "",
    link: "https://guide.scroll.io",
  },
]

const ModalStatus = {
  HIDDEN: "hidden",
  LOADING: "loading",
  ERROR: "error",
}

export * from "./common"
export * from "./config"
export * from "./ecosystem"
export * from "./gateway"
export * from "./medias"
export * from "./networks"
export * from "./transaction"
export { navigation, documentation, TESTNET_NAME, ModalStatus }

export let l1ExplorerUrl = requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L1")
export let l2ExplorerUrl = requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2")

export let pathL1Explorer = "l1Explorer"
export let pathL2Explorer = "l2Explorer"
export let pathRollupExplorer = "rollupExplorer"
