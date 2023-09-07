import _ from "lodash"

import ETHSvg from "@/assets/svgs/refactor/bridge-network-mainnet.svg"
import { ReactComponent as MainnetSvg } from "@/assets/svgs/refactor/bridge-network-mainnet.svg"
import { ReactComponent as ScrollSvg } from "@/assets/svgs/refactor/bridge-network-scroll.svg"
import { networkType } from "@/utils"

import { CHAIN_ID, ETH_SYMBOL, EXPLORER_URL, RPC_URL } from "./common"

export const NETWORKS: Network[] = [
  {
    name: `Ethereum ${_.capitalize(networkType)}`,
    slug: "layer1",
    imageUrl: "/imgs/bridge/mainnet.svg",
    icon: MainnetSvg,
    rpcUrl: RPC_URL.L1,
    explorer: EXPLORER_URL.L1,
    chainId: CHAIN_ID.L1,
    nativeTokenSymbol: ETH_SYMBOL,
    isL1: true,
  },
  {
    name: `Scroll ${_.capitalize(networkType)}`,
    slug: "layer2",
    imageUrl: "/logo.png",
    icon: ScrollSvg,
    rpcUrl: RPC_URL.L2,
    explorer: EXPLORER_URL.L2,
    chainId: CHAIN_ID.L2,
    nativeTokenSymbol: ETH_SYMBOL,
    isL1: false,
  },
]

export const NATIVE_TOKEN_LIST: Token[] = [
  {
    chainId: CHAIN_ID.L1,
    name: "Ether",
    symbol: ETH_SYMBOL,
    decimals: BigInt(18),
    native: true,
    logoURI: ETHSvg,
  },
  {
    chainId: CHAIN_ID.L2,
    name: "Ether",
    symbol: ETH_SYMBOL,
    decimals: BigInt(18),
    native: true,
    logoURI: ETHSvg,
  },
]
