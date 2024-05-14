import ETHSvg from "@/assets/svgs/bridge/network-mainnet.svg"
import { ETH_SYMBOL } from "@/constants"

// from https://scroll-tech.github.io/token-list/scroll.tokenlist.json
export const tokenList = [
  {
    name: "Ether",
    symbol: ETH_SYMBOL,
    logoURI: ETHSvg,
  },
  // {
  //   name: "Wrapped Ether",
  //   symbol: "WETH",
  //   logoURI: "/imgs/sessions/tokens/weth.png",
  //   address: "0x5300000000000000000000000000000000000004",
  // },
  {
    name: "Wrapped stETH",
    symbol: "wstETH",
    logoURI: "/imgs/sessions/tokens/wstETH.svg",
    address: "0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32",
  },
  {
    name: "StakeStone Ether",
    symbol: "STONE",
    logoURI: "/imgs/sessions/tokens/stone-white.svg",
    address: "0x80137510979822322193FC997d400D5A6C747bf7",
    thirdPartyBridge: {
      url: "https://app.stakestone.io/u/bridge?n=534352",
      name: "LayerZero",
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
