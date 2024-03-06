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
    badgeContract: SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS,
    description:
      "The Scroll Origins NFT is a soulbound NFT that serves to recognize the early builders of Scroll. Eligible minters have deployed a smart contract to Scroll Mainnetwithin 60 days of the Genesis Block. Higher levels of rarity are are rewarded to smart contracts that have contributed significant levels of interaction or value to the network.",
    image: "/imgs/skelly/OriginsNFT.svg",
    native: true,
    originsNFT: true,
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
    name: "Pudgy Penguin #1",
    nftAddress: null,
    nftAbi: null,
    badgeContract: SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS,
    description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/1.png",
    native: false,
    issuer: {
      origin: "https://example.org",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    validator: (walletCurrentAddress, provider) => true,
  },
  {
    name: "Pudgy Penguin #2",
    nftAddress: null,
    nftAbi: null,
    badgeContract: SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS,
    description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/2.png",
    native: false,
    issuer: {
      origin: "https://example.org",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    validator: (walletCurrentAddress, provider) => true,
  },
  {
    name: "Pudgy Penguin #3",
    nftAddress: null,
    nftAbi: null,
    badgeContract: SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS,
    description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/3.png",
    native: false,
    issuer: {
      origin: "https://example.org",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    validator: (walletCurrentAddress, provider) => true,
  },
]

export const badgeMap = Object.fromEntries(
  Badges.map(({ badgeContract, native, originsNFT, issuer, image, name }) => [
    badgeContract,
    { native, originsNFT, issuer, image, badgeContract, name },
  ]),
)

export default Badges
