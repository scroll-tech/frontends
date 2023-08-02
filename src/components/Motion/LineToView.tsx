import { motion } from "framer-motion"

const LineToView = props => {
  const { children, once = true } = props

  return (
    <motion.div
      style={{ transformOrigin: "0 0", transition: "transform .7s cubic-bezier(0.16, 1, 0.3, 1)" }}
      initial={{ transform: "scaleY(0)" }}
      whileInView={{ transform: "scaleY(1)" }}
      transition={{ delay: 0.5 }}
      viewport={{ once, amount: "all" }}
    >
      {children}
    </motion.div>
  )
}

export default LineToView
