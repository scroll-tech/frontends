import { Address, createPublicClient, http } from "viem"
import { scroll, scrollSepolia } from "viem/chains"

import CanvasBadgeABI from "@/assets/abis/CanvasBadge.json"
import CanvasProfileABI from "@/assets/abis/CanvasProfile.json"
import CanvasProfileRegistryABI from "@/assets/abis/CanvasProfileRegistry.json"
import { queryBadgeDetailById } from "@/services/canvasService"
import { decodeBadgePayload, ipfsToBrowserURL } from "@/utils"
import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(async ({ params }) => {
  const publicClient = createPublicClient({
    chain: process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Mainnet" ? scroll : scrollSepolia,
    transport: http(),
  })
  const { id } = await params

  const badges = await queryBadgeDetailById(id)

  const [{ recipient, data }] = badges
  const [badgeContract] = decodeBadgePayload(data)

  let badgeMetadataURI = await publicClient.readContract({
    address: badgeContract,
    abi: CanvasBadgeABI,
    functionName: "badgeTokenURI",
    args: [params.id],
  })
  badgeMetadataURI = ipfsToBrowserURL(badgeMetadataURI)
  const metadata = await fetch(badgeMetadataURI as string).then(res => res.json())

  const profileAddress = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_PROFILE_REGISTRY_ADDRESS as Address,
    abi: CanvasProfileRegistryABI,
    functionName: "getProfile",
    args: [recipient],
  })

  const canvasName = await publicClient.readContract({
    address: profileAddress as Address,
    abi: CanvasProfileABI,
    functionName: "username",
  })

  return {
    title: `Canvas Badge - ${metadata.name} Owned by ${canvasName}`,
    description: `I have minted the ${metadata.name}`,
    relativeURL: `/canvas/badge/${params.id}`,
    ogImg: `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/badge/${params.id}.png`,
    twitterImg: `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/badge/${params.id}.png`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
