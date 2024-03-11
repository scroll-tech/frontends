import { useMemo, useState } from "react"
import Img from "react-cool-img"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

import { Avatar, Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import SectionWrapper from "@/components/SectionWrapper"
import { ANNOUNCING_SCROLL_ORIGINS_NFT, DESIGNING_SCROLL_ORIGINS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import { mintBadge } from "@/services/skellyService"
import useSkellyStore from "@/stores/skellyStore"
import { generateShareTwitterURL, getBadgeImgURL, requireEnv } from "@/utils"

import Badges, { badgeMap } from "../Dashboard/UpgradeDialog/Badges"
import Statistic from "../components/Statistic"

const isOriginsNFTBadge = badgeContract => {
  return badgeMap[badgeContract]?.originsNFT
}
const isNativeBadge = badgeContract => {
  return badgeMap[badgeContract]?.native
}

const CustomLink = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontSize: "inherit",
  textUnderlineOffset: "2px",
  textDecorationThickness: "1px",
  fontWeight: 700,
}))

const InfoBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
}))

const BadgeContractDetail = props => {
  const { address } = useParams()
  const { walletCurrentAddress, connect, provider } = useRainbowContext()
  const { profileMinted, userBadges } = useSkellyStore()
  const [loading, setLoading] = useState(false)
  const [badgeMinted, setBadgeMinted] = useState(false)

  const detail = useMemo(() => {
    return badgeMap[address]
  }, [address])

  const shareBadgeURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-skelly/badge-contract/${address}`
    return generateShareTwitterURL(viewURL, `I found a badge called ${detail.name} you may like`)
  }, [address, detail])

  const metadata = useMemo(
    () => ({
      title: `I found a badge called ${detail.name} you may like`,
      description: detail.description,
      // TODO:
      image: "",
    }),
    [detail],
  )

  const { isMobile, isPortrait, isLandscape } = useCheckViewport()

  const handleMint = async () => {
    setLoading(true)
    const badgeForMint = Badges.find(item => item.badgeContract === address)
    const result = await mintBadge(provider, walletCurrentAddress, badgeForMint!.nftAddress, badgeForMint!.nftAbi, badgeForMint!.badgeContract)

    if (result! !== true) {
      setBadgeMinted(false)
      console.log("mintBadge failed", result)
    } else {
      setBadgeMinted(true)
    }
    setLoading(false)
  }

  const renderAction = () => {
    if (!walletCurrentAddress) {
      return (
        <ScrollButton color="primary" onClick={connect}>
          Connect wallet
        </ScrollButton>
      )
    } else if (!profileMinted) {
      return (
        <ScrollButton color="primary" href="/scroll-skelly">
          Mint Scroll Skelly
        </ScrollButton>
      )
    } else {
      const hasBadge = userBadges.find(item => item.badgeContract === address)
      if (hasBadge || badgeMinted) {
        return (
          <ScrollButton color="primary" href="/scroll-skelly">
            Visit Scroll Skelly
          </ScrollButton>
        )
      } else {
        return (
          <ScrollButton color="primary" onClick={handleMint} loading={loading}>
            Mint now
          </ScrollButton>
        )
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
      </Helmet>
      <SectionWrapper
        dark
        sx={{
          pt: ["2.4rem", "4rem", "8rem"],
          pb: ["8rem", "16rem"],
          minHeight: "calc(100vh - 6.5rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            background: "#101010",
            gap: "8rem",
            "& .MuiTypography-root": {
              color: theme => theme.palette.primary.contrastText,
            },
            "@media (max-width: 1280px)": {
              gap: "2rem",
              display: "grid",
              gridTemplateColumns: "minmax(min-content, 1fr) 1fr",
              justifyItems: "center",
            },

            "@media (max-width: 900px)": {
              gridTemplateColumns: "1fr",
            },
            "@media (max-width: 600px)": {
              gap: "2.4rem",
            },
          }}
        >
          <Box sx={{ width: "48rem", aspectRatio: "1/1" }}>
            <Img src={getBadgeImgURL(detail.image)} style={{ borderRadius: "0.8rem" }} alt="badge image" />
          </Box>
          <Stack direction="column" spacing={isPortrait ? "2.4rem" : "4.8rem"} alignItems={isLandscape ? "flex-start" : "center"}>
            <Box sx={{ textAlign: ["center", "center", "left"] }}>
              <Typography sx={{ fontSize: ["4rem", "5.6rem"], fontWeight: 600, lineHeight: ["5.6rem", "9.6rem"] }}>{detail.name}</Typography>

              <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], maxWidth: ["100%", "56rem"] }}>
                {isOriginsNFTBadge(detail.badgeContract) ? (
                  <>
                    <CustomLink href={ANNOUNCING_SCROLL_ORIGINS_NFT} underline="always" external>
                      Scroll Origins
                    </CustomLink>{" "}
                    is a{" "}
                    <CustomLink href={DESIGNING_SCROLL_ORIGINS} underline="always" external>
                      specially designed NFT
                    </CustomLink>{" "}
                    program to celebrate alongside early developers building on Scroll within 60 days of Genesis Block (Before December 9, 2023
                    10:59PM GMT).
                  </>
                ) : (
                  <>{detail.description}</>
                )}
              </Typography>
            </Box>

            <InfoBox gap={isMobile ? "2.4rem" : "4.8rem"}>
              <Statistic label="Issued by">
                <Avatar src={detail.issuer?.logo}></Avatar>
                {detail.issuer?.name}
              </Statistic>
            </InfoBox>

            <Stack direction="row" gap="1.6rem" alignItems="center">
              {renderAction()}
              {!isNativeBadge && (
                <ScrollButton color="secondary" href={detail.issuer?.origin} target="_blank">
                  Visit {detail.issuer?.name}
                </ScrollButton>
              )}

              <Link external href={shareBadgeURL}>
                <SvgIcon sx={{ fontSize: "3.2rem", color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </SectionWrapper>
    </>
  )
}

export default BadgeContractDetail
