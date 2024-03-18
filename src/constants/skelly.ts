const SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS = "0x54E0C87672ebEC2A4d86dF3BDbB5286E7Af23396"

export enum BADGES_VISIBLE_TYPE {
  VISIBLE = "Displayed",
  INVISIBLE = "Not displayed",
}

// TODO: first badge should be Ethereum Year

export const FIRST_BADGE = {
  name: "Ethereum Year",
  nftAddress: null,
  nftAbi: null,
  badgeContract: SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS,
  description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
  image: "/imgs/skelly/Badge_Ethereum_Year.png",
  native: true,
  issuer: {
    origin: "https://scroll.io",
    name: "Scroll",
    logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
  },
  validator: (walletCurrentAddress, provider) => true,
}
