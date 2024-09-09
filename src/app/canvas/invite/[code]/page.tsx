import { headers } from "next/headers"

import { getImgByCode } from "@/apis/canvas"

import CanvasMint from "../../mint/page"

// if currentWallectAddress has minted Canvas then display Canvas profile
// else display input referral code page (the default unminted page)

export async function generateMetadata({ params }): Promise<Metadata> {
  const { origin } = new URL(headers().get("x-url")!)

  const imgUrl = getImgByCode(params.code)

  const title = "Scroll - Canvas Invite"
  const ogTitle = "Scroll Canvas - your unique space for onchain presence on Scroll"
  const description = "Use my referral code to save 50% on Scroll Canvas mint!"
  const url = `${process.env.NEXT_PUBLIC_FFRONTENDS_URL}/canvas?code=${code}`

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title: ogTitle,
      description,
      url,
      images: [imgUrl],
    },
    twitter: {
      title: ogTitle,
      description,
      images: [imgUrl],
    },
  }
}

const CanvasInvite = () => {
  return <CanvasMint></CanvasMint>
}

export default CanvasInvite
