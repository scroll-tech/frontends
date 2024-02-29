import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import { requireEnv } from "@/utils"

const SCROLL_ORIGINS_NFT_V2 = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")
const SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS = "0x2aa883c6EaB368d1C86452127bc0Dd6c887a1F44"

const SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS = "0xC5920c1c11E38cd315597504Dbb645b6d1030e1F"
const SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS = "0x97E18b7e0310997722a64935Dea0511F119C3461"
const SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS = "0x109d2ccAcF10E8c7E0F11EC0c997EAb99C379675"

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
