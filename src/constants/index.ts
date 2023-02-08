import { isProduction, requireEnv } from "@/utils/common"

import { ChainId, RPCUrl } from "./common"

const TESTNET_NAME = "Scroll " + (isProduction ? "Alpha" : requireEnv("REACT_APP_SCROLL_ENVIRONMENT")) + " Testnet"

const addresses = [
  {
    network: "Goerli Testnet",
    etherscanPrefix: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1,
    formattedName: "Goerli Testnet",
    autoconnect: {
      chainId: "0x" + ChainId.SCROLL_LAYER_1.toString(16),
      chainName: "Goerli Testnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: process.env.REACT_APP_ETH_SYMBOL,
        decimals: 18,
      },
      rpcUrls: [RPCUrl.SCROLL_LAYER_1],
      blockExplorerUrls: [process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1],
    },
    usdcAddress: process.env.REACT_APP_L1_USDC_ADDRESS,
  },

  {
    network: TESTNET_NAME,
    etherscanPrefix: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2,
    formattedName: TESTNET_NAME,
    autoconnect: {
      chainId: "0x" + ChainId.SCROLL_LAYER_2.toString(16),
      chainName: TESTNET_NAME,
      nativeCurrency: {
        name: "Ethereum",
        symbol: process.env.REACT_APP_ETH_SYMBOL,
        decimals: 18,
      },
      rpcUrls: [RPCUrl.SCROLL_LAYER_2],
      blockExplorerUrls: [process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2],
    },
    usdcAddress: process.env.REACT_APP_L2_USDC_ADDRESS,
    uniV2TokenAddress: process.env.REACT_APP_L2_UNIV2_ADDRESS,
  },
]

const navigation = [
  {
    name: "Portal",
    description: "Main Portal",
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
    description: "Use Bridge (our Hop fork) to transfer tokens between L1 and L2.",
    subdomainOrPath: "/alpha/bridge",
  },
  {
    name: "Rollup Explorer",
    description: "See L2 blocks being committed to L1 and finalized with zkEVM proofs on our Rollup Explorer.",
    isActive: true,
    subdomainOrPath: "/alpha/rollupscan",
  },
  {
    name: "L1 Block Explorer",
    description: "See your L1 transactions on Goerli's block explorer.",
    isExternal: true,
    subdomainOrPath: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1,
  },
  {
    name: "L2 Block Explorer",
    description: "See your L2 transactions on our fork of Blockscout.",
    isExternal: true,
    subdomainOrPath: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2,
  },
]

const documentation = [
  {
    name: "Architecture Overview",
    description: "",
    link: "https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k",
  },
  {
    name: "User Guide",
    description: "",
    link: "https://guide.scroll.io",
  },
]

const Addresses = {
  [ChainId.SCROLL_LAYER_1]: {
    network: "Scroll L1 " + TESTNET_NAME,
    etherscanPrefix: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1,
    formattedName: "Scroll L1 " + TESTNET_NAME,
    autoconnect: {
      chainId: "0x" + ChainId.SCROLL_LAYER_1.toString(16),
      chainName: "Scroll L1 " + TESTNET_NAME,
      nativeCurrency: {
        name: TESTNET_NAME + " Ethereum",
        symbol: process.env.REACT_APP_ETH_SYMBOL,
        decimals: 18,
      },
      rpcUrls: [RPCUrl.SCROLL_LAYER_1],
      blockExplorerUrls: [process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1],
    },
    usdcAddress: process.env.REACT_APP_L1_USDC_ADDRESS,
  },
  [ChainId.SCROLL_LAYER_2]: {
    network: "Scroll L2 " + TESTNET_NAME,
    etherscanPrefix: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2,
    formattedName: "Scroll L2 " + TESTNET_NAME,
    autoconnect: {
      chainId: "0x" + ChainId.SCROLL_LAYER_2.toString(16),
      chainName: "Scroll L2 " + TESTNET_NAME,
      nativeCurrency: {
        name: TESTNET_NAME + " Ethereum",
        symbol: process.env.REACT_APP_ETH_SYMBOL,
        decimals: 18,
      },
      rpcUrls: [RPCUrl.SCROLL_LAYER_2],
      blockExplorerUrls: [process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2],
    },
    usdcAddress: process.env.REACT_APP_L2_USDC_ADDRESS,
    uniV2TokenAddress: process.env.REACT_APP_L2_UNIV2_ADDRESS,
  },
}

const ModalStatus = {
  HIDDEN: "hidden",
  LOADING: "loading",
  ERROR: "error",
}

export * from "./common"
export * from "./config"
export * from "./gateway"
export * from "./medias"
export * from "./networks"
export * from "./transaction"
export { addresses, navigation, documentation, TESTNET_NAME, Addresses, ModalStatus }

export let l1ExplorerUrl = process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1
export let l2ExplorerUrl = process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2

export let pathL1Explorer = "l1Explorer"
export let pathL2Explorer = "l2Explorer"
export let pathRollupExplorer = "rollupExplorer"
