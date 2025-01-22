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
      logoURL: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
      href: "https://ambient.finance/",
      upcoming: true,
    },
    {
      name: "Maverick",
      project: "Maverick",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Maverick%20Protocol.jpg",
      href: "https://www.mav.xyz/",
    },
    {
      name: "Nuri",
      project: "Nuri",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Nuri%20Exchange.png",
      href: "https://www.nuri.exchange/",
    },
    {
      name: "Oku Trade",
      project: "Oku Trade",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Oku%20Trade.jpeg",
      href: "https://oku.trade/",
    },
    // {
    //   name: "Izumi",
    //   project: "Izumi",
    //   logoURL: "https://scroll-eco-list.netlify.app/logos/iZUMi%20Finance.png",
    //   href: "https://izumi.finance/trade/swap",
    // },
    // {
    //   name: "Scribe",
    //   project: "Scribe",
    //   logoURL: "/imgs/sessions/tokens/Scribe.png",
    //   href: "https://scribe.exchange/",
    // },
    {
      name: "SyncSwap",
      project: "SyncSwap",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Syncswap.png",
      href: "https://syncswap.xyz/",
      upcoming: true,
    },
    // {
    //   name: "Vessel",
    //   project: "Vessel",
    //   logoURL: "https://scroll-eco-list.netlify.app/logos/Vessel.jpg",
    //   href: "https://vessel.finance/",
    // },
    // {
    //   name: "Wombat",
    //   project: "Wombat",
    //   logoURL: "https://scroll-eco-list.netlify.app/logos/Wombat%20Exchange.png",
    //   href: "https://www.wombat.exchange/",
    // },
    // {
    //   name: "Zebra",
    //   project: "Zebra",
    //   logoURL: "https://scroll-eco-list.netlify.app/logos/Zebra.png",
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
      logoURL: "https://scroll-eco-list.netlify.app/logos/Aave.svg",
      href: "https://app.aave.com/",
      upcoming: true,
    },
    {
      name: "Compound",
      project: "Compound",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Compound%20Finance.png",
      href: "https://app.compound.finance/?market=usdc-scroll",
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
    //   logoURL: "https://scroll-eco-list.netlify.app/logos/LayerBank.png",
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
      logoURL: "https://scroll-eco-list.netlify.app/logos/Beefy.png",
      href: "https://app.beefy.com/",
      upcoming: true,
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
      logoURL: "https://scroll-eco-list.netlify.app/logos/Loop.jpg",
      href: "https://app.loopfi.xyz/",
      upcoming: true,
    },
    // {
    //   name: "Pencils",
    //   project: "Pencils",
    //   logoURL: "https://scroll-eco-list.netlify.app/logos/Pencils%20Protocol.png",
    //   href: "https://app.pencilsprotocol.io/farming",
    // },
    {
      name: "Rho Markets",
      project: "Rho Markets",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Rho%20Markets.png",
      href: "https://www.rhomarkets.xyz/",
      upcoming: true,
    },
    {
      name: "Tempest",
      project: "Tempest",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Tempest%20Finance.png",
      href: "https://app.tempestfinance.xyz/vaults",
      upcoming: true,
    },
    // {
    //   name: "Tranchess",
    //   project: "Tranchess",
    //   logoURL: "https://scroll-eco-list.netlify.app/logos/Tranchess.png",
    //   href: "https://www.tranchess.com/",
    // },
  ],
}

const protocolList = [DECENTRALIZED_EXCHANGES_DATA, LENDING_BORROWING_DATA, OTHERS_DATA]

export default protocolList
