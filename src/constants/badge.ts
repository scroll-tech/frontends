import { ethers } from "ethers"

import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import { isMainnet, requireEnv } from "@/utils"

import { ANNOUNCING_SCROLL_ORIGINS_NFT, DESIGNING_SCROLL_ORIGINS } from "./nft"

const SCROLL_ORIGINS_NFT = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT")
const SCROLL_ORIGINS_NFT_V2 = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")

export interface Badge {
  name: string
  description: any
  metaDescription?: string
  image: string
  issuer: {
    origin: string
    name: string
    logo: string
    communityURL?: string
  }
  badgeContract: string

  // Backend-authorized
  attesterProxy?: string
  baseURL?: string
  eligibilityCheck?: boolean

  // Origin NFT
  originsNFT?: boolean
  validator?: (address, provider) => Promise<boolean>
  nftAddress?: string[]
  nftAbi?: object

  // issued by Scroll
  native?: boolean
}

// TODO: only keep OriginsNFTBadge and EthereumYearBadge
export const BADGES_ADDRESS = {
  sepolia: {
    SCROLL_SIMPLE_BADGE_A_ADDRESS: "0x30C98067517f8ee38e748A3aF63429974103Ea6B",
    SCROLL_SIMPLE_BADGE_B_ADDRESS: "0xeBFc9B95328B2Cdb3c4CA8913e329c101d2Abbc2",
    SCROLL_SIMPLE_BADGE_C_ADDRESS: "0x64492EF5a60245fbaF65F69782FCf158F3a8e3Aa",

    SCROLL_ORIGINS_BADGE_ADDRESS: "0x2A3aC1337845f8C02d2dD7f80Dada22f01b569f9",

    ETHEREUM_YEAR_BADGE_ADDRESS: "0xB59B6466B21a089c93B14030AF88b164905a58fd",
    ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS: "0xdAe8D9a30681899C305534849e138579aF0BF88e",
  },
  mainnet: {
    SCROLL_SIMPLE_BADGE_A_ADDRESS: "0xB1Dbd079c62d181926E5A54932Bb1b15F760e8A0",
    SCROLL_SIMPLE_BADGE_B_ADDRESS: "0xe626E631BdDcd985D02D2eEe4fbdF901b52AE33C",
    SCROLL_SIMPLE_BADGE_C_ADDRESS: "0xe485f8fcBf3b678e83d208fa3f1933a315d58356",

    SCROLL_ORIGINS_BADGE_ADDRESS: "0x2dBce60ebeAafb77e5472308f432F78aC3AE07d9",

    ETHEREUM_YEAR_BADGE_ADDRESS: "0x3dacAd961e5e2de850F5E027c70b56b5Afa5DfeD",
    ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS: "0x39fb5E85C7713657c2D9E869E974FF1e0B06F20C",
  },
}

const {
  SCROLL_SIMPLE_BADGE_A_ADDRESS,
  SCROLL_SIMPLE_BADGE_B_ADDRESS,
  SCROLL_SIMPLE_BADGE_C_ADDRESS,
  SCROLL_ORIGINS_BADGE_ADDRESS,
  ETHEREUM_YEAR_BADGE_ADDRESS,
  ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS,
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
  baseURL: ETHEREUM_YEAR_BASE_URL,
}

// TODO: delete
export const EAMPLE_BADGES = [
  {
    name: "Pudgy Penguin #1",
    badgeContract: SCROLL_SIMPLE_BADGE_A_ADDRESS,
    description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
    image: "/imgs/canvas/Penguin1.webp",
    native: true,
    eligibilityCheck: true,
    issuer: {
      origin: "https://scroll.io",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
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
      origin: "https://scroll.io",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
  },
]

export const SCROLL_BADGES = [
  ETHEREUM_YEAR_BADGE,
  {
    name: "Scroll Origins NFT",
    nftAddress: [SCROLL_ORIGINS_NFT, SCROLL_ORIGINS_NFT_V2],
    nftAbi: ScrollOriginsNFTABI,
    badgeContract: SCROLL_ORIGINS_BADGE_ADDRESS,
    metaDescription:
      "The Scroll Origins NFT is a soulbound NFT that serves to recognize the early builders of Scroll. Eligible minters have deployed a smart contract to Scroll Mainnetwithin 60 days of the Genesis Block. Higher levels of rarity are are rewarded to smart contracts that have contributed significant levels of interaction or value to the network.",
    description: `
  [Scroll Origins](${ANNOUNCING_SCROLL_ORIGINS_NFT}) is a [specially designed NFT](${DESIGNING_SCROLL_ORIGINS})
  program to celebrate alongside early developers building on Scroll within 60 days of Genesis Block (Before December 9, 2023 10:59PM GMT).
  `,
    image: "/imgs/canvas/OriginsNFT.svg",
    native: true,
    originsNFT: true,
    issuer: {
      origin: "https://scroll.io",
      name: "Scroll",
      logo: "https://scroll.io/static/media/Scroll_Logomark.673577c8260b63ae56867bc9af6af514.svg",
    },
    validator: async (provider, address) => {
      const nftContract = new ethers.Contract(SCROLL_ORIGINS_NFT, ScrollOriginsNFTABI, provider)
      const nftV2Contract = new ethers.Contract(SCROLL_ORIGINS_NFT_V2, ScrollOriginsNFTABI, provider)

      let balance = await nftContract.balanceOf(address)
      if (!balance) {
        balance = await nftV2Contract.balanceOf(address)
      }
      return !!balance
    },
  },
]
