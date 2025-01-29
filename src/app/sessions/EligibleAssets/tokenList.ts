import ETHSvg from "@/assets/svgs/bridge/network-mainnet.svg?url"

const TOKEN_LIST = [
  {
    name: "SCR",
    logoURI: "/imgs/token/scr.svg",
    href: "https://scrollscan.com/token/0xd29687c813d741e2f938f4ac377128810e217b1b",
  },
  {
    name: "ETH/WETH",
    logoURI: ETHSvg,
    href: "/bridge?token=ETH",
  },
  {
    name: "wstETH",
    logoURI: "/imgs/sessions/tokens/wstETH.svg",
    href: "/bridge?token=wstETH",
  },
  {
    name: "weETH",
    logoURI: "/imgs/sessions/tokens/weETH.png",
    href: "https://app.ether.fi/weeth",
  },
  {
    name: "wrsETH",
    logoURI: "/imgs/sessions/tokens/wrsETH.svg",
    href: "https://kelpdao.xyz/bridge-wrap/",
  },
  {
    name: "USDC",
    logoURI: "https://scroll-tech.github.io/token-list/data/USDC/logo.svg",
    href: "/bridge?token=USDC",
  },
  {
    name: "USDT",
    logoURI: "https://scroll-tech.github.io/token-list/data/USDT/logo.svg",
    href: "/bridge?token=USDT",
  },
  {
    name: "USDQ",
    logoURI: "/imgs/sessions/tokens/USDQ.svg",
    href: "https://app.quill.finance/borrow",
  },
  {
    name: "sUSDe/USDe",
    logoURI: "/imgs/sessions/tokens/sUSDe.svg",
    href: "https://app.ethena.fi/buy",
  },
  // {
  //   name: "WBTC",
  //   logoURI: "/imgs/sessions/tokens/WBTC.svg",
  //   href: "/bridge?token=WBTC",
  // },
  // {
  //   name: "SolvBTC",
  //   logoURI: "/imgs/sessions/tokens/solvBTC.png",
  //   href: "https://app.solv.finance/solvbtc?network=ethereum",
  // },
  {
    name: "STONE",
    logoURI: "/imgs/sessions/tokens/stone-white.svg",
    href: "https://poc.routerintents.com/apps/stakestone",
  },

  // {
  //   name: "pufETH",
  //   logoURI: "https://scroll-tech.github.io/token-list/data/PufETH/logo.svg",
  //   href: "/bridge?token=PufETH",
  // },
  // {
  //   name: "agETH/ agETHWrapper",
  //   logoURI: "/imgs/sessions/tokens/agETH.png",
  //   href: "https://kelpdao.xyz/defi/",
  //   narrow: true,
  // },
]

export default TOKEN_LIST
