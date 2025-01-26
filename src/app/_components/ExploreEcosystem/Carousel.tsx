import Image from "next/image"

import { Box } from "@mui/material"
import { keyframes, styled } from "@mui/system"

import Logo_1 from "@/assets/images/home/partner_logo_1.svg?url"
import Logo_2 from "@/assets/images/home/partner_logo_2.svg?url"
import Logo_3 from "@/assets/images/home/partner_logo_3.svg?url"
import Logo_4 from "@/assets/images/home/partner_logo_4.svg?url"
import Logo_5 from "@/assets/images/home/partner_logo_5.svg?url"
import Logo_6 from "@/assets/images/home/partner_logo_6.svg?url"
import Logo_7 from "@/assets/images/home/partner_logo_7.svg?url"
import Logo_8 from "@/assets/images/home/partner_logo_8.svg?url"
import Logo_9 from "@/assets/images/home/partner_logo_9.svg?url"
import Logo_10 from "@/assets/images/home/partner_logo_10.svg?url"
import Logo_11 from "@/assets/images/home/partner_logo_11.svg?url"
import Logo_12 from "@/assets/images/home/partner_logo_12.svg?url"
import Logo_13 from "@/assets/images/home/partner_logo_13.svg?url"
import Logo_14 from "@/assets/images/home/partner_logo_14.svg?url"
import Logo_15 from "@/assets/images/home/partner_logo_15.svg?url"
import Logo_16 from "@/assets/images/home/partner_logo_16.svg?url"
import Logo_17 from "@/assets/images/home/partner_logo_17.svg?url"

interface Partner {
  id: number
  logo: string
  alt: string
}

const PARTNER_LIST = [
  {
    id: 1,
    logo: Logo_1,
    alt: "Logo",
  },
  {
    id: 2,
    logo: Logo_2,
    alt: "Logo",
  },

  {
    id: 3,
    logo: Logo_3,
    alt: "Logo",
  },
  {
    id: 4,
    logo: Logo_4,
    alt: "Logo",
  },
  {
    id: 5,
    logo: Logo_5,
    alt: "Logo",
  },
  {
    id: 6,
    logo: Logo_6,
    alt: "Logo",
  },
  {
    id: 7,
    logo: Logo_7,
    alt: "Logo",
  },
  {
    id: 8,
    logo: Logo_8,
    alt: "Logo",
  },
  {
    id: 9,
    logo: Logo_9,
    alt: "Logo",
  },
  {
    id: 10,
    logo: Logo_10,
    alt: "Logo",
  },
  {
    id: 11,
    logo: Logo_11,
    alt: "Logo",
  },
  {
    id: 12,
    logo: Logo_12,
    alt: "Logo",
  },
  {
    id: 13,
    logo: Logo_13,
    alt: "Logo",
  },
  {
    id: 14,
    logo: Logo_14,
    alt: "Logo",
  },
  {
    id: 15,
    logo: Logo_15,
    alt: "Logo",
  },
  {
    id: 16,
    logo: Logo_16,
    alt: "Logo",
  },
  {
    id: 17,
    logo: Logo_17,
    alt: "Logo",
  },
]

const MarqueeLeft: Partner[] = [].concat(...Array(2).fill(PARTNER_LIST))
const MarqueeRight: Partner[] = [].concat(...Array(2).fill(PARTNER_LIST)).reverse()

const MarqueeAnimationLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const MarqueeAnimationRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`

const Marquee = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  width: "100%",
})) as typeof Box

const CarouselBox = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "100vw",
  "@media (min-width:1900px)": {
    "&::before, &::after": {
      content: "''",
      height: "100%",
      position: "absolute",
      top: 0,
      width: "40% !important",
      zIndex: 42,
    },
    "&::before": {
      background: "linear-gradient(90deg, #101010 30%, rgba(0, 0, 0, 0) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0)",
      left: 0,
    },
    "&::after": {
      background: "linear-gradient(270deg, #101010 30%, rgba(0, 0, 0, 0) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0)",
      right: 0,
    },
  },
})) as typeof Box

const TrackLeft = styled("div")(({ theme }) => ({
  display: "flex",
  animation: `${MarqueeAnimationLeft} 60s linear infinite`,
  marginBottom: "4.4rem",
  width: "max-content",
  [theme.breakpoints.down("md")]: {
    marginBottom: "3.6rem",
  },
}))

const TrackRight = styled("div")(({ theme }) => ({
  display: "flex",
  animation: `${MarqueeAnimationRight} 60s linear infinite`,
  width: "max-content",
}))

const Logo = styled(Image)(({ theme }) => ({
  width: "8.8rem",
  height: "8.8rem",
  marginRight: "10rem",
  flexShrink: 0,
  [theme.breakpoints.down("md")]: {
    width: "6rem",
    height: "6rem",
    marginRight: "5rem",
  },
}))

const Carousel = props => {
  const { sx } = props
  return (
    <CarouselBox sx={sx}>
      <Marquee>
        <TrackLeft>
          {MarqueeLeft.map((item, idx) => (
            <Logo key={idx} src={item.logo} alt={item.alt} />
          ))}
        </TrackLeft>
      </Marquee>
      <Marquee>
        <TrackRight>
          {MarqueeRight.map((item, idx) => (
            <Logo key={idx} src={item.logo} alt={item.alt} />
          ))}
        </TrackRight>
      </Marquee>
    </CarouselBox>
  )
}

export default Carousel
