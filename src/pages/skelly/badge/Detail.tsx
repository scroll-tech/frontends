import { Contract } from "ethers"
import { useEffect, useState } from "react"
import Img from "react-cool-img"
import { useParams } from "react-router-dom"

import { Avatar, Box, IconButton, Skeleton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { getAvatarURL, viewEASScanURL } from "@/apis/skelly"
import ProfileABI from "@/assets/abis/SkellyProfile.json"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import RequestWarning from "@/components/RequestWarning"
import { ANNOUNCING_SCROLL_ORIGINS_NFT, DESIGNING_SCROLL_ORIGINS, NFT_RARITY_MAP } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import { getBadgeMetadata } from "@/services/skellyService"
import { queryBadgeDetailById } from "@/services/skellyService"
import { decodeBadgePayload, formatDate, getBadgeImgURL } from "@/utils"

import Statistic from "../components/Statistic"

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

const Detail = props => {
  const { id } = useParams()
  const { provider } = useRainbowContext()
  const { unsignedProfileRegistryContract } = useSkellyContext()

  const [detail, setDetail] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const isOriginsNFTBadge = badgeContract => {
    return badgeContract === "0x2aa883c6EaB368d1C86452127bc0Dd6c887a1F44"
  }

  const fetchSkellyName = async (provider, walletAddress) => {
    try {
      const profileAddress = await unsignedProfileRegistryContract.getProfile(walletAddress)
      const profileInstance = new Contract(profileAddress, ProfileABI, provider)
      const name = await profileInstance.username()
      return name
    } catch (error) {
      console.log("Failed to query username:", error)
    }
  }
  // TODO: chainId must be L2
  useEffect(() => {
    if (unsignedProfileRegistryContract) {
      fetchBadgeDetailById(id)
    }
  }, [unsignedProfileRegistryContract, id])

  const fetchBadgeDetailById = async id => {
    setLoading(true)
    try {
      const [{ attester, time, data }] = await queryBadgeDetailById(id)
      const name = await fetchSkellyName(provider, attester)
      const [badgeContract] = decodeBadgePayload(data)
      const badgeMetadata = await getBadgeMetadata(provider, badgeContract, id)
      const badgeDetail = {
        ...badgeMetadata,
        owner: name,
        ownerLogo: getAvatarURL(attester),
        mintedOn: formatDate(time * 1000),
        badgeContract,
      }

      if (isOriginsNFTBadge(badgeContract)) {
        const rarityNum = badgeMetadata.attributes.find(item => item.trait_type === "Rarity").value
        badgeDetail.rarity = NFT_RARITY_MAP[rarityNum]
      }
      setDetail(badgeDetail)
    } catch (e) {
      setErrorMessage("Error")
    } finally {
      setLoading(false)
    }
  }

  const { isMobile, isPortrait, isLandscape } = useCheckViewport()
  const [errorMessage, setErrorMessage] = useState("")

  const handleCloseWarning = () => {
    setErrorMessage("")
  }

  return (
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
        {loading ? (
          <Skeleton variant="rectangular" sx={{ backgroundColor: "rgba(256, 256, 256, 0.15)", height: "100%", borderRadius: "1rem" }}></Skeleton>
        ) : (
          <Img src={getBadgeImgURL(detail.image)} alt="badge image" />
        )}
      </Box>
      <Stack direction="column" spacing={isPortrait ? "2.4rem" : "4.8rem"} alignItems={isLandscape ? "flex-start" : "center"}>
        <Box sx={{ textAlign: ["center", "center", "left"] }}>
          {/* <UpgradedBox>
            UPGRADE AVAILABLE
            <UpgradedButton variant="contained" color="primary" onClick={handleMint}>
              Upgrade now
            </UpgradedButton>
          </UpgradedBox> */}
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
                program to celebrate alongside early developers building on Scroll within 60 days of Genesis Block (Before December 9, 2023 10:59PM
                GMT).
              </>
            ) : (
              <>{detail.description}</>
            )}
          </Typography>
        </Box>

        <InfoBox gap={isMobile ? "2.4rem" : "4.8rem"}>
          <Statistic label="Owner" loading={loading}>
            <Avatar src={detail.ownerLogo}></Avatar>
            {detail.owner}
          </Statistic>
          <Statistic label="Issued by" loading={loading}>
            <Avatar src="/imgs/skelly/scroll.png"></Avatar>
            Scroll
          </Statistic>
          <Statistic label="Minted on" loading={loading}>
            {detail.mintedOn}
          </Statistic>
          {detail.rarity && (
            <Statistic label="Badge Rarity" loading={loading}>
              {detail.rarity}
            </Statistic>
          )}
        </InfoBox>
        <Stack direction="row" gap="1.6rem">
          <ScrollButton color="primary" href={viewEASScanURL(id)} target="_blank">
            View on EAS
          </ScrollButton>
          <ScrollButton color="secondary">Visit Scroll</ScrollButton>
          <IconButton>
            <SvgIcon sx={{ color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
          </IconButton>
        </Stack>
      </Stack>
      <RequestWarning open={!!errorMessage} onClose={handleCloseWarning}>
        {errorMessage}
      </RequestWarning>
    </Box>
  )
}

export default Detail
