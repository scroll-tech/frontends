import { useMemo, useState } from "react"
import Img from "react-cool-img"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { Avatar, Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ReactComponent as ValidSvg } from "@/assets/svgs/skelly/check.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/skelly/circle-warning.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import SectionWrapper from "@/components/SectionWrapper"
import { ANNOUNCING_SCROLL_ORIGINS_NFT, DESIGNING_SCROLL_ORIGINS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import useCheckViewport from "@/hooks/useCheckViewport"
import { mintBadge, queryUserBadges } from "@/services/skellyService"
import useSkellyStore from "@/stores/skellyStore"
import { decodeBadgePayload, generateShareTwitterURL, getBadgeImgURL, requireEnv } from "@/utils"

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
  const { profileMinted } = useSkellyStore()
  const [loading, setLoading] = useState(false)
  // const [badgeMinted, setBadgeMinted] = useState(false)
  const navigate = useNavigate()

  const detail = useMemo(() => {
    return badgeMap[address]
  }, [address])

  // TODO: pre fetch?
  const isOwned = useAsyncMemo(async () => {
    const userBadges = await queryUserBadges(walletCurrentAddress)

    const userBadgeContracts = userBadges.map(item => decodeBadgePayload(item.data)[0])

    return userBadgeContracts.includes(address)
  }, [address, walletCurrentAddress])

  const isValid = useAsyncMemo(async () => {
    const badgeForMint = Badges.find(item => item.badgeContract === address)
    const valid = await badgeForMint!.validator(walletCurrentAddress, provider)
    return valid
  }, [address, walletCurrentAddress, provider])

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
    if (result === false) {
      // setBadgeMinted(false)
      console.log("mintBadge failed", result)
    } else {
      // TODO:
      // setBadgeMinted(true)
      navigate(`/scroll-skelly/badge/${result}`, { replace: true })
    }
    setLoading(false)
  }

  const renderTip = () => {
    if (profileMinted === false) {
      return (
        <>
          <SvgIcon sx={{ color: "#FAD880", fontSize: "2.4rem" }} component={WarningSvg} inheritViewBox></SvgIcon>
          <Typography sx={{ color: "#FAD880 !important", fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 500 }}>
            You need a Scroll Skelly in order to mint your Zebra Badge.
          </Typography>
        </>
      )
    } else if (profileMinted && !isOwned && isValid) {
      return (
        <>
          <SvgIcon sx={{ color: "#85E0D1", fontSize: "2.4rem" }} component={ValidSvg} inheritViewBox></SvgIcon>
          <Typography sx={{ color: "#85E0D1 !important", fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 500 }}>
            You are eligible to mint the badge
          </Typography>
        </>
      )
    } else if (profileMinted && !isOwned && !isValid) {
      return (
        <>
          <SvgIcon sx={{ color: "primary.main", fontSize: "2.4rem" }} component={WarningSvg} inheritViewBox></SvgIcon>
          <Typography sx={{ color: "#FF684B !important", fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 500 }}>
            Selected account is not eligible to mint the badge yet.
          </Typography>
        </>
      )
    }
    return null
  }

  // TODO: async need loading?
  const renderAction = () => {
    if (!walletCurrentAddress) {
      return (
        <ScrollButton color="primary" onClick={connect}>
          Connect wallet
        </ScrollButton>
      )
    } else if (!profileMinted) {
      return (
        <ScrollButton color="primary" href="/scroll-skelly/mint">
          Mint Scroll Skelly
        </ScrollButton>
      )
    } else if (isOwned) {
      return (
        <ScrollButton color="primary" href="/scroll-skelly">
          Visit Scroll Skelly
        </ScrollButton>
      )
    }
    return (
      <ScrollButton color="primary" onClick={handleMint} loading={loading} gloomy={!isValid}>
        Mint now
      </ScrollButton>
    )
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
          <Stack direction="column" spacing={isPortrait ? "2.4rem" : "3.6rem"} alignItems={isLandscape ? "flex-start" : "center"}>
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
            <Stack direction="row" gap="0.8rem" alignItems="center">
              {renderTip()}
            </Stack>
          </Stack>
        </Box>
      </SectionWrapper>
    </>
  )
}

export default BadgeContractDetail
