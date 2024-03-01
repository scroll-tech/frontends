import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import { requireEnv } from "@/utils"

const SCROLL_ORIGINS_NFT_V2 = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")
const SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS = "0xd9892Bb7579becC9343C9a2c94eF21bc1e08d6d1"

const SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS = "0xF955E3CDffA1D67E3de6FDC6247D3724DE8DA561"
const SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS = "0xf7f7d145ddAD3Fd3EaE26D4DaC03EcD8183399eE"
const SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS = "0x6697Df63b2951aa3167Db26E293772D50e68c11c"

const Badges = [
  {
    name: "Scroll Origins NFT",
    nftAddress: SCROLL_ORIGINS_NFT_V2,
    nftAbi: ScrollOriginsNFTABI,
    badgeAddress: SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS,
    issuer: {
      origin: "https://scroll.io",
      name: "Scroll",
      logo: "Example Badge Org",
    },
  },
  {
    name: "Simple Badge A",
    nftAddress: null,
    nftAbi: null,
    badgeAddress: SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS,
    issuer: {
      origin: "https://example.org",
      name: "Issuer1",
      logo: "Example Badge Org",
    },
  },
  {
    name: "Simple Badge B",
    nftAddress: null,
    nftAbi: null,
    badgeAddress: SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS,
    issuer: {
      origin: "https://example.org",
      name: "Issuer2",
      logo: "Example Badge Org",
    },
  },
  {
    name: "Simple Badge C",
    nftAddress: null,
    nftAbi: null,
    badgeAddress: SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS,
    issuer: {
      origin: "https://example.org",
      name: "Issuer3",
      logo: "Example Badge Org",
    },
  },
]

export default Badges
