import ETHSvg from "@/assets/svgs/eth.svg"

import { CHAIN_ID, ETH_SYMBOL, EXPLORER_URL, RPC_URL } from "./common"
import { TESTNET_NAME } from "./scroll"

export const NETWORKS = [
  {
    name: "Goerli Testnet",
    slug: "goerli",
    imageUrl: "/imgs/bridge/mainnet.svg",
    rpcUrl: RPC_URL.L1,
    explorer: EXPLORER_URL.L1,
    chainId: CHAIN_ID.L1,
    nativeTokenSymbol: ETH_SYMBOL,
    isL1: true,
  },
  {
    name: TESTNET_NAME,
    slug: "layer2",
    imageUrl: "/logo.png",
    rpcUrl: RPC_URL.L2,
    explorer: EXPLORER_URL.L2,
    chainId: CHAIN_ID.L2,
    nativeTokenSymbol: ETH_SYMBOL,
    isL1: false,
  },
]

type BaseToken = {
  chainId: number
  name: string
  symbol: string
  decimals: bigint
  logoURI: string
}

export type NativeToken = BaseToken & {
  native: boolean
}

export type ERC20Token = BaseToken & {
  address: string
}

export type Token = NativeToken | ERC20Token

export const NATIVE_TOKEN_LIST: Token[] = [
  {
    chainId: CHAIN_ID.L1,
    name: ETH_SYMBOL,
    symbol: ETH_SYMBOL,
    decimals: BigInt(18),
    native: true,
    logoURI: ETHSvg,
  },
  {
    chainId: CHAIN_ID.L2,
    name: ETH_SYMBOL,
    symbol: ETH_SYMBOL,
    decimals: BigInt(18),
    native: true,
    logoURI: ETHSvg,
  },
]
