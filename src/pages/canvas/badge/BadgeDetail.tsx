import { useEffect, useRef, useState } from "react"
import Img from "react-cool-img"
import { Helmet } from "react-helmet-async"

import { Avatar, Box, Link, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import SectionWrapper from "@/components/SectionWrapper"
import Skeleton from "@/components/Skeleton"
import useCheckViewport from "@/hooks/useCheckViewport"
import UpgradeAction from "@/pages/canvas/Dashboard/BadgeDetailDialog/UpgradeAction"
import useCanvasStore from "@/stores/canvasStore"
import { ipfsToBrowserURL } from "@/utils"

import BadgeDesc from "../components/BadgeDesc"
import Statistic from "../components/Statistic"

const InfoBox = styled<any>(Box)(({ theme, count }) => ({
  display: "grid",
  gridTemplateColumns: count === 1 ? "1fr" : "repeat(3, 1fr)",
  rowGap: "3.2rem",
  columnGap: "4.8rem",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: count === 1 ? "1fr" : "repeat(2, 1fr)",
    width: "100%",
    columnGap: "2.4rem",
    rowGap: "1.6rem",
  },
}))

const DisclaimerBox = styled(Box)(({ theme }) => ({
  padding: "0.8rem 1.2rem",
  color: "#FFF",
  fontSize: "1.4rem",
  lineHeight: "2rem",
  borderRadius: "0.4rem",
  background: "#262626",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))

const BadgeDetail = props => {
  const { detail, metadata, loading, breadcrumb, property, onUpgrade, children } = props
  const { isBadgeUpgrading } = useCanvasStore()
  const { isLandscape } = useCheckViewport()
  const [actionHeight, setActionHeight] = useState("auto")
  const [isOverflow, setIsOverflow] = useState(false)

  const actionsRef = useRef()

  useEffect(() => {
    const actionBoxObserver = new ResizeObserver(entries => {
      // this will get called whenever div dimension changes
      entries.forEach(entry => {
        setActionHeight(entry.target.getBoundingClientRect().height + "px")
      })
    })
    if (actionsRef.current) {
      actionBoxObserver.observe(actionsRef.current as HTMLElement)
    }
    return () => {
      actionBoxObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (actionHeight !== "auto") {
      const detailContainerEl = document.querySelector(".detail-container") as HTMLElement
      setIsOverflow(detailContainerEl.clientHeight < detailContainerEl.scrollHeight)
    }
  }, [loading, actionHeight])

  const getCommunityLogo = (communityURL): string => {
    if (communityURL.includes("x.com") || communityURL.includes("twitter.com")) {
      return "/imgs/canvas/support/x.svg"
    } else if (communityURL.includes("discord.com") || communityURL.includes("discord.gg")) {
      return "/imgs/canvas/support/discord.svg"
    } else if (communityURL.includes("t.me") || communityURL.includes("telegram.me")) {
      return "/imgs/canvas/support/telegram.svg"
    } else {
      return "/imgs/canvas/support/contact.svg"
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
        className="detail-container"
        sx={{
          pt: ["1.6rem", "5.5rem"],
          pb: [0, "6rem"],
          minHeight: ["unset", "calc(100vh - 6.5rem)"],

          height: [`calc(var(--vh, 1vh) * 100 - 6.2rem - ${actionHeight})`, "auto"],
          display: "flex",
          alignItems: isOverflow ? "flex-start" : "center",
          overflowY: isOverflow ? "auto" : "unset",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "min-content max-content",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
            background: "#101010",
            columnGap: "4rem",
            rowGap: "7.2rem",
            "& .MuiTypography-root": {
              color: theme => theme.palette.primary.contrastText,
            },
            "@media (max-width: 1280px)": {
              gap: "4rem",
              // gridTemplateColumns: "minmax(min-content, 1fr) 1fr",
              gridTemplateColumns: "min-content 1fr",
              justifyItems: "center",
            },

            "@media (max-width: 900px)": {
              gap: "2rem",
              gridTemplateColumns: "1fr",
            },
            "@media (max-width: 600px)": {
              gap: "1.6rem",
              height: "max-content",
            },
          }}
        >
          {!!breadcrumb && <Box sx={{ width: "100%", gridColumn: ["span 1", "span 1", "span 2"], justifySelf: "flex-start" }}>{breadcrumb}</Box>}

          <Box sx={{ width: ["12rem", "40rem"], aspectRatio: "1/1" }}>
            {loading ? (
              <Skeleton dark sx={{ height: "100%" }}></Skeleton>
            ) : (
              <Img
                src={ipfsToBrowserURL(detail.image)}
                placeholder="/imgs/canvas/badgePlaceholder.svg"
                style={{ borderRadius: "0.8rem" }}
                alt="badge image"
              />
            )}
          </Box>
          <Stack
            sx={{ width: "100%", gap: ["1.6rem", "2.4rem", "3.2rem"] }}
            direction="column"
            // spacing={isPortrait ? "2.4rem" : "3.2rem"}
            alignItems={isLandscape ? "flex-start" : "center"}
          >
            <Box sx={{ width: "100%", textAlign: ["center", "center", "left"] }}>
              {!loading && detail.upgradable && (
                <UpgradeAction
                  sx={{ mb: "0.8rem", borderRadius: "0.4rem" }}
                  loading={isBadgeUpgrading.get(detail.id)}
                  onClick={onUpgrade}
                ></UpgradeAction>
              )}
              {loading ? (
                <Skeleton
                  dark
                  sx={{
                    height: ["3.2rem", "7.2rem"],
                    width: ["40vw", "40vw", "60%"],
                    my: "0.6rem",
                  }}
                ></Skeleton>
              ) : (
                <Typography
                  sx={{
                    fontSize: ["2rem", "4rem"],
                    fontWeight: 600,
                    lineHeight: ["3.2rem", "7.2rem"],
                    textAlign: ["center", "center", "left"],
                    mb: "0.8rem",
                  }}
                >
                  {detail.name}
                </Typography>
              )}
              {loading ? (
                <Skeleton
                  dark
                  sx={{ display: "block", width: ["100%", "100%", "100%", "56rem"], height: ["4.8rem", "6.4rem"], my: "0.6rem" }}
                ></Skeleton>
              ) : (
                <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], maxWidth: ["100%", "100%", "56rem"] }}>
                  <BadgeDesc>{detail.description}</BadgeDesc>
                </Typography>
              )}
            </Box>

            <InfoBox count={property.length + (detail.issuer?.communityURL ? 1 : 0)}>
              {property.includes("owner") && (
                <Statistic label="Owner" loading={loading} sx={{ "& *": { cursor: "pointer !important" } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                    }}
                  >
                    <Img width={32} height={32} placeholder="/imgs/canvas/avatarPlaceholder.svg" src={detail.ownerLogo}></Img>
                    {detail.owner}
                  </Box>
                </Statistic>
              )}
              {property.includes("issuer") && (
                <>
                  <Statistic label="Issued by" loading={loading}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.8rem",
                      }}
                    >
                      <Avatar
                        variant="square"
                        src={detail.issuer?.logo}
                        sx={{ width: "3.2rem", height: "3.2rem", borderRadius: "0.4rem", backgroundColor: "background.default" }}
                      ></Avatar>
                      {detail.issuer?.name || "Unknown"}
                    </Box>
                  </Statistic>
                  {detail.issuer?.communityURL && (
                    <Statistic label="Need support?" loading={loading}>
                      <Link
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.8rem",
                          fontSize: "inherit",
                        }}
                        underline="none"
                        href={detail.issuer.communityURL}
                        target="_blank"
                      >
                        <Avatar
                          variant="square"
                          src={getCommunityLogo(detail.issuer.communityURL)}
                          sx={{ width: "3.2rem", height: "3.2rem" }}
                        ></Avatar>
                        Contact
                      </Link>
                    </Statistic>
                  )}
                </>
              )}
              {property.includes("mintedOn") && (
                <Statistic label="Minted on" loading={loading}>
                  <Box>{detail.mintedOn}</Box>
                </Statistic>
              )}
              {property.includes("rarity") && (
                <Statistic label="Rarity" loading={loading}>
                  <Box>{detail.rarity}</Box>
                </Statistic>
              )}
            </InfoBox>

            {!property.includes("owner") && detail.thirdParty && (
              <DisclaimerBox>
                <Img src="/imgs/canvas/warning.png" style={{ width: "1.4rem", height: "1.4rem", marginRight: "0.8rem" }} alt="warning image" />
                Issuing badge is permissionless - perform due diligence and interact with dApps at your own risk.
              </DisclaimerBox>
            )}

            <Box
              ref={actionsRef}
              sx={[
                {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, min-content)",
                  alignItems: "center",
                  columnGap: "1.6rem",
                  rowGap: "3.2rem",
                  backgroundColor: "themeBackground.dark",
                },
                theme => ({
                  [theme.breakpoints.down("sm")]: {
                    position: "fixed",
                    padding: "2.4rem 2rem",
                    bottom: 0,
                    width: "100%",
                    rowGap: "1.6rem",
                    gridTemplateColumns: "1fr min-content",
                    "& > div": {
                      width: "100%",
                    },
                  },
                }),
              ]}
            >
              {children}
            </Box>
          </Stack>
        </Box>
      </SectionWrapper>
    </>
  )
}

export default BadgeDetail
