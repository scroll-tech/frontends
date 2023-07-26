import { Box } from "@mui/material"
import { keyframes, styled } from "@mui/system"

import Logo_1 from "@/assets/images/homepage/home/partner_logo_1.svg"
import Logo_2 from "@/assets/images/homepage/home/partner_logo_2.svg"
import Logo_3 from "@/assets/images/homepage/home/partner_logo_3.svg"
import Logo_4 from "@/assets/images/homepage/home/partner_logo_4.svg"
import Logo_5 from "@/assets/images/homepage/home/partner_logo_5.svg"
import Logo_6 from "@/assets/images/homepage/home/partner_logo_6.svg"
import Logo_7 from "@/assets/images/homepage/home/partner_logo_7.svg"
import Logo_8 from "@/assets/images/homepage/home/partner_logo_8.svg"
import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

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
]

const MarqueeLeft: Partner[] = [].concat(...Array(4).fill(PARTNER_LIST))
const MarqueeRight: Partner[] = [].concat(...Array(4).fill(PARTNER_LIST)).reverse()

const PartnersContainer = styled(Box)(({ theme }) => ({}))

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
}))

const TrackLeft = styled("div")(({ theme }) => ({
  display: "flex",
  animation: `${MarqueeAnimationLeft} 32s linear infinite`,
  marginBottom: "4.4rem",
  width: "max-content",
  [theme.breakpoints.down("md")]: {
    marginBottom: "3.6rem",
  },
}))

const TrackRight = styled("div")(({ theme }) => ({
  display: "flex",
  animation: `${MarqueeAnimationRight} 32s linear infinite`,
  width: "max-content",
}))

const Logo = styled("img")(({ theme }) => ({
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

const Carousel = () => (
  <Box>
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
  </Box>
)

const Partners = () => {
  return (
    <PartnersContainer>
      <SectionWrapper>
        <FadeInUp>
          <SectionHeader
            sx={{ mb: "10rem" }}
            title="Build with the Best in Web3"
            content="We’re part of an ecosystem with a greater purpose – permissionless, flexible, and dedicated to improving the future of Ethereum."
            action={
              <Button href="" target="_blank" color="primary">
                Explore ecosystem
              </Button>
            }
          ></SectionHeader>
        </FadeInUp>
      </SectionWrapper>
      <Carousel />
    </PartnersContainer>
  )
}

export default Partners
