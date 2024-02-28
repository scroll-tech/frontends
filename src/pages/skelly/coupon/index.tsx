import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

// import { Navigate } from "react-router-dom"
// import { Container, Stack } from "@mui/material"
// import Button from "@/components/Button"
import { requireEnv } from "@/utils"

import Landing from "../landing"

// TODO: if currentWallectAddress has minted Skelly then display Skelly profile
// else display input referral code page (the default unminted page)

const SkellyCoupon = () => {
  const { code } = useParams()
  const metaImgURI = useMemo(() => `${requireEnv("REACT_APP_SKELLY_URI")}/code/${code}.png`, [code])
  // const couponImgURI = useMemo(() => `https://svg-to-png-eta.vercel.app/api/skelly/ref-code?code=${code}&transparent=1`, [code])

  const title = `Scroll - Skelly Coupon #${code}`
  const description = `Hi, welcome to use my coupon #${code} to mint Skelly!`
  const url = `https://scroll-skelly.env.scroll.io/scroll-skelly?code=${code}`

  // TODO: should be placed in backend
  // const renderContent = () => {
  //   const userAgent = window.navigator.userAgent.toLowerCase()
  //   if (userAgent.includes("googlebot") || userAgent.includes("twitterbot") || userAgent.includes("slackbot")) {
  //     return (
  //       <Container>
  //         <Stack direction="column" alignItems="center">
  //           <img src={couponImgURI} alt="Coupon"></img>
  //         </Stack>
  //       </Container>
  //     )
  //   }
  //   return <Navigate to={`/scroll-skelly?code=${code}`}></Navigate>
  // }

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
      <Landing code={code}></Landing>
    </>
  )
}

export default SkellyCoupon
