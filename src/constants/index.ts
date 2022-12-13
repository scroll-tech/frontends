import { ChainId, RPCUrl } from "./common"

const SCROLL_ENVIRONMENT_PRODUCTION = "MAIN"; // `MAIN` is production, `STAGING` is staging
const SCROLL_ENVIRONMENT =
  process.env.REACT_APP_SCROLL_ENVIRONMENT || SCROLL_ENVIRONMENT_PRODUCTION;
const RUNNING_IN_PRODUCTION =
  SCROLL_ENVIRONMENT === SCROLL_ENVIRONMENT_PRODUCTION;

const TESTNET_NAME =
  "Testnet" + (!RUNNING_IN_PRODUCTION ? " [" + SCROLL_ENVIRONMENT + "]" : "");

const addresses = [
  {
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

  {
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
];

const navigation = [
  {
    name: "Home",
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
    name: "Faucet",
    description: "Receive test ETH and USDC tokens on L1 from Faucet.",
    subdomainOrPath: "./faucet",
  },
  {
    name: "Bridge",
    description:
      "Use Bridge (our Hop fork) to transfer tokens between L1 and L2.",
    subdomainOrPath: "./bridge",
  },
  {
    name: "Swap",
    description:
      "Use Swap (our Uniswap fork) to swap tokens and supply liquidity on L2.",
    subdomainOrPath: "./swap",
  },
  {
    name: "Rollup Explorer",
    description:
      "See L2 blocks being committed to L1 and finalized with zkEVM proofs on our Rollup Explorer.",
    isActive: true,
    subdomainOrPath: "./rollupscan",
  },
  {
    name: "L1 Block Explorer",
    description: "See your L1 transactions on our fork of Blockscout.",
    isExternal: true,
    subdomainOrPath: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1,
  },
  {
    name: "L2 Block Explorer",
    description: "See your L2 transactions on our fork of Blockscout.",
    isExternal: true,
    subdomainOrPath: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2,
  },
];

const documentation = [
  {
    name: "Architecture Overview",
    description: "",
    link:
      "https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k",
  },
  {
    name: "User Guide",
    description: "",
    link: "https://guide.scroll.io",
  },
];

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
};

const ModalStatus = {
  HIDDEN: "hidden",
  LOADING: "loading",
  ERROR: "error",
};

export * from "./common"
export * from "./config"
export * from "./gateway"
export * from "./medias"
export * from "./networks"
export * from "./transaction"
export {
  addresses,
  navigation,
  documentation,
  TESTNET_NAME,
  SCROLL_ENVIRONMENT,
  Addresses,
  ModalStatus,
}

export let l1ExplorerUrl = process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1;
export let l2ExplorerUrl = process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2;
export let rollupExplorerUrl = "https://prealpha.scroll.io/rollupscan";

export let pathL1Explorer = "l1Explorer";
export let pathL2Explorer = "l2Explorer";
export let pathRollupExplorer = "rollupExplorer";


