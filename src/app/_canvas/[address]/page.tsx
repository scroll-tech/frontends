import { Address, createPublicClient, http } from "viem"
import { scroll, scrollSepolia } from "viem/chains"

import CanvasProfileABI from "@/assets/abis/CanvasProfile.json"
import CanvasProfileRegistryABI from "@/assets/abis/CanvasProfileRegistry.json"
import { genMeta } from "@/utils/route"

import CanvasDashboard from "../Dashboard"

export const generateMetadata = genMeta(async ({ params }) => {
  const { address } = await params
  const publicClient = createPublicClient({
    chain: process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Mainnet" ? scroll : scrollSepolia,
    transport: http(),
  })

  const profileAddress = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_PROFILE_REGISTRY_ADDRESS as Address,
    abi: CanvasProfileRegistryABI,
    functionName: "getProfile",
    args: [address],
  })

  const canvasName = await publicClient.readContract({
    address: profileAddress as Address,
    abi: CanvasProfileABI,
    functionName: "username",
  })

  return {
    titleSuffix: `${canvasName}'s Canvas`,
    description: "Collect onchain badges and build your story on Scroll",
    relativeURL: `/canvas/${params.address}`,
    ogImg: `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/canvas/${params.address}.png`,
    twitterImg: `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/canvas/${params.address}.png`,
  }
})

const OthersCanvasPage = () => {
  return <CanvasDashboard></CanvasDashboard>
}

export default OthersCanvasPage
