import { ethers } from "ethers"

import { styled } from "@mui/material/styles"

import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import Link from "@/components/Link"
import { ANNOUNCING_SCROLL_ORIGINS_NFT, DESIGNING_SCROLL_ORIGINS } from "@/constants"
import { BADGES_ADDRESS, EAMPLE_BADGES, ETHEREUM_YEAR_BADGE, THIRD_PARTY_BADGES } from "@/constants/badges"
import { isMainnet, requireEnv } from "@/utils"

const SCROLL_ORIGINS_NFT = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT")
const SCROLL_ORIGINS_NFT_V2 = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")
const { SCROLL_ORIGINS_BADGE_ADDRESS } = BADGES_ADDRESS[isMainnet ? "mainnet" : "sepolia"]

export interface Badge {
  name: string
  description: any
  metaDescription?: string
  image: string
  issuer: {
    origin: string
    name: string
    logo: string
  }
  badgeContract: string

  // third party
  attesterProxy?: string
  eligibilityAPI?: string

  // Origin NFT
  originsNFT?: boolean
  validator?: (address, provider) => Promise<boolean>
  nftAddress?: string[]
  nftAbi?: object

  // TODO: no attesterProxy means native?
  native: boolean
}

const CustomLink = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontSize: "inherit",
  textUnderlineOffset: "2px",
  textDecorationThickness: "1px",
  fontWeight: 700,
}))

const Badges: Badge[] = [
  {
    name: "Scroll Origins NFT",
    nftAddress: [SCROLL_ORIGINS_NFT, SCROLL_ORIGINS_NFT_V2],
    nftAbi: ScrollOriginsNFTABI,
    badgeContract: SCROLL_ORIGINS_BADGE_ADDRESS,
    metaDescription:
      "The Scroll Origins NFT is a soulbound NFT that serves to recognize the early builders of Scroll. Eligible minters have deployed a smart contract to Scroll Mainnetwithin 60 days of the Genesis Block. Higher levels of rarity are are rewarded to smart contracts that have contributed significant levels of interaction or value to the network.",
    description: (
      <>
        <CustomLink href={ANNOUNCING_SCROLL_ORIGINS_NFT} underline="always" external>
          Scroll Origins
        </CustomLink>{" "}
        is a{" "}
        <CustomLink href={DESIGNING_SCROLL_ORIGINS} underline="always" external>
          specially designed NFT
        </CustomLink>{" "}
        program to celebrate alongside early developers building on Scroll within 60 days of Genesis Block (Before December 9, 2023 10:59PM GMT).
      </>
    ),
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
  ETHEREUM_YEAR_BADGE,
  ...THIRD_PARTY_BADGES,
  ...EAMPLE_BADGES,
]

export const badgeMap = Object.fromEntries(
  Badges.map(({ badgeContract, native, originsNFT, issuer, image, name, description, metaDescription }: any) => [
    badgeContract,
    { native, originsNFT, issuer, image, badgeContract, name, description, metaDescription },
  ]),
)

export default Badges
