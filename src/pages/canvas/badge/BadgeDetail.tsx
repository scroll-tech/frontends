import Img from "react-cool-img"
import { Helmet } from "react-helmet-async"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import SectionWrapper from "@/components/SectionWrapper"
import Skeleton from "@/components/Skeleton"
import useCheckViewport from "@/hooks/useCheckViewport"
import { getBadgeImgURL } from "@/utils"

import Statistic from "../components/Statistic"

const InfoBox = styled<any>(Box)(({ theme, count }) => ({
  display: "grid",
  gridTemplateColumns: count === 1 ? "1fr" : "repeat(3, 1fr)",
  // gridAutoColumns: "min-content",
  rowGap: "3.2rem",
  columnGap: "4.8rem",
  // justifyItems: "center",
}))

// const UpgradedBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   backgroundColor: "#FF6F43",
//   width: "33.8rem",
//   height: "4.8rem",
//   justifyContent: "center",
//   alignItems: "center",
//   color: "#fff",
//   fontSize: "1.6rem",
//   fontWeight: 600,
//   borderRadius: "0.8rem",
// }))

// const UpgradedButton = styled(Button)(({ theme }) => ({
//   borderRadius: "0.8rem",
//   fontSize: "1.6rem",
//   fontWeight: 600,
//   lineHeight: "2.4rem",
//   height: "3.2rem",
//   width: "12.4rem",
//   border: "1px solid #Fff",
//   padding: "0",
//   marginLeft: "1.6rem",
// }))

const BadgeDetail = props => {
  const { detail, metadata, loading, breadcrumb, property, children, extra } = props

  const { isPortrait, isLandscape } = useCheckViewport()

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
        }}
      >
        <Box
          sx={{
            height: "100%",
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
              gap: "2.4rem",
            },
          }}
        >
          {!!breadcrumb && <Box sx={{ width: "100%", gridColumn: ["span 1", "span 1", "span 2"], justifySelf: "flex-start" }}>{breadcrumb}</Box>}

          <Box sx={{ width: "48rem", aspectRatio: "1/1" }}>
            {loading ? (
              <Skeleton dark sx={{ height: "100%" }}></Skeleton>
            ) : (
              <Img
                src={getBadgeImgURL(detail.image)}
                placeholder="/imgs/canvas/badgePlaceholder.svg"
                style={{ borderRadius: "0.8rem" }}
                alt="badge image"
              />
            )}
          </Box>
          <Stack direction="column" spacing={isPortrait ? "2.4rem" : "3.2rem"} alignItems={isLandscape ? "flex-start" : "center"}>
            <Box sx={{ textAlign: ["center", "center", "left"] }}>
              {/* <UpgradedBox>
            UPGRADE AVAILABLE
            <UpgradedButton variant="contained" color="primary" onClick={handleMint}>
              Upgrade now
            </UpgradedButton>
          </UpgradedBox> */}
              <Typography sx={{ fontSize: ["4rem", "5.6rem"], fontWeight: 600, lineHeight: ["5.6rem", "9.6rem"] }}>{detail.name}</Typography>

              <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], maxWidth: ["100%", "56rem"] }}>
                <>{detail.description}</>
              </Typography>
            </Box>

            <InfoBox count={property.length}>
              {property.includes("owner") && (
                // <RouterLink to={viewCanvasURL}>
                <Statistic label="Owner" loading={loading} sx={{ "& *": { cursor: "pointer !important" } }}>
                  <Img width={40} height={40} placeholder="/imgs/canvas/avatarPlaceholder.svg" src={detail.ownerLogo}></Img>
                  {detail.owner}
                </Statistic>
                // </RouterLink>
              )}
              {property.includes("issuer") && (
                <Statistic label="Issued by" loading={loading}>
                  <Img
                    width={40}
                    height={40}
                    style={{ borderRadius: "0.8rem" }}
                    placeholder="/imgs/canvas/avatarPlaceholder.svg"
                    src={detail.issuer?.logo}
                  ></Img>
                  {detail.issuer?.name}
                </Statistic>
              )}
              {property.includes("mintedOn") && (
                <Statistic label="Minted on" loading={loading}>
                  {detail.mintedOn}
                </Statistic>
              )}
              {property.includes("rarity") && (
                <Statistic label="Badge Rarity" loading={loading}>
                  {detail.rarity}
                </Statistic>
              )}
            </InfoBox>

            <Stack direction="row" gap="1.6rem" alignItems="center">
              {children}
            </Stack>
            {extra}
          </Stack>
        </Box>
      </SectionWrapper>
    </>
  )
}

export default BadgeDetail
