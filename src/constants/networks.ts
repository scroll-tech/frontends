// TODO: Refactor network info into a scroll-testnet-wide spot
import ETHSvg from "@/assets/svgs/eth.svg"
import { isProduction, requireEnv } from "@/utils"

import { ChainId, ETH_SYMBOL, RPCUrl } from "./common"

const l1Explorer = requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L1")
const l2Explorer = requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2")

const TESTNET_NAME = "Scroll " + (isProduction ? "Alpha" : requireEnv("REACT_APP_SCROLL_ENVIRONMENT")) + " Testnet"

export const networks = [
  // TODO: Merge with constants/index.addresses
  {
    name: "Goerli Testnet",
    slug: "goerli",
    imageUrl: "/imgs/bridge/mainnet.svg",
    provider: null,
    rpcUrl: RPCUrl.SCROLL_LAYER_1,
    explorer: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1,
    chainId: ChainId.SCROLL_LAYER_1,
    nativeTokenSymbol: ETH_SYMBOL,
    isLayer1: true, // TODO: Merge these two
    isL1: true, // TODO: Merge these two
    waitConfirmations: 6,
  },
  {
    name: TESTNET_NAME,
    slug: "layer2",
    imageUrl: "/logo.png",
    provider: null,
    rpcUrl: RPCUrl.SCROLL_LAYER_2,
    explorer: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2,
    chainId: ChainId.SCROLL_LAYER_2,
    nativeTokenSymbol: ETH_SYMBOL,
    isLayer1: false,
    isL1: false,
    waitConfirmations: 0,
  },
]

type BaseToken = {
  chainId: number
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export type NativeToken = BaseToken & {
  native: boolean
}

export type ERC20Token = BaseToken & {
  address: string
}

export type Token = NativeToken | ERC20Token
export const nativeTokenList: Token[] = [
  {
    chainId: ChainId.SCROLL_LAYER_1,
    name: ETH_SYMBOL,
    symbol: ETH_SYMBOL,
    decimals: 18,
    native: true,
    logoURI: ETHSvg,
  },
  {
    chainId: ChainId.SCROLL_LAYER_2,
    name: ETH_SYMBOL,
    symbol: ETH_SYMBOL,
    decimals: 18,
    native: true,
    logoURI: ETHSvg,
  },
]

export const SiteMap = {
  Home: "/alpha/",
  Ecosystem: "/ecosystem/",
  Bridge: "/alpha/bridge",
  L1Explorer: l1Explorer,
  L2Explorer: l2Explorer,
  RollupExplorer: "/alpha/rollupscan",
}
