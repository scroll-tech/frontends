import { EXPLORER_URL, L1_NAME } from "./common"

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
    description: "Use our Hop fork to transfer tokens between Base Chain and Rollup.",
    subdomainOrPath: "/bridge",
  },
  {
    name: "Rollup Explorer",
    description: "See Rollup block data being committed to and finalized on Base Chain.",
    isActive: true,
    subdomainOrPath: "/rollupscan",
  },
  {
    name: "Base Chain Block Explorer",
    description: `See your Base Chain transactions on ${L1_NAME}'s block explorer.`,
    isExternal: true,
    subdomainOrPath: EXPLORER_URL.L1,
  },
  {
    name: "Rollup Block Explorer",
    description: "See your Rollup transactions on our fork of Blockscout.",
    isExternal: true,
    subdomainOrPath: EXPLORER_URL.L2,
  },
]
