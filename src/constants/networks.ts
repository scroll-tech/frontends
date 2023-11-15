import ETHSvg from "@/assets/svgs/bridge/network-mainnet.svg"
import { ReactComponent as MainnetSvg } from "@/assets/svgs/bridge/network-mainnet.svg"
import { ReactComponent as ScrollSvg } from "@/assets/svgs/bridge/network-scroll.svg"

import { CHAIN_ID, ETH_SYMBOL, EXPLORER_URL, L1_NAME, L2_NAME, RPC_URL } from "./common"

export const NETWORKS: Network[] = [
  {
    name: L1_NAME,
    slug: "layer1",
    icon: MainnetSvg,
    rpcUrl: RPC_URL.L1,
    explorer: EXPLORER_URL.L1,
    chainId: CHAIN_ID.L1,
    nativeTokenSymbol: ETH_SYMBOL,
    isL1: true,
  },
  {
    name: L2_NAME,
    slug: "layer2",
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
