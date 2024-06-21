export const defaultProjectList = {
  dex: [
    {
      name: "Ambient",
      project: "ambient",
    },
    {
      name: "Nuri",
      project: "nuri",
    },
    {
      name: "Others",
      project: "Others",
      items: [
        {
          name: "Izumi",
          project: "izumi",
        },
        {
          name: "Oku Trade",
          project: "oku_trade",
        },
        {
          name: "Syncswap",
          project: "syncswap",
        },
        {
          name: "Zebra",
          project: "zebra",
        },
      ],
    },
  ],
  lending: [
    {
      name: "Aave",
      project: "aave",
    },

    {
      name: "Rho Markets",
      project: "rho_markets",
    },
    {
      name: "Others",
      project: "Others",
      items: [
        {
          name: "Cog Finance",
          project: "cog_finance",
        },
        {
          name: "Compound",
          project: "compound",
        },
        {
          name: "LayerBank",
          project: "layerbank",
        },
        {
          name: "Synonym",
          project: "synonym",
        },
      ],
    },
  ],
  // activities: [
  //   {
  //     name: "Mint Scroll Canvas",
  //     project: "canvas",
  //   },
  // ],
}

const PROJECT_LIST = [
  { name: "Ambient", key: "ambient", logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png", website: "https://ambient.finance/" },
  {
    name: "Nuri",
    key: "nuri",
    logo: "https://scroll-eco-list.netlify.app/logos/Nuri%20Exchange.jpeg",
    website: "https://www.nuri.exchange/swap",
  },
  {
    name: "Izumi",
    key: "izumi",
    logo: "https://scroll-eco-list.netlify.app/logos/iZUMi%20Finance.png",
    website: "https://izumi.finance/trade/swap",
  },
  {
    name: "Oku Trade",
    key: "oku_trade",
    logo: "https://scroll-eco-list.netlify.app/logos/Oku%20Trade.png",
    website: "https://oku.trade/",
  },
  {
    name: "Syncswap",
    key: "syncswap",
    logo: "https://scroll-eco-list.netlify.app/logos/Syncswap.png",
    website: "https://syncswap.xyz/",
  },
  {
    name: "Zebra",
    key: "zebra",
    logo: "https://scroll-eco-list.netlify.app/logos/Zebra.png",
    website: "https://www.zebra.xyz/",
  },
  {
    name: "Aave",
    key: "aave",
    logo: "https://scroll-eco-list.netlify.app/logos/Aave.svg",
    website: "https://app.aave.com/",
  },

  {
    name: "Rho Markets",
    key: "rho_markets",
    logo: "https://scroll-eco-list.netlify.app/logos/Rho%20Markets.png",
    website: "https://dapp.rhomarkets.xyz/",
  },
  {
    name: "Cog Finance",
    key: "cog_finance",
    logo: "https://scroll-eco-list.netlify.app/logos/Cog%20Finance.png",
    website: "https://www.cog.finance/",
  },
  {
    name: "Compound",
    key: "compound",
    logo: "https://scroll-eco-list.netlify.app/logos/Compound%20Finance.png",
    website: "https://compound.finance/",
  },
  {
    name: "LayerBank",
    key: "layerbank",
    logo: "https://scroll-eco-list.netlify.app/logos/LayerBank.png",
    website: "https://scroll.layerbank.finance/bank",
  },
  {
    name: "Synonym",
    key: "synonym",
    logo: "https://scroll-eco-list.netlify.app/logos/Synonym%20Finance.jpg",
    website: "https://www.synonym.finance/",
  },
  // {
  //   name: "Mint Scroll Canvas",
  //   key: "canvas",
  //   logo: "/imgs/canvas/ScrollCanvas.svg",
  //   website: "/scroll-canvas",
  // },
]

export const PROJECT_MAP = new Proxy(PROJECT_LIST, {
  get(target, project) {
    return target.find(item => item.key === project)
  },
})
