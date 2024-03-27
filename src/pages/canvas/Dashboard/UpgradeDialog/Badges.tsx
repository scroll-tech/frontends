import { ethers } from "ethers"

import { styled } from "@mui/material/styles"

import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import Link from "@/components/Link"
import { ANNOUNCING_SCROLL_ORIGINS_NFT, DESIGNING_SCROLL_ORIGINS } from "@/constants"
import { requireEnv } from "@/utils"

const SCROLL_ORIGINS_NFT = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT")
const SCROLL_ORIGINS_NFT_V2 = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")
const SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS = "0x25Dd56E9F0F27881e7f9DcD315a45f5a41ef42b2"

const SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS = "0x54E0C87672ebEC2A4d86dF3BDbB5286E7Af23396"
const SCROLL_SEPOLIA_SIMPLE_BADGE_B_ADDRESS = "0xF03214B490B6d05527cAD0B99a2820356b97840B"
const SCROLL_SEPOLIA_SIMPLE_BADGE_C_ADDRESS = "0x5892067fEB828020FBA7B3dD87428010Ecaa86a7"

const CustomLink = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontSize: "inherit",
  textUnderlineOffset: "2px",
  textDecorationThickness: "1px",
  fontWeight: 700,
}))

const Badges = [
  {
    name: "Scroll Origins NFT",
    nftAddress: [SCROLL_ORIGINS_NFT, SCROLL_ORIGINS_NFT_V2],
    nftAbi: ScrollOriginsNFTABI,
    badgeContract: SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS,
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
    validator: async (address, provider) => {
      const nftContract = new ethers.Contract(SCROLL_ORIGINS_NFT, ScrollOriginsNFTABI, provider)
      const nftV2Contract = new ethers.Contract(SCROLL_ORIGINS_NFT_V2, ScrollOriginsNFTABI, provider)

      let balance = await nftContract.balanceOf(address)
      if (!balance) {
        balance = await nftV2Contract.balanceOf(address)
      }
      return !!balance
    },
  },
  {
    name: "Pudgy Penguin #1",
    nftAddress: null,
    nftAbi: null,
    badgeContract: SCROLL_SEPOLIA_SIMPLE_BADGE_A_ADDRESS,
    description: "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
    image: "/imgs/canvas/Penguin1.webp",
    native: true,
    issuer: {
      origin: "https://scroll.io",
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
    native: true,
    issuer: {
      origin: "https://scroll.io",
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
    description:
      "AlienSwap is a multi-chain NFT marketplace and aggregator aimed to build the leading trading layer for the community, now we have integrated Scroll not only with the marketplace, but also our CreateX NFT creation platform, so that any one can create, list or trade NFT on Scroll.",
    image: "https://cloudflare-ipfs.com/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/3.png",
    native: false,
    issuer: {
      origin: "https://alienswap.xyz/",
      name: "AlienSwap",
      logo: "https://scroll-eco-list.netlify.app/logos/AlienSwap.png",
    },
    validator: (walletCurrentAddress, provider) => true,
  },
]

export const badgeMap = Object.fromEntries(
  Badges.map(({ badgeContract, native, originsNFT, issuer, image, name, description, metaDescription }) => [
    badgeContract,
    { native, originsNFT, issuer, image, badgeContract, name, description, metaDescription },
  ]),
)

export default Badges
