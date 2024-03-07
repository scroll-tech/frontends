import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

import { getImgByCode } from "@/apis/skelly"

import SkellyInvite from "./Invite"

// TODO: if currentWallectAddress has minted Skelly then display Skelly profile
// else display input referral code page (the default unminted page)

const SkellyCoupon = () => {
  const { code } = useParams()
  const metaImgURI = useMemo(() => getImgByCode(code), [code])

  const title = `Scroll - Skelly Coupon #${code}`
  const description = `Hi, welcome to use my coupon #${code} to mint Skelly!`
  const url = `https://scroll-skelly.env.scroll.io/scroll-skelly?code=${code}`

  return (
    <>
      <Helmet>
        <title>Scroll - Skelly Coupon</title>
        <meta name="description" content="Mint Scroll Skelly Now" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImgURI} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImgURI} />
        <meta name="twitter:url" content={url} />
      </Helmet>
      <SkellyInvite code={code}></SkellyInvite>
    </>
  )
}

export default SkellyCoupon
