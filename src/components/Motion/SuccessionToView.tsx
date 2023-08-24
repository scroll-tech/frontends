import { motion } from "framer-motion"
import { isMobileOnly } from "react-device-detect"

const SuccessionToView = props => {
  const { children, threshold, animate, once = true, ...restProps } = props

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      animate={animate}
      variants={container}
      viewport={{ once, amount: threshold ?? (isMobileOnly ? 0 : 0.8) }}
      {...restProps}
    >
      {children}
    </motion.div>
  )
}

const SuccessionItem = props => {
  const { children, offset, ...restProps } = props

  const item = {
    hidden: { y: 100, opacity: 0, rotateY: offset === "right" ? "30deg" : "0deg" },
    show: {
      y: 0,
      opacity: 1,
      rotateY: "0deg",
      transition: {
        stiffness: 1000,
        velocity: -100,
      },
    },
  }

  return (
    <motion.div variants={item} {...restProps}>
      {children}
    </motion.div>
  )
}

export default SuccessionToView
export { SuccessionItem }
