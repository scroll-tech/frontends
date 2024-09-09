"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { SvgIcon } from "@mui/material"

import { getSmallAvatarURL, viewEASScanURL } from "@/apis/canvas"
import ShareSvg from "@/assets/svgs/canvas/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import { NFT_RARITY_MAP } from "@/constants"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import {
  checkBadgeUpgradable,
  fetchIssuer,
  fetchNotionBadgeByAddr,
  fillBadgeDetailWithPayload,
  queryBadgeDetailById,
  queryCanvasUsername,
  upgradeBadge,
} from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { formatDate, generateShareTwitterURL, isOriginsNFTBadge } from "@/utils"

import BackToCanvas from "./BackToCanvas"
import BadgeDetail from "./BadgeDetail"

const Badge = () => {
  const { id } = useParams()
  const router = useRouter()

  const { walletCurrentAddress } = useRainbowContext()

  const { unsignedProfileRegistryContract, publicProvider } = useCanvasContext()
  const { changeIsBadgeUpgrading, username } = useCanvasStore()

  const alertWarning = useSnackbar()

  const [detail, setDetail] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const shareBadgeURL = useMemo(() => {
    const viewURL = `${process.env.NEXT_PUBLIC_FFRONTENDS_URL}/canvas/badge/${id}`
    const myText = `I just minted ${detail.name} badge. Find out your eligibility on Scroll Canvas, too!`
    const othersText = "Checkout this badge and check your eligibility!"
    const text = username && detail.owner && detail.owner === username ? myText : othersText
    return generateShareTwitterURL(viewURL, text)
  }, [id, detail])

  useEffect(() => {
    if (unsignedProfileRegistryContract) {
      fetchBadgeDetailByBadgeId(id)
    }
  }, [unsignedProfileRegistryContract, id])

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
        router.replace("/404")
        return
      }

      const [{ recipient, time, data }] = badges

      const { badgeContract, description, ...badgeMetadata } = await fillBadgeDetailWithPayload(publicProvider, { id, data })

      let badgeWidthIssuer = await fetchNotionBadgeByAddr(badgeContract)
      if (!badgeWidthIssuer.issuer) {
        const issuer = await fetchIssuer(badgeMetadata.issuerName)
        badgeWidthIssuer = {
          issuer,
          thirdParty: true,
        }
      }

      const name = await fetchProfileUsername(publicProvider, recipient)
      let upgradable = false
      if (walletCurrentAddress === recipient) {
        const checkedBadge = await checkBadgeUpgradable(publicProvider, { id, badgeContract })
        upgradable = checkedBadge.upgradable
      }
      const badgeDetail = {
        ...badgeMetadata,
        walletAddress: recipient,
        owner: name,
        ownerLogo: getSmallAvatarURL(recipient),
        mintedOn: formatDate(time * 1000),
        badgeContract,
        issuer: badgeWidthIssuer.issuer,
        description: isOriginsNFTBadge(badgeContract) ? badgeWidthIssuer.description : description,
        upgradable,
        thirdParty: badgeWidthIssuer.thirdParty,
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
      return "/canvas"
    }
    return `/canvas/${detail.walletAddress}`
  }, [walletCurrentAddress, detail])

  const handleUpgradeBadge = async () => {
    try {
      const preBadgeName = detail.name
      changeIsBadgeUpgrading(id, true)
      const metadata = await upgradeBadge(publicProvider, { id, badgeContract: detail.badgeContract })
      if (metadata) {
        const checkedBadge = await checkBadgeUpgradable(publicProvider, { id, badgeContract: detail.badgeContract })
        setDetail(pre => ({ ...pre, ...metadata, upgradable: checkedBadge.upgradable }))
        alertWarning(`You have successfully upgraded ${preBadgeName} to ${metadata.name}`, "success")
      }
    } catch (error) {
      alertWarning(error.message)
    } finally {
      changeIsBadgeUpgrading(id, false)
    }
  }

  return (
    <>
      <BadgeDetail
        detail={detail}
        loading={loading}
        property={["owner", "issuer", "mintedOn", isOriginsNFTBadge(detail.badgeContract) ? "rarity" : undefined]}
        breadcrumb={<BackToCanvas username={detail.owner} loading={loading} href={viewCanvasURL}></BackToCanvas>}
        onUpgrade={handleUpgradeBadge}
      >
        <ScrollButton color="primary" href={viewEASScanURL(id)} sx={{ gridColumn: ["span 2", "unset"] }} target="_blank">
          View on EAS
        </ScrollButton>

        {detail.thirdParty && detail.issuer?.name ? (
          <ScrollButton color="secondary" href={detail.issuer?.origin} target="_blank">
            Visit {detail.issuer?.name}
          </ScrollButton>
        ) : (
          <ScrollButton color="secondary" href="/canvas">
            Visit my canvas
          </ScrollButton>
        )}

        <Link external href={shareBadgeURL}>
          <SvgIcon sx={{ fontSize: "3.2rem", color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
        </Link>
      </BadgeDetail>
    </>
  )
}

export default Badge
