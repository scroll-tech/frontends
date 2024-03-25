import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

import { getImgByCode } from "@/apis/canvas"
import { requireEnv } from "@/utils"

import CanvasMint from "../mint"

// TODO: if currentWallectAddress has minted Canvas then display Canvas profile
// else display input referral code page (the default unminted page)

const CanvasCoupon = () => {
  const { code } = useParams()
  const metaImgURI = useMemo(() => getImgByCode(code), [code])

  const title = `Scroll - Canvas Coupon #${code}`
  const description = `Hi, welcome to use my coupon #${code} to mint Canvas!`
  const url = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-canvas?code=${code}`

  return (
    <>
      <Helmet>
        <title>Scroll - Canvas Coupon</title>
        <meta name="description" content="Mint Scroll Canvas Now" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImgURI} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImgURI} />
        <meta name="twitter:url" content={url} />
      </Helmet>
      <CanvasMint code={code}></CanvasMint>
    </>
  )
}

export default CanvasCoupon
