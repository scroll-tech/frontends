import { isMainnet, requireEnv } from "@/utils"

export const BADGES_ADDRESS = {
  sepolia: {
    SCROLL_SIMPLE_BADGE_A_ADDRESS: "0x30C98067517f8ee38e748A3aF63429974103Ea6B",
    SCROLL_SIMPLE_BADGE_B_ADDRESS: "0xeBFc9B95328B2Cdb3c4CA8913e329c101d2Abbc2",
    SCROLL_SIMPLE_BADGE_C_ADDRESS: "0x64492EF5a60245fbaF65F69782FCf158F3a8e3Aa",

    SCROLL_ORIGINS_BADGE_ADDRESS: "0x2A3aC1337845f8C02d2dD7f80Dada22f01b569f9",

    ETHEREUM_YEAR_BADGE_ADDRESS: "0xB59B6466B21a089c93B14030AF88b164905a58fd",
    ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS: "0xdAe8D9a30681899C305534849e138579aF0BF88e",

    AMBIENT_SWAPOOR_BADGE_ADDRESS: "0x3abe5377E347D5E7d45bd6E2E506F753B9786cE9",
    AMBIENT_PROVIDOOR_BADGE_ADDRESS: "0x7D61d353d2b8E8BD66c069eaEa088fDB006ADf5c",
    AMBIENT_FILLOOR_BADGE_ADDRESS: "0x184775970b6736d9be4B9e9A3E0b1D03815d5aC1",
    AMBIENT_YEET_BADGE_ADDRESS: "0x3B916928bb6AF9215AdbCeCf9ced50e6Cb3553d0",
    AMBIENT_ATTESTER_PROXY_ADDRESS: "0x9F54d1FFc14C61b7EC170F6cA53434855D3737AA",

    Ambient_BASE_URL: "https://ambient-scroll-badge-sepolia.liquidity.tools/api",

    ZEBRA_BADGE_ADDRESS: "0x619a0A19203697f36C4092C757485734Ec23b2eB",
    ZEBRA_ATTESTER_PROXY_ADDRESS: "0xD528308D3f0c6CfF15C6D25193d77aFB123ABe82",
    Zebra_BASE_URL: "https://zktrade.net/api/badge",

    // COG_FINANCE_BADGE_ADDRESS : "0x919d0233B291c0f2e49f36D87bd8938559a4e938",
    // COG_FINANCE_ATTESTER_PROXY_ADDRESS : "0x93db06C5C0470e50327CBB16641a40750c1a5901",
  },
  mainnet: {
    SCROLL_SIMPLE_BADGE_A_ADDRESS: "0xB1Dbd079c62d181926E5A54932Bb1b15F760e8A0",
    SCROLL_SIMPLE_BADGE_B_ADDRESS: "0xe626E631BdDcd985D02D2eEe4fbdF901b52AE33C",
    SCROLL_SIMPLE_BADGE_C_ADDRESS: "0xe485f8fcBf3b678e83d208fa3f1933a315d58356",

    SCROLL_ORIGINS_BADGE_ADDRESS: "0x1B2E568bE7E11c4e94f2c9dC68bE58A80FeeD80A",

    ETHEREUM_YEAR_BADGE_ADDRESS: "0x24Eb2CC4657986efbB2cCE41943C59d6708c8f54",
    ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS: "0xc1d9C7Cdb33107f1fEa871F2e874b9a95EE3f260",

    AMBIENT_SWAPOOR_BADGE_ADDRESS: "0xDcB439703F40430dE360dfeEd51E4261D1fAa310",
    AMBIENT_PROVIDOOR_BADGE_ADDRESS: "0x9289079DF3C056A5feFD0F07AD610C1D889Ea316",
    AMBIENT_FILLOOR_BADGE_ADDRESS: "0x7aFcb77B33F8CAb87Bcd16bA8E94b79A2146a39E",
    AMBIENT_YEET_BADGE_ADDRESS: "0x38129F0582A984F57f41F29eD183c8Ea5e798796",
    AMBIENT_ATTESTER_PROXY_ADDRESS: "0x83f26d1c451DFCFE2e16B479981c6fA2BCCe053F",
    Ambient_BASE_URL: "https://ambient-scroll-badge.liquidity.tools/api",

    ZEBRA_BADGE_ADDRESS: "",
    ZEBRA_ATTESTER_PROXY_ADDRESS: "",
    Zebra_BASE_URL: "",
  },
}

const {
  SCROLL_SIMPLE_BADGE_A_ADDRESS,
  SCROLL_SIMPLE_BADGE_B_ADDRESS,
  SCROLL_SIMPLE_BADGE_C_ADDRESS,
  ETHEREUM_YEAR_BADGE_ADDRESS,
  ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS,
  AMBIENT_SWAPOOR_BADGE_ADDRESS,
  AMBIENT_PROVIDOOR_BADGE_ADDRESS,
  AMBIENT_FILLOOR_BADGE_ADDRESS,
  AMBIENT_YEET_BADGE_ADDRESS,
  AMBIENT_ATTESTER_PROXY_ADDRESS,
  Ambient_BASE_URL,
  ZEBRA_BADGE_ADDRESS,
  ZEBRA_ATTESTER_PROXY_ADDRESS,
  Zebra_BASE_URL,
} = BADGES_ADDRESS[isMainnet ? "mainnet" : "sepolia"]

const ETHEREUM_YEAR_BASE_URL = `${requireEnv("REACT_APP_CANVAS_BACKEND_URI")}/badge`

export const ETHEREUM_YEAR_BADGE = {
  name: "Ethereum Year Badge",
  badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
  attesterProxy: ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS,
  description:
    "Check out the Ethereum Year Badge! It's like a digital trophy that shows off the year your wallet made its debut on Ethereum. It's a little present from Scroll to celebrate all the cool stuff you've done in the Ethereum ecosystem.",
  image: "/imgs/canvas/Badge_Ethereum_Year.png",
  native: false,
  issuer: {
    origin: "https://scroll.io",
    name: "Scroll",
    logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
  },
  baseUrl: ETHEREUM_YEAR_BASE_URL,
}

export const THIRD_PARTY_BADGES = isMainnet
  ? [
      {
        name: "Swapoor",
        badgeContract: AMBIENT_SWAPOOR_BADGE_ADDRESS,
        attesterProxy: AMBIENT_ATTESTER_PROXY_ADDRESS,
        description: "Swapooor! You have made a swap on Ambient Finance for over $500. Art by: @ShizzyAizawa",
        image: "https://ambient.finance/scroll-badge/1.png",
        issuer: {
          origin: "https://scroll.ambient.finance/",
          name: "Ambient",
          logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
        },
        baseUrl: Ambient_BASE_URL,
        native: false,
      },
      {
        name: "Providoor",
        badgeContract: AMBIENT_PROVIDOOR_BADGE_ADDRESS,
        attesterProxy: AMBIENT_ATTESTER_PROXY_ADDRESS,
        description: "Providoor! You have minted an LP position on Ambient Finance valued over $1000. Art by: @ShizzyAizawa",
        image: "https://ambient.finance/scroll-badge/2.png",
        issuer: {
          origin: "https://scroll.ambient.finance/",
          name: "Ambient",
          logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
        },
        baseUrl: Ambient_BASE_URL,
        native: false,
      },
      {
        name: "Filloor",
        badgeContract: AMBIENT_FILLOOR_BADGE_ADDRESS,
        attesterProxy: AMBIENT_ATTESTER_PROXY_ADDRESS,
        description: "Filloor! You have filled a limit on Ambient Finance valued over $500. Art by: @ShizzyAizawa",
        image: "https://ambient.finance/scroll-badge/3.png",
        issuer: {
          origin: "https://scroll.ambient.finance/",
          name: "Ambient",
          logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
        },
        baseUrl: Ambient_BASE_URL,
        native: false,
      },
      {
        name: "Yeet",
        badgeContract: AMBIENT_YEET_BADGE_ADDRESS,
        attesterProxy: AMBIENT_ATTESTER_PROXY_ADDRESS,
        description:
          "Yeet! You are providing a modest amount of liquidity in a single position. You will be rewarded accordingly to the size! For now, enjoy having a differently colored croc. Art by: @ShizzyAizawa",
        image: "https://ambient.finance/scroll-badge/4.png",
        issuer: {
          origin: "https://scroll.ambient.finance/",
          name: "Ambient",
          logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
        },
        baseUrl: Ambient_BASE_URL,
        native: false,
      },
    ]
  : [
      {
        name: "Swapoor",
        badgeContract: AMBIENT_SWAPOOR_BADGE_ADDRESS,
        attesterProxy: AMBIENT_ATTESTER_PROXY_ADDRESS,
        description: "Swapooor! You have made a swap on Ambient Finance for over $500. Art by: @ShizzyAizawa",
        image: "https://ambient.finance/scroll-badge/1.png",
        issuer: {
          origin: "https://scroll.ambient.finance/",
          name: "Ambient",
          logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
        },
        baseUrl: Ambient_BASE_URL,
        native: false,
      },
      {
        name: "Providoor",
        badgeContract: AMBIENT_PROVIDOOR_BADGE_ADDRESS,
        attesterProxy: AMBIENT_ATTESTER_PROXY_ADDRESS,
        description: "Providoor! You have minted an LP position on Ambient Finance valued over $1000. Art by: @ShizzyAizawa",
        image: "https://ambient.finance/scroll-badge/2.png",
        issuer: {
          origin: "https://scroll.ambient.finance/",
          name: "Ambient",
          logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
        },
        baseUrl: Ambient_BASE_URL,
        native: false,
      },
      {
        name: "Filloor",
        badgeContract: AMBIENT_FILLOOR_BADGE_ADDRESS,
        attesterProxy: AMBIENT_ATTESTER_PROXY_ADDRESS,
        description: "Filloor! You have filled a limit on Ambient Finance valued over $500. Art by: @ShizzyAizawa",
        image: "https://ambient.finance/scroll-badge/3.png",
        issuer: {
          origin: "https://scroll.ambient.finance/",
          name: "Ambient",
          logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
        },
        baseUrl: Ambient_BASE_URL,
        native: false,
      },
      {
        name: "Yeet",
        badgeContract: AMBIENT_YEET_BADGE_ADDRESS,
        attesterProxy: AMBIENT_ATTESTER_PROXY_ADDRESS,
        description:
          "Yeet! You are providing a modest amount of liquidity in a single position. You will be rewarded accordingly to the size! For now, enjoy having a differently colored croc. Art by: @ShizzyAizawa",
        image: "https://ambient.finance/scroll-badge/4.png",
        issuer: {
          origin: "https://scroll.ambient.finance/",
          name: "Ambient",
          logo: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
        },
        baseUrl: Ambient_BASE_URL,
        native: false,
      },
      {
        name: "Zebra",
        badgeContract: ZEBRA_BADGE_ADDRESS,
        attesterProxy: ZEBRA_ATTESTER_PROXY_ADDRESS,
        description:
          "Users who participate in Scroll Canvas and complete tasks will receive Zebra's 'zebra' badge. Users with this badge will enjoy Zebra's early benefits in the future.",
        image: "https://app.zebra.xyz/images/badge.png",
        issuer: {
          origin: "https://zebra.xyz/",
          name: "Zebra",
          logo: "https://scroll-eco-list.netlify.app/logos/Zebra.png",
        },
        baseUrl: Zebra_BASE_URL,
        native: false,
      },
      // {
      //   name: "Cog Finance",
      //   badgeContract: COG_FINANCE_BADGE_ADDRESS,
      //   attesterProxy: COG_FINANCE_ATTESTER_PROXY_ADDRESS,
      //   description: "",
      //   image: "",
      //   issuer: {
      //     origin: "https://www.cog.finance/",
      //     name: "Cog Finance",
      //     logo: "https://scroll-eco-list.netlify.app/logos/Cog%20Finance.png",
      //   },
      //   baseUrl: "",
      //   native: false,
      // },
    ]

export const EAMPLE_BADGES = [
  {
    name: "Pudgy Penguin #1",
    badgeContract: SCROLL_SIMPLE_BADGE_A_ADDRESS,
    description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
    image: "/imgs/canvas/Penguin1.webp",
    native: true,
    issuer: {
      origin: "https://scroll.io",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    // validator: (walletCurrentAddress, provider) => true,
  },
  {
    name: "Pudgy Penguin #2",
    badgeContract: SCROLL_SIMPLE_BADGE_B_ADDRESS,
    description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/2.png",
    native: true,
    issuer: {
      origin: "https://scroll.io",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
  },
  {
    name: "Pudgy Penguin #3",
    badgeContract: SCROLL_SIMPLE_BADGE_C_ADDRESS,
    description:
      "AlienSwap is a multi-chain NFT marketplace and aggregator aimed to build the leading trading layer for the community, now we have integrated Scroll not only with the marketplace, but also our CreateX NFT creation platform, so that any one can create, list or trade NFT on Scroll.",
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/3.png",
    native: true,
    issuer: {
      origin: "https://alienswap.xyz/",
      name: "AlienSwap",
      logo: "https://scroll-eco-list.netlify.app/logos/AlienSwap.png",
    },
  },
]
