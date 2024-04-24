import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import Img from "react-cool-img"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"
import { getBadgeImgURL } from "@/utils"

const FirstBadgeMask = props => {
  const { badgeWidth } = props

  const { provider } = useRainbowContext()
  const firstBadgeRef = useRef()
  const { firstBadgeWithPosition, changeBadgeAnimationVisible, addFirstBadge, queryFirstMintUsername, attachedBadges } = useCanvasStore()
  // console.log(firstBadgeWithPosition, "firstBadgeWithPosition")
  // const initialLeft = window.innerWidth / 2 - (badgeWidth * 0.7) / 2
  // const initialTop = (window.innerHeight - 65) / 2 + 65 - (badgeWidth * 0.7) / 2
  const left = window.innerWidth / 2 - badgeWidth + badgeWidth * 0.15
  const top = (window.innerHeight - 65) / 2 + 65 - 2 * badgeWidth + badgeWidth * 0.15

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
        width: [200, badgeWidth * 0.7],
      }}
      transition={{ delay: 1, duration: 1, type: "spring", stiffness: 40 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        position: "fixed",
        // left: initialLeft, // window
        // top: initialTop,
        // width: 200,
      }}
    >
      <Img
        style={{
          aspectRatio: "1/1",
          borderRadius: "0.8rem",
        }}
        ref={firstBadgeRef}
        src={getBadgeImgURL(firstBadgeWithPosition.image)}
        placeholder="/imgs/canvas/badgePlaceholder.svg"
        alt="Ethereum Year Badge"
      ></Img>
    </motion.div>
  )
}

export default FirstBadgeMask
