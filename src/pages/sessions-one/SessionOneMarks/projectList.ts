export const defaultProjectList = {
  dex: [
    {
      name: "Ambient",
      project: "Ambient",
    },
    {
      name: "Nuri",
      project: "Nuri",
    },
    {
      name: "Others",
      project: "Others",
      items: [
        {
          name: "Izumi",
          project: "Izumi",
        },
        {
          name: "Oku Trade",
          project: "Oku Trade",
        },
        {
          name: "SyncSwap",
          project: "SyncSwap",
        },
        {
          name: "Zebra",
          project: "Zebra",
        },
      ],
    },
  ],
  lending: [
    {
      name: "Aave",
      project: "Aave",
    },

    {
      name: "Rho Markets",
      project: "Rho Markets",
    },
    {
      name: "Others",
      project: "Others",
      items: [
        {
          name: "Cog Finance",
          project: "Cog Finance",
        },
        {
          name: "Compound",
          project: "Compound",
        },
        {
          name: "LayerBank",
          project: "Layerbank",
        },
        {
          name: "Synonym",
          project: "Synonym",
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
  { name: "Ambient", key: "Ambient", logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png", website: "https://ambient.finance/" },
  {
    name: "Nuri",
    key: "Nuri",
    logo: "https://scroll-eco-list.netlify.app/logos/Nuri%20Exchange.jpeg",
    website: "https://www.nuri.exchange/swap",
  },
  {
    name: "Izumi",
    key: "Izumi",
    logo: "https://scroll-eco-list.netlify.app/logos/iZUMi%20Finance.png",
    website: "https://izumi.finance/trade/swap",
  },
  {
    name: "Oku Trade",
    key: "Oku Trade",
    logo: "https://scroll-eco-list.netlify.app/logos/Oku%20Trade.jpeg",
    website: "https://oku.trade/",
  },
  {
    name: "SyncSwap",
    key: "SyncSwap",
    logo: "https://scroll-eco-list.netlify.app/logos/Syncswap.png",
    website: "https://syncswap.xyz/",
  },
  {
    name: "Zebra",
    key: "Zebra",
    logo: "https://scroll-eco-list.netlify.app/logos/Zebra.png",
    website: "https://www.zebra.xyz/",
  },
  {
    name: "Aave",
    key: "Aave",
    logo: "https://scroll-eco-list.netlify.app/logos/Aave.svg",
    website: "https://app.aave.com/",
  },

  {
    name: "Rho Markets",
    key: "Rho Markets",
    logo: "https://scroll-eco-list.netlify.app/logos/Rho%20Markets.png",
    website: "https://dapp.rhomarkets.xyz/",
  },
  {
    name: "Cog Finance",
    key: "Cog Finance",
    logo: "https://scroll-eco-list.netlify.app/logos/Cog%20Finance.png",
    website: "https://www.cog.finance/",
  },
  {
    name: "Compound",
    key: "Compound",
    logo: "https://scroll-eco-list.netlify.app/logos/Compound%20Finance.png",
    website: "https://compound.finance/",
  },
  {
    name: "LayerBank",
    key: "Layerbank",
    logo: "https://scroll-eco-list.netlify.app/logos/LayerBank.png",
    website: "https://scroll.layerbank.finance/bank",
  },
  {
    name: "Synonym",
    key: "Synonym",
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
