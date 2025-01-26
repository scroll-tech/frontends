import { fetchBadgeByAddrURL } from "@/apis/canvas-badge"
import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(async ({ params }) => {
  const { address } = await params
  const badge = await fetch(fetchBadgeByAddrURL(address)).then(res => res.json())
  return {
    title: `Canvas Badge - ${badge.name}`,
    description: `I found a badge called ${badge.name} you may like`,
    relativeURL: `/canvas/badge-contract/${address}`,
    ogImg: `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/badge-contract/${address}.png`,
    twitterImg: `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/badge-contract/${address}.png`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
