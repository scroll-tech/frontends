import { notFound } from "next/navigation"

import { getImgByCode } from "@/apis/canvas"
import { genMeta } from "@/utils/route"

import CanvasMint from "../../mint/page"

export const generateMetadata = genMeta(async ({ params }) => {
  const imgUrl = getImgByCode(params.code)
  const title = "Scroll Canvas - your unique space for onchain presence on Scroll"
  const description = "Use my referral code to save 50% on Scroll Canvas mint!"
  const relativeURL = `/canvas?code=${params.code}`

  return {
    title,
    description,
    relativeURL,
    ogImg: imgUrl,
    twitterImg: imgUrl,
  }
})

const CanvasInvite = () => {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return <CanvasMint></CanvasMint>
}

export default CanvasInvite
