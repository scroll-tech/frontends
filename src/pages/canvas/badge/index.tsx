import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { SvgIcon } from "@mui/material"

import { getSmallAvatarURL, viewEASScanURL } from "@/apis/canvas"
import { ReactComponent as ShareSvg } from "@/assets/svgs/canvas/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import { NFT_RARITY_MAP } from "@/constants"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import { fillBadgeDetailWithPayload, queryBadgeDetailById, queryCanvasUsername } from "@/services/canvasService"
import { formatDate, generateShareTwitterURL, requireEnv } from "@/utils"

import { badgeMap } from "../Dashboard/UpgradeDialog/Badges"
import BackToCanvas from "./BackToCanvas"
import BadgeDetail from "./BadgeDetail"

const isOriginsNFTBadge = badgeContract => {
  return badgeMap[badgeContract]?.originsNFT
}

const isNativeBadge = badgeContract => {
  return badgeMap[badgeContract]?.native
}

const BadgeDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { walletCurrentAddress } = useRainbowContext()

  const { unsignedProfileRegistryContract, publicProvider } = useCanvasContext()

  const alertWarning = useSnackbar()

  const [detail, setDetail] = useState<any>({})
  const [loading, setLoading] = useState(false)
  // const [errorMessage, setErrorMessage] = useState("")

  const metadata = useMemo(
    () => ({
      title: `Canvas Badge - ${detail.name} Owned by ${detail.owner}`,
      description: `I have minted the ${detail.name}`,
      // TODO:
      image: "",
    }),
    [detail],
  )

  const shareBadgeURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-canvas/badge/${id}`
    return generateShareTwitterURL(viewURL, `Here is my badge ${detail.name}`)
  }, [id, detail])

  useEffect(() => {
    if (publicProvider && unsignedProfileRegistryContract) {
      fetchBadgeDetailByBadgeId(id)
    }
  }, [unsignedProfileRegistryContract, publicProvider, id])

  const fetchProfileUsername = async (provider, walletAddress) => {
    try {
      const profileAddress = await unsignedProfileRegistryContract.getProfile(walletAddress)
      const { name } = await queryCanvasUsername(provider, profileAddress)
      return name
    } catch (error) {
      console.log("Failed to query username:", error)
    }
  }

  const fetchBadgeDetailByBadgeId = async id => {
    setLoading(true)
    try {
      const badges = await queryBadgeDetailById(id)
      if (!badges.length) {
        navigate("/404")
        return
      }

      const [{ recipient, time, data }] = badges

      const { badgeContract, description, ...badgeMetadata } = await fillBadgeDetailWithPayload(publicProvider, { id, data })
      const name = await fetchProfileUsername(publicProvider, recipient)
      const badgeDetail = {
        walletAddress: recipient,
        owner: name,
        ownerLogo: getSmallAvatarURL(recipient),
        mintedOn: formatDate(time * 1000),
        badgeContract,
        issuer: badgeMap[badgeContract]?.issuer,
        description: isOriginsNFTBadge(badgeContract) ? badgeMap[badgeContract].description : description,
        ...badgeMetadata,
      }
      if (isOriginsNFTBadge(badgeContract)) {
        const rarityNum = badgeMetadata.attributes.find(item => item.trait_type === "Rarity").value
        badgeDetail.rarity = NFT_RARITY_MAP[rarityNum]
      }
      setDetail(badgeDetail)
    } catch (e) {
      alertWarning("Failed to fetch badge detail")
    } finally {
      setLoading(false)
    }
  }

  const viewCanvasURL = useMemo(() => {
    // console.log("walletCurrentAddress", walletCurrentAddress, detail)
    if (walletCurrentAddress === detail.walletAddress) {
      return "/scroll-canvas"
    }
    return `/scroll-canvas/${detail.walletAddress}`
  }, [walletCurrentAddress, detail])

  return (
    <>
      <BadgeDetail
        detail={detail}
        metadata={metadata}
        loading={loading}
        property={["owner", "issuer", "mintedOn", isOriginsNFTBadge(detail.badgeContract) ? "rarity" : undefined]}
        breadcrumb={<BackToCanvas username={detail.owner} loading={loading} href={viewCanvasURL}></BackToCanvas>}
      >
        <ScrollButton color="primary" href={viewEASScanURL(id)} sx={{ gridColumn: ["span 2", "unset"] }} target="_blank">
          View on EAS
        </ScrollButton>

        {isNativeBadge(detail.badgeContract) ? (
          <ScrollButton color="secondary" href="/scroll-canvas">
            Visit my canvas
          </ScrollButton>
        ) : (
          <ScrollButton color="secondary" href={detail.issuer?.origin} target="_blank">
            Visit {detail.issuer?.name}
          </ScrollButton>
        )}

        <Link external href={shareBadgeURL}>
          <SvgIcon sx={{ fontSize: "3.2rem", color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
        </Link>
      </BadgeDetail>
    </>
  )
}

export default BadgeDetailPage
