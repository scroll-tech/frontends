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
      chainId:
        "0x" +
        parseInt(process.env.REACT_APP_CHAIN_ID_L1 as string).toString(16),
      chainName: "Scroll L1 " + TESTNET_NAME,
      nativeCurrency: {
        name: TESTNET_NAME + " Ethereum",
        symbol: process.env.REACT_APP_ETH_SYMBOL,
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_EXTERNAL_RPC_URI_L1],
      blockExplorerUrls: [process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1],
    },
    usdcAddress: "0xc00FbEf12f2f41dc36C3A928caD93E0C132A2B4B", // TODO: refactor
  },

  {
    network: "Scroll L2 " + TESTNET_NAME,
    etherscanPrefix: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2,
    formattedName: "Scroll L2 " + TESTNET_NAME,
    autoconnect: {
      chainId:
        "0x" +
        parseInt(process.env.REACT_APP_CHAIN_ID_L2 as string).toString(16),
      chainName: "Scroll L2 " + TESTNET_NAME,
      nativeCurrency: {
        name: TESTNET_NAME + " Ethereum",
        symbol: process.env.REACT_APP_ETH_SYMBOL,
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_EXTERNAL_RPC_URI_L2],
      blockExplorerUrls: [process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2],
    },
    usdcAddress: "0x80732890c93c6D9c6C23E06F888eD0CB88A06018", // TODO: refactor
    uniV2TokenAddress: "0x4f4eb5ac461c115191390d1760109f1ea185e609", // TODO: refactor
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
    subdomainOrPath: "faucet",
  },
  {
    name: "Bridge",
    description:
      "Use Bridge (our Hop fork) to transfer tokens between L1 and L2.",
    subdomainOrPath: "bridge",
  },
  {
    name: "Swap",
    description:
      "Use Swap (our Uniswap fork) to swap tokens and supply liquidity on L2.",
    subdomainOrPath: "swap",
  },
  {
    name: "Rollup Explorer",
    description:
      "See L2 blocks being committed to L1 and finalized with zkEVM proofs on our Rollup Explorer.",
    isActive: true,
    subdomainOrPath: "rollupscan",
  },
  {
    name: "L1 Block Explorer",
    description: "See your L1 transactions on our fork of Blockscout.",
    isExternal: true,
    subdomainOrPath: "l1scan",
  },
  {
    name: "L2 Block Explorer",
    description: "See your L2 transactions on our fork of Blockscout.",
    isExternal: true,
    subdomainOrPath: "l2scan",
  },
];

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
];

const ChainId = {
  SCROLL_LAYER_1: 534351,
  SCROLL_LAYER_2: 534354,
};

const Addresses = {
  [ChainId.SCROLL_LAYER_1]: {
    network: "Scroll L1 Testnet",
    etherscanPrefix: "l1scan.scroll.io",
    formattedName: "Scroll Layer1 testnet",
    autoconnect: {
      chainId: "0x" + parseInt(ChainId.SCROLL_LAYER_1 as any).toString(16),
      chainName: "Scroll L1",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://prealpha.scroll.io/l1"],
      blockExplorerUrls: ["https://l1scan.scroll.io/"],
    },
    usdcAddress: "0xc00FbEf12f2f41dc36C3A928caD93E0C132A2B4B",
  },
  [ChainId.SCROLL_LAYER_2]: {
    network: "Scroll L2 Testnet",
    etherscanPrefix: "l2scan.scroll.io",
    formattedName: "Scroll Layer2 testnet",
    autoconnect: {
      chainId: "0x" + parseInt(ChainId.SCROLL_LAYER_2 as any).toString(16),
      chainName: "Scroll L2",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://prealpha.scroll.io/l2"],
      blockExplorerUrls: ["https://l2scan.scroll.io/"],
    },
    usdcAddress: "0x80732890c93c6D9c6C23E06F888eD0CB88A06018",
  },
};

const ModalStatus = {
  HIDDEN: "hidden",
  LOADING: "loading",
  ERROR: "error",
};

export {
  addresses,
  navigation,
  documentation,
  TESTNET_NAME,
  SCROLL_ENVIRONMENT,
  ChainId,
  Addresses,
  ModalStatus,
};

export let l1ExplorerUrl = "https://l1scan.scroll.io";
export let l2ExplorerUrl = "https://l2scan.scroll.io";
export let rollupExplorerUrl = "https://prealpha.scroll.io/rollupscan";

export let pathL1Explorer = "l1Explorer";
export let pathL2Explorer = "l2Explorer";
export let pathRollupExplorer = "rollupExplorer";
