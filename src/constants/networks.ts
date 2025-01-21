import MainnetSvg from "@/assets/svgs/bridge/network-mainnet.svg"
import ETHSvg from "@/assets/svgs/bridge/network-mainnet.svg?url"
import ScrollSvg from "@/assets/svgs/bridge/network-scroll.svg"

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
    logoURI: ETHSvg.src,
  },
  {
    chainId: CHAIN_ID.L2,
    name: "Ether",
    symbol: ETH_SYMBOL,
    decimals: BigInt(18),
    native: true,
    logoURI: ETHSvg.src,
  },
]

export const EXTERNAL_BRIDGE_TOKEN_LIST = [
  // for testing, remove later
  {
    chainId: 11155111,
    address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
    name: "KelpDao Restaked ETH",
    symbol: "rsETH",
    decimals: 18,
    logoURI: "/imgs/token/rsETH.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "rsETH",
      bridgeInfo: {
        bridgeUrl: "https://kerneldao.com/kelp/bridge-wrap/",
        bridgeName: "KelpDao",
        bridgeIcon: "/imgs/logo/kelpdao.svg",
      },
    },
  },
  {
    chainId: 534351,
    address: "0x65421ba909200b81640d98B979d07487C9781B66",
    name: "KelpDao Restaked ETH",
    symbol: "rsETH",
    decimals: 18,
    logoURI: "/imgs/token/rsETH.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "rsETH",
      bridgeInfo: {
        bridgeUrl: "https://kerneldao.com/kelp/bridge-wrap/",
        bridgeName: "KelpDao",
        bridgeIcon: "/imgs/logo/kelpdao.svg",
      },
    },
  },
  {
    chainId: 11155111,
    address: "0x7A56E1C57C7475CCf742a1832B028F0456652F97",
    name: "Free Bridged SolvBTC",
    symbol: "SolvBTC",
    decimals: 18,
    logoURI: "/imgs/token/SolvBTC.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "SolvBTC",
      bridgeInfo: {
        bridgeUrl: "https://app.free.tech/SolvBTC?from=eth&to=scroll",
        bridgeName: "Free",
        bridgeIcon: "/imgs/logo/free.svg",
      },
    },
  },
  {
    chainId: 534351,
    address: "0x3Ba89d490AB1C0c9CC2313385b30710e838370a4",
    name: "Free Bridged SolvBTC",
    symbol: "SolvBTC",
    decimals: 18,
    logoURI: "/imgs/token/SolvBTC.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "SolvBTC",
      bridgeInfo: {
        bridgeUrl: "https://app.free.tech/SolvBTC?from=scroll&to=eth",
        bridgeName: "Free",
        bridgeIcon: "/imgs/logo/free.svg",
      },
    },
  },

  {
    chainId: 1,
    address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
    name: "KelpDao Restaked ETH",
    symbol: "rsETH",
    decimals: 18,
    logoURI: "/imgs/token/rsETH.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "rsETH",
      bridgeInfo: {
        bridgeUrl: "https://kerneldao.com/kelp/bridge-wrap/",
        bridgeName: "KelpDao",
        bridgeIcon: "/imgs/logo/kelpdao.svg",
      },
    },
  },
  {
    chainId: 534352,
    address: "0x65421ba909200b81640d98B979d07487C9781B66",
    name: "KelpDao Restaked ETH",
    symbol: "rsETH",
    decimals: 18,
    logoURI: "/imgs/token/rsETH.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "rsETH",
      bridgeInfo: {
        bridgeUrl: "https://kerneldao.com/kelp/bridge-wrap/",
        bridgeName: "KelpDao",
        bridgeIcon: "/imgs/logo/kelpdao.svg",
      },
    },
  },
  {
    chainId: 1,
    address: "0x7A56E1C57C7475CCf742a1832B028F0456652F97",
    name: "Free Bridged SolvBTC",
    symbol: "SolvBTC",
    decimals: 18,
    logoURI: "/imgs/token/SolvBTC.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "SolvBTC",
      bridgeInfo: {
        bridgeUrl: "https://app.free.tech/SolvBTC?from=eth&to=scroll",
        bridgeName: "Free",
        bridgeIcon: "/imgs/logo/free.svg",
      },
    },
  },
  {
    chainId: 534352,
    address: "0x3Ba89d490AB1C0c9CC2313385b30710e838370a4",
    name: "Free Bridged SolvBTC",
    symbol: "SolvBTC",
    decimals: 18,
    logoURI: "/imgs/token/SolvBTC.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "SolvBTC",
      bridgeInfo: {
        bridgeUrl: "https://app.free.tech/SolvBTC?from=scroll&to=eth",
        bridgeName: "Free",
        bridgeIcon: "/imgs/logo/free.svg",
      },
    },
  },
  {
    chainId: 1,
    address: "0x7122985656e38bdc0302db86685bb972b145bd3c",
    name: "StakeStone Ether",
    symbol: "STONE",
    decimals: 18,
    logoURI: "/imgs/token/STONE.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "STONE",
      bridgeInfo: {
        bridgeUrl: "https://app.stakestone.io/u/eth/bridge",
        bridgeName: "StakeStone",
        bridgeIcon: "/imgs/logo/STONE.svg",
      },
    },
  },
  {
    chainId: 534352,
    address: "0x80137510979822322193FC997d400D5A6C747bf7",
    name: "StakeStone Ether",
    symbol: "STONE",
    decimals: 18,
    logoURI: "/imgs/token/STONE.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "STONE",
      bridgeInfo: {
        bridgeUrl: "https://app.stakestone.io/u/eth/bridge",
        bridgeName: "StakeStone",
        bridgeIcon: "/imgs/logo/STONE.svg",
      },
    },
  },
  {
    chainId: 1,
    address: "0x9D39A5DE30e57443BfF2A8307A4256c8797A3497",
    name: "Staked USDe",
    symbol: "sUSDe",
    decimals: 18,
    logoURI: "/imgs/token/sUSDe.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "sUSDe",
      bridgeInfo: {
        bridgeUrl:
          "https://stargate.finance/bridge?srcChain=ethereum&srcToken=0x9D39A5DE30e57443BfF2A8307A4256c8797A3497&dstChain=scroll&dstToken=0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2",
        bridgeName: "Stargate",
        bridgeIcon: "/imgs/logo/Stargate.svg",
      },
    },
  },
  {
    chainId: 534352,
    address: "0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2",
    name: "Staked USDe",
    symbol: "sUSDe",
    decimals: 18,
    logoURI: "/imgs/token/sUSDe.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "sUSDe",
      bridgeInfo: {
        bridgeUrl:
          "https://stargate.finance/bridge?srcChain=scroll&srcToken=0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2&dstChain=ethereum&dstToken=0x9D39A5DE30e57443BfF2A8307A4256c8797A3497",
        bridgeName: "Stargate",
        bridgeIcon: "/imgs/logo/Stargate.svg",
      },
    },
  },
  {
    chainId: 1,
    address: "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3",
    name: "USDe",
    symbol: "USDe",
    decimals: 18,
    logoURI: "/imgs/token/USDe.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "USDe",
      bridgeInfo: {
        bridgeUrl:
          "https://stargate.finance/bridge?srcChain=ethereum&srcToken=0x4c9EDD5852cd905f086C759E8383e09bff1E68B3&dstChain=scroll&dstToken=0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
        bridgeName: "Stargate",
        bridgeIcon: "/imgs/logo/Stargate.svg",
      },
    },
  },
  {
    chainId: 534352,
    address: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
    name: "USDe",
    symbol: "USDe",
    decimals: 18,
    logoURI: "/imgs/token/USDe.svg",
    extensions: {
      scrollListId: "extended",
      scrollTokenId: "USDe",
      bridgeInfo: {
        bridgeUrl:
          "https://stargate.finance/bridge?srcChain=scroll&srcToken=0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34&dstChain=ethereum&dstToken=0x4c9EDD5852cd905f086C759E8383e09bff1E68B3",
        bridgeName: "Stargate",
        bridgeIcon: "/imgs/logo/Stargate.svg",
      },
    },
  },
]
