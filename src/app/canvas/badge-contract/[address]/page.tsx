import { headers } from "next/headers"

import BadgeContract from "./BadgeContract"

export async function generateMetadata({ params }): Promise<Metadata> {
  const { origin } = new URL(headers().get("x-url")!)

  const badgeForMint = { name: "CCC Badge" }

  const title = `Canvas Badge - ${badgeForMint.name}`
  const description = `I found a badge called ${badgeForMint.name} you may like`
  const imgUrl = `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/badge-contract/${params.address}.png`

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imgUrl],
    },
    twitter: {
      title,
      description,
      images: [imgUrl],
    },
  }
}

const BadgeContracPage = () => {
  return <BadgeContract></BadgeContract>
}

export default BadgeContracPage
