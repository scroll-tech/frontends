import { motion } from "framer-motion"
import { useEffect } from "react"
import Img from "react-cool-img"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useCanvasStore from "@/stores/canvasStore"

const FirstBadgeMask = props => {
  const { badgeWidth } = props
  const { isMobile, isPortrait } = useCheckViewport()

  const { provider } = useRainbowContext()
  const { firstBadgeWithPosition, changeBadgeAnimationVisible, addFirstBadge, queryFirstMintUsername, attachedBadges } = useCanvasStore()
  const headerHeight = isPortrait ? 0 : 65
  const left = window.innerWidth / 2 - badgeWidth + badgeWidth * 0.15
  const top = (window.innerHeight - headerHeight) / 2 + headerHeight - 2 * badgeWidth + badgeWidth * 0.15

  useEffect(() => {
    if (attachedBadges.includes(firstBadgeWithPosition.id)) {
      setTimeout(() => {
        changeBadgeAnimationVisible(false)
      }, 1000)
    }
  }, [attachedBadges])

  const handleAnimationComplete = async () => {
    addFirstBadge(provider, firstBadgeWithPosition.id, firstBadgeWithPosition.image, firstBadgeWithPosition.badgeContract)
    const signer = await provider!.getSigner(0)
    queryFirstMintUsername(signer)
  }
  return (
    <motion.div
      layout
      animate={{
        left: [firstBadgeWithPosition.left, left],
        top: [firstBadgeWithPosition.top, top],
        width: [isMobile ? 120 : 200, badgeWidth * 0.7],
      }}
      transition={{ delay: 1, duration: 1, type: "spring", stiffness: 40 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        position: "fixed",
        aspectRatio: "1/1",
      }}
    >
      <Img
        style={{
          borderRadius: "0.8rem",
        }}
        src={firstBadgeWithPosition.image}
        alt="Ethereum Year"
      ></Img>
    </motion.div>
  )
}

export default FirstBadgeMask
