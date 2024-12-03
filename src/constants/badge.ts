import { ethers } from "ethers"

import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import { requireEnv } from "@/utils"

const SCROLL_ORIGINS_NFT = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT")
const SCROLL_ORIGINS_NFT_V2 = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")

export const ETHEREUM_YEAR_BADGE_ADDRESS = requireEnv("REACT_APP_ETHEREUM_YEAR_BADGE_ADDRESS")
// sepolia
const ETHEREUM_YEAR_ATTESTER_PROXY_ADDRESS = "0xdAe8D9a30681899C305534849e138579aF0BF88e"
const ETHEREUM_YEAR_BASE_URL = `${requireEnv("REACT_APP_CANVAS_BACKEND_URI")}/badge`

export const SCR_HOLDING_BADGE_ADDRESS = requireEnv("REACT_APP_SCR_HOLDING_BADGE_ADDRESS")

export const SELF_ATTESTATION_BADGE_ADDRESS_LIST = [SCR_HOLDING_BADGE_ADDRESS]

export interface Badge {
  name: string
  description: string
  image: string
  issuerName?: string
  issuer?: {
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
// only keep OriginsNFTBadge
export const ORIGINS_NFT_BADGE = {
  nftAddress: [SCROLL_ORIGINS_NFT, SCROLL_ORIGINS_NFT_V2],
  nftAbi: ScrollOriginsNFTABI,
  validator: async (provider, address) => {
    const nftContract = new ethers.Contract(SCROLL_ORIGINS_NFT, ScrollOriginsNFTABI, provider)
    const nftV2Contract = new ethers.Contract(SCROLL_ORIGINS_NFT_V2, ScrollOriginsNFTABI, provider)

    let balance = await nftContract.balanceOf(address)
    if (!balance) {
      balance = await nftV2Contract.balanceOf(address)
    }
    return !!balance
  },
}

export enum BADGE_TYPE {
  GIFTED = "Gifted",
  BACKEND_AUTHORIZED = "Backend-authorized",
  PERMISSIONLESS = "Permissionless",
  // TODO: need to be stored in Badge Registry
  SELF_ATTESTATION = "Self-attestation",
}
