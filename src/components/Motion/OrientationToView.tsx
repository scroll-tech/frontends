import { motion } from "framer-motion"
import { isMobileOnly } from "react-device-detect"

const OrientationToView = props => {
  const { children, direction = "up", once = true, delay } = props
  const variants = {
    up: {
      hidden: {
        y: 50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
      },
    },
    down: {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
      },
    },
    left: {
      hidden: {
        x: 50,
        opacity: 0,
      },
      show: {
        x: 0,
        opacity: 1,
      },
    },
    right: {
      hidden: {
        x: -50,
        opacity: 0,
      },
      show: {
        x: 0,
        opacity: 1,
      },
    },
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={variants[direction]}
      viewport={{ once, amount: isMobileOnly ? 0.6 : "all" }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 1, delay }}
    >
      {children}
    </motion.div>
  )
}

export default OrientationToView
