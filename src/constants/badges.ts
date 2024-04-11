const SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS = "0x30C98067517f8ee38e748A3aF63429974103Ea6B"
const SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS = "0xeBFc9B95328B2Cdb3c4CA8913e329c101d2Abbc2"
const SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS = "0x64492EF5a60245fbaF65F69782FCf158F3a8e3Aa"

const ETHEREUM_YEAR_BADGE_ADDRESS = "0xB59B6466B21a089c93B14030AF88b164905a58fd"
const ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS = "0xdAe8D9a30681899C305534849e138579aF0BF88e"

const AMBIENT_SWAPOOR_BADGE_ADDRESS = "0x2Dea57147e8b4Bd6087e631a194b5915E7bE2024"
const AMBIENT_PROVIDOOR_BADGE_ADDRESS = "0xC3d073FBCE6412B66DD0ca9060894dfaD39aa275"
const AMBIENT_FILLOOR_BADGE_ADDRESS = "0x54dc19f274eecfe5C3cb4aD8789Ad6b1dcbB4a00"
const AMBIENT_YEET_BADGE_ADDRESS = "0x9D40098Cab6D0Bfd86DfE98E4f17e26Ab659A98D"

const AMBIENT_ATTESTER_PROXY_ADDRESS = "0x446960ef9614f98de3266b49b1f02d5fd07ea8f3"

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
