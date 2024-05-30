import ETHSvg from "@/assets/svgs/bridge/network-mainnet.svg"
import { ETH_SYMBOL } from "@/constants"

// from https://scroll-tech.github.io/token-list/scroll.tokenlist.json
// name: displayed name
// symbol: for going to native badge / earn marks tag
// key: api field
export const tokenList = [
  {
    name: "ETH / WETH",
    symbol: ETH_SYMBOL,
    key: "ETH",
    logoURI: ETHSvg,
    additionalToken: "WETH",
  },
  // {
  //   name: "Wrapped Ether",
  //   symbol: "WETH",
  //   logoURI: "/imgs/sessions/tokens/weth.png",
  //   address: "0x5300000000000000000000000000000000000004",
  // },
  {
    name: "USDC",
    symbol: "USDC",
    key: "USDC",
    logoURI: "https://scroll-tech.github.io/token-list/data/USDC/logo.svg",
    address: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
  },
  {
    name: "USDT",
    symbol: "USDT",
    key: "USDT",
    logoURI: "https://scroll-tech.github.io/token-list/data/USDT/logo.svg",
    address: "0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df",
  },
  {
    name: "wrsETH",
    symbol: "wrsETH",
    key: "wrsETH",
    logoURI: "/imgs/sessions/tokens/wrsETH.svg",
    address: "0xa25b25548B4C98B0c7d3d27dcA5D5ca743d68b7F",
    thirdPartyBridge: {
      url: "https://kelpdao.xyz/restake",
      name: "Kelp",
    },
  },
  {
    name: "wstETH",
    symbol: "wstETH",
    key: "wstETH",
    logoURI: "/imgs/sessions/tokens/wstETH.svg",
    address: "0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32",
  },
  {
    name: "STONE",
    symbol: "STONE",
    key: "STONE",
    logoURI: "/imgs/sessions/tokens/stone-white.svg",
    address: "0x80137510979822322193FC997d400D5A6C747bf7",
    thirdPartyBridge: {
      url: "https://app.stakestone.io/u/bridge?n=534352",
      name: "LayerZero",
    },
  },
  {
    name: "Assets on Tranchess",
    key: "TRANCHESS",
    logoURI: "/imgs/sessions/tokens/Tranchess.svg",
    containedTokens: [
      { logoURI: "/imgs/sessions/tokens/turPSTONE.svg", symbol: "turPSTONE" },
      { logoURI: "/imgs/sessions/tokens/staYSTONE.svg", symbol: "staYSTONE" },
      { logoURI: "/imgs/sessions/tokens/stoneQueen.svg", symbol: "stoneQueen" },
    ],
    thirdPartyBridge: {
      url: "https://tranchess.com",
      name: "Tranchess",
    },
  },
]

export const gasList = [
  {
    logoURI: "/imgs/sessions/gas.svg",
    symbol: ETH_SYMBOL,
  },
]

export const tokenMap = new Proxy(tokenList, {
  get(target, prop) {
    return target.find(item => item.symbol === prop)
  },
})

// TODO: fetch from api
export const tokenListWithMarks = [
  {
    tokenSymbol: ETH_SYMBOL,
    amount: "1.234",
    valueInUsd: 3149.55,
    points: 1400,
  },
  {
    tokenSymbol: "wstETH",
    amount: "3333",
    valueInUsd: 3333,
    points: 1000,
  },
  {
    tokenSymbol: "STONE",
    amount: "3333",
    valueInUsd: 3333,
    points: 0,
  },
]

export const gasMetricsMark = {
  gasSpent: "5.6",
  points: 2000,
}

export default tokenList
