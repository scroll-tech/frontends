const SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS = "0x30C98067517f8ee38e748A3aF63429974103Ea6B"
const SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS = "0xeBFc9B95328B2Cdb3c4CA8913e329c101d2Abbc2"
const SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS = "0x64492EF5a60245fbaF65F69782FCf158F3a8e3Aa"

const ETHEREUM_YEAR_BADGE_ADDRESS = "0xB59B6466B21a089c93B14030AF88b164905a58fd"
const ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS = "0xdAe8D9a30681899C305534849e138579aF0BF88e"

const AMBIENT_SWAPOOR_BADGE_ADDRESS = "0x3abe5377E347D5E7d45bd6E2E506F753B9786cE9"
const AMBIENT_PROVIDOOR_BADGE_ADDRESS = "0x7D61d353d2b8E8BD66c069eaEa088fDB006ADf5c"
const AMBIENT_FILLOOR_BADGE_ADDRESS = "0x184775970b6736d9be4B9e9A3E0b1D03815d5aC1"
const AMBIENT_YEET_BADGE_ADDRESS = "0x3B916928bb6AF9215AdbCeCf9ced50e6Cb3553d0"

const AMBIENT_ATTESTER_PROXY_ADDRESS = "0x9F54d1FFc14C61b7EC170F6cA53434855D3737AA"

const Ambient_BASE_URL = "https://ambient-scroll-badge-sepolia.liquidity.tools/api"

export const ETHEREUM_YEAR_BADGE = {
  name: "Ethereum Year",
  badgeContract: ETHEREUM_YEAR_BADGE_ADDRESS,
  attesterProxy: ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS,
  description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
  image: "/imgs/canvas/Badge_Ethereum_Year.png",
  native: true,
  issuer: {
    origin: "https://scroll.io",
    name: "Scroll",
    logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
  },
}

export const THIRD_PARTY_BADGES = [
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

export const EAMPLE_BADGES = [
  {
    name: "Pudgy Penguin #1",
    badgeContract: SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS,
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
    badgeContract: SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS,
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
    badgeContract: SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS,
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
