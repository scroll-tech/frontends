import { useNavigate } from "react-router-dom"
import "swiper/css"
import "swiper/css/pagination"

import { Box, Button, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"

import BridgeScreenshotMobile from "@/assets/images/homepage/home/bridge-screenshot-m.jpg"
import BridgeScreenshotMobileWebp from "@/assets/images/homepage/home/bridge-screenshot-m.webp"
import BridgeScreenshot from "@/assets/images/homepage/home/bridge-screenshot.jpg"
import BridgeScreenshotWebp from "@/assets/images/homepage/home/bridge-screenshot.webp"
import RocketIcon from "@/assets/images/homepage/home/rocket.png"
import RocketWebpIcon from "@/assets/images/homepage/home/rocket.webp"
import WebpImage from "@/components/WebpImage"
import WrapperBox from "@/components/WrapperBox"
import { medias } from "@/constants/medias"

import Article from "./articles"
import FeatureSwiper from "./featureSwiper"
import Roadmap from "./roadmap"

const ContainerBox = styled(Box)({
  textAlign: "center",
})

const SectionBox = styled(Box)(
  ({ theme }) => `
  padding: 12rem 0;
  &:nth-of-type(odd) {
    background: #ffffff;
  };
  &:nth-of-type(even) {
    background: rgb(253, 241, 228);
  };
  &.roadmap-section {
    display: flex;
  };
  ${theme.breakpoints.down("md")} {
    padding: 8rem 0; 
  };
  `,
)

const RoadmapBoxWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
    ${theme.breakpoints.down("md")} {
      align-items: center;
      flex-direction: column;
    };
    `,
)

const RoadmapInfo = styled(Box)(
  ({ theme }) => `
        text-align: left;
        max-width: 40.6rem;
        margin-right: 4rem;
        "& .MuiTypography-root" {
          text-align: left !important;
        }
        ${theme.breakpoints.down("md")} {
          margin-right: 0;
          text-align: center;
        };
      `,
)

const TitleTypography = styled(Typography)(
  ({ theme }) => `
    max-width: 60rem;
    text-align: center;
    margin: 2rem auto 0; 
    letter-spacing: -0.26px;
    ${theme.breakpoints.down("md")} {
      margin: 0 auto; 
    };
    `,
)

const SubTitleTypography = styled(Typography)(
  ({ theme }) => `
      text-align: center;
      margin: 1.4rem auto 3.6rem; 
      `,
)

const MediaCard = styled(Box)(
  ({ theme }) => `
    background: ${theme.palette.background.default};
    border-radius: ${theme.shape.borderRadius}px;
    text-align: left;
    padding: 5rem 5rem 6rem 4rem;
    &:first-of-type {
      margin-right: 3rem;
    }
    ${theme.breakpoints.down("md")} {
      &:first-of-type {
        margin-right: 0;
        margin-bottom: 5rem;
        padding: 4rem 3.3rem;
      }
    };
  `,
)

const MediaTitle = styled(Typography)(
  ({ theme }) => `
        color: #313144;
        font-weight: 600;
        font-size: 3rem !important;
        line-height: 4rem !important;
      `,
)

const MediaSummary = styled(Typography)(
  ({ theme }) => `
      font-size: 16px;
      line-height: 26px;
      color: #313144;
      margin: 2rem auto;
      `,
)

const MediaContainer = styled(Box)(
  ({ theme }) => `
        ${theme.breakpoints.down("md")} {
          flex-direction: column;
      };
      `,
)

const BridgeScreenshotImg = styled(WebpImage)(
  ({ theme }) => `
       height: auto;
       max-width: 93.4rem;
       width: 100%;
       margin-top: 8.7rem;
      `,
)

const RocketImg = styled(WebpImage)(
  ({ theme }) => `
       height: 6rem;
       ${theme.breakpoints.down("md")} {
        height: 4rem;
        position: relative;
        top: -3.6rem;
      };
      `,
)

const MediaLink = styled("a")(
  ({ theme }) => `
        height: 3.3rem;
        width: 4.4rem;
        margin-right: 3rem;
        &:hover {
          opacity: 0.8;
        }
        ${theme.breakpoints.down("md")} {
          height: 2.4rem;
          width: 3.3rem;
          margin-right: 2.3rem;
      };
      `,
)

const JoinTestnetButton = props => (
  <Button color="primary" variant="contained" href="/portal" {...props}>
    Join Alpha Testnet
  </Button>
)

const Home = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
  const navigate = useNavigate()

  return (
    <ContainerBox>
      <SectionBox>
        <WrapperBox>
          <TitleTypography variant="h1">The Native zkEVM Scaling Solution for Ethereum</TitleTypography>
          <SubTitleTypography variant="subtitle1" sx={{ maxWidth: "61rem" }}>
            Scroll is a zkEVM-based zkRollup on Ethereum that enables native compatibility for existing Ethereum applications and tools.
          </SubTitleTypography>
          <JoinTestnetButton />
        </WrapperBox>
      </SectionBox>

      <SectionBox>
        <WrapperBox>
          <TitleTypography variant="h1">Technical Principles</TitleTypography>
          <SubTitleTypography variant="subtitle1" sx={{ maxWidth: "65rem" }}>
            Scroll aims to provide the best experience for developers and users.
          </SubTitleTypography>
        </WrapperBox>
        <FeatureSwiper />
      </SectionBox>

      <SectionBox>
        <WrapperBox>
          <TitleTypography variant="h1">Join the Scroll Testnet</TitleTypography>
          <SubTitleTypography variant="subtitle1" sx={{ maxWidth: "53rem" }}>
            The future is here: interact with dApps, deploy smart contracts, and explore L2 blocks on Scroll’s Testnet.
          </SubTitleTypography>
          <Box>
            <JoinTestnetButton />
          </Box>
          <BridgeScreenshotImg
            src={isDesktop ? BridgeScreenshot : BridgeScreenshotMobile}
            webpsrc={isDesktop ? BridgeScreenshotWebp : BridgeScreenshotMobileWebp}
          />
        </WrapperBox>
      </SectionBox>

      <SectionBox className="roadmap-section">
        <RoadmapBoxWrapper className="wrapper">
          <RoadmapInfo>
            <TitleTypography
              sx={{
                textAlign: {
                  md: "left",
                },
              }}
              variant="h1"
            >
              Our journey so far
            </TitleTypography>
            <SubTitleTypography
              variant="subtitle1"
              sx={{
                maxWidth: "38rem",
                color: "#737373",
                textAlign: {
                  md: "left",
                },
              }}
            >
              After successfully building a zkEVM POC, we are now working on our <span style={{ fontWeight: 600 }}>zkEVM Testnet</span>. It is
              currently live and open to the public.
            </SubTitleTypography>
            <JoinTestnetButton />
          </RoadmapInfo>
          <Roadmap />
        </RoadmapBoxWrapper>
      </SectionBox>

      <SectionBox>
        <TitleTypography variant="h1">Scroll Blog</TitleTypography>
        <SubTitleTypography variant="subtitle1" sx={{ maxWidth: "70rem" }}>
          Learn about Scroll’s technology, research, and latest developments.
        </SubTitleTypography>
        <Article />
      </SectionBox>

      <SectionBox sx={{ background: "#E7F6FE !important" }}>
        <MediaContainer className="wrapper" display="flex">
          <MediaCard>
            <MediaTitle>Want to scale Ethereum together? Join us today</MediaTitle>
            <MediaSummary>
              Scroll is a team of passionate contributors around the globe. We value ideas and execution above all else. Join us today!
            </MediaSummary>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button color="secondary" sx={{ height: "5rem", width: "21.5rem" }} onClick={() => navigate("/join-us")}>
                View Open Positions
              </Button>
              <RocketImg src={RocketIcon} webpsrc={RocketWebpIcon} />
            </Box>
          </MediaCard>
          <MediaCard>
            <MediaTitle>
              Want the latest updates?
              <br /> Check out our social media
            </MediaTitle>
            <MediaSummary>
              Be part of our community and stay up to date with all things Scroll. Everyone who wants to build a decentralized future is welcome!
            </MediaSummary>
            <Box display="flex" paddingTop="1rem">
              {medias.map(media => (
                <MediaLink
                  href={media.href}
                  key={media.name}
                  sx={{
                    background: `url(${media.imgSrc}) center / contain no-repeat `,
                  }}
                  className={media.name}
                />
              ))}
            </Box>
          </MediaCard>
        </MediaContainer>
      </SectionBox>
    </ContainerBox>
  )
}

export default Home
