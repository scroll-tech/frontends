import Bithumb from "@/assets/images/defi/Bithumb.jpg"
import OKX from "@/assets/images/defi/OKX.jpg"
import BinanceSvg from "@/assets/svgs/defi/binance.svg?url"
import GetScrSvg from "@/assets/svgs/defi/get-scr.svg?url"
import StakeScrSvg from "@/assets/svgs/defi/stake-scr.svg?url"

const SWAP_IN_DEX = {
  title: "Swap in DEX",
  data: [
    {
      name: "Ambient",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
      href: "https://scroll-us.ambient.finance/swap/chain=0x82750&tokenA=0x0000000000000000000000000000000000000000&tokenB=0xd29687c813d741e2f938f4ac377128810e217b1b",
    },
    {
      name: "Maverick",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Maverick%20Protocol.jpg",
      href: "https://app.mav.xyz/?chain=534352&tokenB=0xd29687c813D741E2F938F4aC377128810E217b1b",
    },
    {
      name: "Oku Trade",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Oku%20Trade.jpeg",
      href: "https://oku.trade/app/scroll/trade/0xd29687c813d741e2f938f4ac377128810e217b1b",
    },
    { name: "SyncSwap", logoURL: "https://scroll-eco-list.netlify.app/logos/Syncswap.png", href: "https://syncswap.xyz/swap" },
  ],
}

const BUY_ON_BINANCE = {
  title: "Buy on CEX",
  data: [
    {
      name: "Binance",
      logoURL: BinanceSvg,
      href: "https://www.binance.com/en/trade/SCR_USDT",
    },
    {
      name: "Bithumb",
      logoURL: Bithumb,
      href: "https://www.bithumb.com/react/trade/order/SCR-KRW",
    },
    {
      name: "OKX",
      logoURL: OKX,
      href: "https://www.okx.com/trade-spot/scr-usdt",
    },
  ],
}

export const GER_SCR_DATA = [SWAP_IN_DEX, BUY_ON_BINANCE]

const data = [
  {
    id: "get-scr",
    imageURL: GetScrSvg,
    title: "Get SCR",
    description: "SCR is Scroll's governance token, which can be used to vote or raise proposals in the Scroll community.",
    values: [
      { label: "Circulating supply", value: 0 },
      { label: "Votable supply", value: 0 },
    ],
    actionLabel: "Get SCR now",
  },
  {
    id: "stake-scr",
    imageURL: StakeScrSvg,
    title: "Stake SCR to get sSCR",
    description:
      "sSCR (restaked SCR) is an LRT with SCR as the underlying assets, which can be deployed into the wider DeFi ecosystem to earn rewards and secure key features and applications in the future.",
    values: [{ label: "Total sSCR", value: null }],
    actionLabel: "Coming soon",
    upcoming: true,
  },
]

export default data
