const Ambient_Swapoor_Badge_Address = "0x2Dea57147e8b4Bd6087e631a194b5915E7bE2024"
const Ambient_Providoor_Badge_Address = "0xC3d073FBCE6412B66DD0ca9060894dfaD39aa275"
const Ambient_Filloor_Badge_Address = "0x54dc19f274eecfe5C3cb4aD8789Ad6b1dcbB4a00"
const Ambient_Yeet_Badge_Address = "0x9D40098Cab6D0Bfd86DfE98E4f17e26Ab659A98D"

const Ambient_Attester_Proxy_Address = "0x446960ef9614f98de3266b49b1f02d5fd07ea8f3"

const Ambient_BASE_URL = "https://ambient-scroll-badge-sepolia.liquidity.tools/api"

const badges = [
  {
    name: "Swapoor",
    badgeContract: Ambient_Swapoor_Badge_Address,
    attesterProxy: Ambient_Attester_Proxy_Address,
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
    badgeContract: Ambient_Providoor_Badge_Address,
    attesterProxy: Ambient_Attester_Proxy_Address,
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
    badgeContract: Ambient_Filloor_Badge_Address,
    attesterProxy: Ambient_Attester_Proxy_Address,
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
    badgeContract: Ambient_Yeet_Badge_Address,
    attesterProxy: Ambient_Attester_Proxy_Address,
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

export default badges
