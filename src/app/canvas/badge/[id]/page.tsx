import { headers } from "next/headers"

import Badge from "./Badge"

export async function generateMetadata({ params }): Promise<Metadata> {
  const { origin } = new URL(headers().get("x-url")!)

  // TODO:
  const detail = { name: "Mock", owner: "Yvaine" }

  const title = `Canvas Badge - ${detail.name} Owned by ${detail.owner}`
  const description = `I have minted the ${detail.name}`
  const imgUrl = `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/badge/${params.id}.png`

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

const BadgePage = () => {
  return <Badge></Badge>
}

export default BadgePage
