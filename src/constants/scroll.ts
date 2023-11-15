import { requireEnv } from "@/utils"

import { DOCUMENTATION_URL, EXPLORER_URL, L1_NAME, L2_NAME } from "./common"

export const SITE_MAP = {
  Home: "/portal",
  Ecosystem: "/ecosystem",
  Bridge: "/bridge",
  L1Explorer: EXPLORER_URL.L1,
  L2Explorer: EXPLORER_URL.L2,
  RollupExplorer: "/rollupscan",
  Architecture: "/blog/architecture",
}

export const NAVIGATIONS = [
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
    description: `See your L1 transactions on ${L1_NAME}'s block explorer.`,
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
    name: "Documentation",
    description: `See the full ${L2_NAME} User Guide here.`,
    isExternal: true,
    subdomainOrPath: DOCUMENTATION_URL[requireEnv("REACT_APP_SCROLL_ENVIRONMENT")],
  },
]
