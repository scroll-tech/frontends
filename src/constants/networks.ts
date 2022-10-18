// TODO: Refactor network info into a scroll-testnet-wide spot

// import { ChainId } from "./index";
const ChainId = {
  SCROLL_LAYER_1: parseInt(process.env.REACT_APP_CHAIN_ID_L1 as string),
  SCROLL_LAYER_2: parseInt(process.env.REACT_APP_CHAIN_ID_L2 as string),
};

export const networks = [
  {
    name:
      "Scroll L1 Testnet" +
      (process.env.REACT_APP_SCROLL_ENVIRONMENT === "MAIN"
        ? ""
        : " [" + process.env.REACT_APP_SCROLL_ENVIRONMENT + "]"),
    slug: "layer1",
    imageUrl:
      process.env.REACT_APP_SCROLL_ENVIRONMENT === "LOCAL"
        ? "https://prealpha.scroll.io/bridge/static/media/mainnet.0e3a60e3.svg"
        : "static/media/mainnet.0e3a60e3.svg",
    provider: null,
    rpcUrl: process.env.REACT_APP_EXTERNAL_RPC_URI_L1,
    explorer: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1,
    networkId: ChainId.SCROLL_LAYER_1,
    chainId: ChainId.SCROLL_LAYER_1,
    nativeTokenSymbol: process.env.REACT_APP_ETH_SYMBOL,
    isLayer1: true,
    isL1: true,
    waitConfirmations: 12,
  },
  {
    name:
      "Scroll L2 Testnet" +
      (process.env.REACT_APP_SCROLL_ENVIRONMENT === "MAIN"
        ? ""
        : " [" + process.env.REACT_APP_SCROLL_ENVIRONMENT + "]"),
    slug: "layer2",
    imageUrl: "https://scroll.io/img/logo.png",
    provider: null,
    rpcUrl: process.env.REACT_APP_EXTERNAL_RPC_URI_L2,
    explorer: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2,
    networkId: ChainId.SCROLL_LAYER_2,
    chainId: ChainId.SCROLL_LAYER_2,
    nativeTokenSymbol: process.env.REACT_APP_ETH_SYMBOL,
    isLayer1: false,
    isL1: false,
    waitConfirmations: 1,
  },
];
