import { motion } from "framer-motion"

const LineToView = props => {
  const { children, once = true } = props

  return (
    <motion.div
      style={{ transformOrigin: "0 0" }}
      initial={{ transform: "scaleY(0)" }}
      whileInView={{ transform: "scaleY(1)" }}
      transition={{ delay: 0.5 }}
      viewport={{ once, amount: 1 }}
    >
      {children}
    </motion.div>
  )
}

export default LineToView
