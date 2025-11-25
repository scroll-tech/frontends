import { ecosystemOrigin } from "@/apis/ecosystem"
import HoneyPop from "@/assets/images/sessions/HoneyPop.png"
import QuillFinanceSvg from "@/assets/svgs/sessions/QuillFinance.svg?url"

export interface ProtocolMarksMap {
  [key: string]: string
}

export interface ProtocolData {
  title: string
  description: string
  tag: string
  tagTooltip?: string
  data: Protocol[]
}

export interface Protocol {
  name: string
  project: string // corresponds to "project" value in the api
  logoURL: string
  href: string
  upcoming?: boolean
}

const DECENTRALIZED_EXCHANGES_DATA: ProtocolData = {
  title: "Decentralized Exchanges",
  description:
    "Marks are given to users who deposit eligible assets into selected DEX liquidity pools. Liquidity deposits with tighter ranges or more market depth are given Marks at a higher rate.",
  tag: "1x ~ 6x Marks",
  data: [
    {
      name: "Ambient",
      project: "Ambient",
      logoURL: `${ecosystemOrigin}/logos/Ambient%20Finance.png`,
      href: "https://ambient.finance/",
    },
    {
      name: "HoneyPop",
      project: "Honeypop",
      logoURL: HoneyPop.src,
      href: "https://honeypop.app/",
    },
    {
      name: "iZUMi",
      project: "iZUMi",
      logoURL: `${ecosystemOrigin}/logos/iZUMi%20Finance.png`,
      href: "https://izumi.finance/trade/swap",
    },
    {
      name: "Maverick",
      project: "Maverick",
      logoURL: `${ecosystemOrigin}/logos/Maverick%20Protocol.jpg`,
      href: "https://www.mav.xyz/",
    },
    {
      name: "Nuri",
      project: "Nuri",
      logoURL: `${ecosystemOrigin}/logos/Nuri%20Exchange.png`,
      href: "https://www.nuri.exchange/",
    },
    {
      name: "Oku Trade",
      project: "Oku Trade",
      logoURL: `${ecosystemOrigin}/logos/Oku%20Trade.jpeg`,
      href: "https://oku.trade/",
    },

    // {
    //   name: "Scribe",
    //   project: "Scribe",
    //   logoURL: "/imgs/sessions/tokens/Scribe.png",
    //   href: "https://scribe.exchange/",
    // },
    {
      name: "SyncSwap",
      project: "SyncSwap",
      logoURL: `${ecosystemOrigin}/logos/Syncswap.png`,
      href: "https://syncswap.xyz/",
      upcoming: true,
    },
    // {
    //   name: "Tempest",
    //   project: "Tempest",
    //   logoURL: `${ecosystemOrigin}/logos/Tempest%20Finance.png`,
    //   href: "https://app.tempestfinance.xyz/vaults",
    //   upcoming: true,
    // },
    // {
    //   name: "Vessel",
    //   project: "Vessel",
    //   logoURL: `${ecosystemOrigin}/logos/Vessel.jpg`,
    //   href: "https://vessel.finance/",
    // },
    // {
    //   name: "Wombat",
    //   project: "Wombat",
    //   logoURL: `${ecosystemOrigin}/logos/Wombat%20Exchange.png`,
    //   href: "https://www.wombat.exchange/",
    // },
    // {
    //   name: "Zebra",
    //   project: "Zebra",
    //   logoURL: `${ecosystemOrigin}/logos/Zebra.png`,
    //   href: "https://app.zebra.xyz/#/swap",
    // },
  ],
}

const LENDING_BORROWING_DATA: ProtocolData = {
  title: "Lending & Borrowing",
  description:
    "Marks are given to users who deposit eligible assets into selected lending markets. Marks are not given for recursive supplying/borrowing.",
  tag: "1x Marks",
  data: [
    {
      name: "Aave",
      project: "Aave",
      logoURL: `${ecosystemOrigin}/logos/Aave.svg`,
      href: "https://app.aave.com/",
    },
    {
      name: "Compound",
      project: "Compound",
      logoURL: `${ecosystemOrigin}/logos/Compound%20Finance.png`,
      href: "https://app.compound.finance/?market=usdc-scroll",
    },
    // Collateralized Debt Position
    {
      name: "Quill Finance",
      project: "Quill Finance",
      logoURL: QuillFinanceSvg,
      href: "https://www.quill.finance/",
      upcoming: true,
    },
    // {
    //   name: "Huma",
    //   project: "Huma",
    //   logoURL: "/imgs/sessions/tokens/Huma.svg",
    //   href: "https://app.huma.finance/evm/#/",
    // },
    // {
    //   name: "Layer Bank",
    //   project: "Layerbank",
    //   logoURL: `${ecosystemOrigin}/logos/LayerBank.png`,
    //   href: "https://app.layerbank.finance/scroll/bank",
    // },
  ],
}

const OTHERS_DATA: ProtocolData = {
  title: "Others",
  description: "Marks are given to users who deposit eligible assets into selected project’s vaults.",
  tag: "1x Marks",
  data: [
    {
      name: "Beefy",
      project: "Beefy",
      logoURL: `${ecosystemOrigin}/logos/Beefy.png`,
      href: "https://app.beefy.com/",
    },
    // {
    //   name: "Euler Finance",
    //   project: "Euler Finance",
    //   logoURL: "/imgs/token/Euler.png",
    //   href: "https://www.euler.finance/",
    // },
    {
      name: "Loopfi",
      project: "Loopfi",
      logoURL: `${ecosystemOrigin}/logos/Loop.jpg`,
      href: "https://app.loopfi.xyz/",
    },
    // {
    //   name: "Pencils",
    //   project: "Pencils",
    //   logoURL: `${ecosystemOrigin}/logos/Pencils%20Protocol.png`,
    //   href: "https://app.pencilsprotocol.io/farming",
    // },
    {
      name: "Rho Markets",
      project: "Rho Markets",
      logoURL: `${ecosystemOrigin}/logos/Rho%20Markets.png`,
      href: "https://www.rhomarkets.xyz/",
    },
    // {
    //   name: "Tranchess",
    //   project: "Tranchess",
    //   logoURL: `${ecosystemOrigin}/logos/Tranchess.png`,
    //   href: "https://www.tranchess.com/",
    // },
  ],
}

const protocolList = [DECENTRALIZED_EXCHANGES_DATA, LENDING_BORROWING_DATA, OTHERS_DATA]

export default protocolList
