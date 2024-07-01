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
    name: "weETH",
    symbol: "weETH",
    key: "weETH",
    logoURI: "/imgs/sessions/tokens/weETH.png",
    address: "0x01f0a31698C4d065659b9bdC21B3610292a1c506",
    thirdPartyBridge: {
      url: "https://stargate.finance/bridge",
      name: "Stargate",
      // name:"etherfi"
    },
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
    name: "WBTC",
    symbol: "WBTC",
    key: "WBTC",
    logoURI: "/imgs/sessions/tokens/WBTC.svg",
    address: "0x3C1BCa5a656e69edCD0D4E36BEbb3FcDAcA60Cf1",
  },
  {
    name: "SolvBTC.b",
    symbol: "SolvBTC.b",
    key: "solvBTC",
    logoURI: "/imgs/sessions/tokens/solvBTC.png",
    address: "0x3Ba89d490AB1C0c9CC2313385b30710e838370a4",
    thirdPartyBridge: {
      url: "https://free.tech/",
      name: "Free",
    },
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
  {
    name: "Assets on Pencils’ Vaults",
    key: "PENCILS",
    logoURI: "/imgs/sessions/tokens/Pencils.jpeg",
    containedTokens: [
      { logoURI: ETHSvg, symbol: ETH_SYMBOL },
      { logoURI: "https://scroll-tech.github.io/token-list/data/USDC/logo.svg", symbol: "USDC" },
      { logoURI: "https://scroll-tech.github.io/token-list/data/USDT/logo.svg", symbol: "USDT" },
      { logoURI: "/imgs/sessions/tokens/weETH.png", symbol: "weETH" },
      { logoURI: "/imgs/sessions/tokens/wrsETH.svg", symbol: "wrsETH" },
      { logoURI: "https://scroll-tech.github.io/token-list/data/wstETH/logo.svg", symbol: "wstETH" },
      { logoURI: "/imgs/sessions/tokens/WBTC.svg", symbol: "WBTC" },
      { logoURI: "/imgs/sessions/tokens/solvBTC.png", symbol: "SolvBTC.b" },
      { logoURI: "/imgs/sessions/tokens/stone-white.svg", symbol: "STONE" },
    ],
    thirdPartyBridge: {
      url: "https://pencilsprotocol.io/staking",
      name: "Pencils",
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
