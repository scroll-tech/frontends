// "use client"
import dynamic from "next/dynamic"

import Badges from "./Badges"
import FeaturedBadges from "./FeaturedBadges"
// import Header from "./Header"
import Introduction from "./Introduction"

const Header = dynamic(() => import("./Header"), { ssr: false })

const CanvasBadge = () => {
  return (
    <>
      <Header></Header>
      <Introduction></Introduction>
      <FeaturedBadges></FeaturedBadges>
      <Badges></Badges>
    </>
  )
}

export default CanvasBadge
