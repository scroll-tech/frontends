import { ethers } from "ethers"

import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import { requireEnv } from "@/utils"

const SCROLL_ORIGINS_NFT = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT")
const SCROLL_ORIGINS_NFT_V2 = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")
const SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS = "0xd9892Bb7579becC9343C9a2c94eF21bc1e08d6d1"

const SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS = "0xF955E3CDffA1D67E3de6FDC6247D3724DE8DA561"
const SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS = "0xf7f7d145ddAD3Fd3EaE26D4DaC03EcD8183399eE"
const SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS = "0x6697Df63b2951aa3167Db26E293772D50e68c11c"

const Badges = [
  {
    name: "Scroll Origins NFT",
    nftAddress: [SCROLL_ORIGINS_NFT, SCROLL_ORIGINS_NFT_V2],
    nftAbi: ScrollOriginsNFTABI,
    badgeAddress: SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS,
    nftDefaultURI: "/imgs/nft/placeholder.svg",
    issuer: {
      origin: "https://scroll.io",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    validator: async (address, provider) => {
      const nftContract = new ethers.Contract(SCROLL_ORIGINS_NFT, ScrollOriginsNFTABI, provider)
      const nftV2Contract = new ethers.Contract(SCROLL_ORIGINS_NFT_V2, ScrollOriginsNFTABI, provider)

      try {
        await nftContract.tokenOfOwnerByIndex(address, 0)
        return true
      } catch (error) {
        try {
          await nftV2Contract.tokenOfOwnerByIndex(address, 0)
          return true
        } catch (error) {
          return false
        }
      }
    },
  },
  {
    name: "Simple Badge A",
    nftAddress: null,
    nftAbi: null,
    badgeAddress: SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS,
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/1.png",
    issuer: {
      origin: "https://example.org",
      name: "Issuer1",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    validator: (walletCurrentAddress, provider) => true,
  },
  {
    name: "Simple Badge B",
    nftAddress: null,
    nftAbi: null,
    badgeAddress: SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS,
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/2.png",
    issuer: {
      origin: "https://example.org",
      name: "Issuer2",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    validator: (walletCurrentAddress, provider) => true,
  },
  {
    name: "Simple Badge C",
    nftAddress: null,
    nftAbi: null,
    badgeAddress: SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS,
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/3.png",
    issuer: {
      origin: "https://example.org",
      name: "Issuer3",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    validator: (walletCurrentAddress, provider) => true,
  },
]

export default Badges
