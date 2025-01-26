// "use client"
import Badges from "./Badges"
import FeaturedBadges from "./FeaturedBadges"
import Header from "./Header"
import Introduction from "./Introduction"

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
