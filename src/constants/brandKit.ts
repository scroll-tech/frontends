import BrandGuideline from "@/assets/images/brandkit/BrandGuideline/Scroll_BrandGuideline.svg"
import Mediakit from "@/assets/images/brandkit/MediaKit/mediakit.png"
import Banner1Png from "@/assets/images/brandkit/Scroll_Banner/Scroll_Banner1/Scroll_Banner1.png"
import Banner1Svg from "@/assets/images/brandkit/Scroll_Banner/Scroll_Banner1/Scroll_Banner1.svg"
import Banner2Png from "@/assets/images/brandkit/Scroll_Banner/Scroll_Banner2/Scroll_Banner2.png"
import Banner2Svg from "@/assets/images/brandkit/Scroll_Banner/Scroll_Banner2/Scroll_Banner2.svg"
import LogoSample5 from "@/assets/images/brandkit/Scroll_Logomark/Sample3-1.svg"
import LogoSample6 from "@/assets/images/brandkit/Scroll_Logomark/Sample3-2.svg"
import LogomarkPng from "@/assets/images/brandkit/Scroll_Logomark/Scroll_Logomark.png"
import LogomarkSvg from "@/assets/images/brandkit/Scroll_Logomark/Scroll_Logomark.svg"
import PrimaryLogoSample1 from "@/assets/images/brandkit/Scroll_Logos/Scroll_FullLogo/Sample1-1.svg"
import PrimaryLogoSample2 from "@/assets/images/brandkit/Scroll_Logos/Scroll_FullLogo/Sample1-2.svg"
import FullColouredLogoPng from "@/assets/images/brandkit/Scroll_Logos/Scroll_FullLogo/Scroll_FullLogo.png"
import FullColouredLogoSvg from "@/assets/images/brandkit/Scroll_Logos/Scroll_FullLogo/Scroll_FullLogo.svg"
import PrimaryLogoSample3 from "@/assets/images/brandkit/Scroll_Logos/Scroll_InvertedLogo/Sample2-1.svg"
import PrimaryLogoSample4 from "@/assets/images/brandkit/Scroll_Logos/Scroll_InvertedLogo/Sample2-2.svg"
import InvertedLogoPng from "@/assets/images/brandkit/Scroll_Logos/Scroll_InvertedLogo/Scroll_InvertedLogo.png"
import InvertedLogoSvg from "@/assets/images/brandkit/Scroll_Logos/Scroll_InvertedLogo/Scroll_InvertedLogo.svg"

export const FIGMA_LINK = "https://www.figma.com/file/3yTcgzQzYy54dCEMg2MydD/Public?type=design&node-id=0%3A1&mode=design&t=tPrCkHpmVp1A00Q5-1"
export const BRAND_ASSETS_LINK = "https://s3-us-west-2.amazonaws.com/scroll-mainnet-frontend-assets/Scroll_BrandAssets.zip"
const MEDIAKIT_LINK = "https://s3-us-west-2.amazonaws.com/scroll-mainnet-frontend-assets/MediaKit.zip"
const BrandGuidelinePdf = "https://s3-us-west-2.amazonaws.com/scroll-mainnet-frontend-assets/ScrollBrandGuideline.pdf"

export const brandAssets = [
  {
    name: "Primary Logo",
    type: "largeImage",
    versions: [
      {
        title: "Full coloured logo on light background",
        type: "light",
        cover: FullColouredLogoSvg,
        coverClass: "LogoDemo",
        formats: {
          svg: FullColouredLogoSvg,
          png: FullColouredLogoPng,
        },
        samples: [PrimaryLogoSample1, PrimaryLogoSample2],
      },
      {
        title: "White logo on dark background",
        type: "dark",
        cover: InvertedLogoSvg,
        coverClass: "LogoDemo",
        formats: {
          svg: InvertedLogoSvg,
          png: InvertedLogoPng,
        },
        samples: [PrimaryLogoSample3, PrimaryLogoSample4],
      },
    ],
  },
  {
    name: "Logomark",
    type: "normalImage",
    versions: [
      {
        title: "Coloured Logo with Solid Background",
        context: "Note: Please make sure to always use this version that contains a beige background as 1:1 profile picture on all dapp.",
        cover: LogomarkSvg,
        coverMaxWidth: "100%",
        formats: {
          svg: LogomarkSvg,
          png: LogomarkPng,
        },
        samples: [LogoSample5, LogoSample6],
      },
    ],
  },
  {
    name: "Banner",
    type: "onlyImage",
    versions: [
      {
        title: "",
        cover: Banner1Svg,
        formats: {
          svg: Banner1Svg,
          png: Banner1Png,
        },
        samples: [],
      },
      {
        title: "",
        cover: Banner2Svg,
        formats: {
          svg: Banner2Svg,
          png: Banner2Png,
        },
        samples: [],
      },
    ],
  },
  {
    name: "Brand Guideline",
    type: "onlyOneImage",
    versions: [
      {
        title: "",
        cover: BrandGuideline,
        formats: {
          pdf: BrandGuidelinePdf,
        },
        samples: [],
      },
    ],
  },
  {
    name: "Media Kit",
    type: "onlyOneImage",
    versions: [
      {
        title: "",
        cover: Mediakit,
        formats: {
          png: MEDIAKIT_LINK,
        },
        samples: [],
      },
    ],
  },
]
