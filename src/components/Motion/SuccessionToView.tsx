"use client"

import { motion } from "framer-motion"

import { Box } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const AnimatedBox = motion(Box)

const SuccessionToView = props => {
  const { children, threshold, animate, once = true, ...restProps } = props
  const { isPortrait } = useCheckViewport()

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
    <AnimatedBox
      initial="hidden"
      whileInView="show"
      animate={animate}
      variants={container}
      viewport={{ once, amount: threshold ?? (isPortrait ? 0 : 0.3) }}
      {...restProps}
    >
      {children}
    </AnimatedBox>
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
    <AnimatedBox variants={item} {...restProps}>
      {children}
    </AnimatedBox>
  )
}

export default SuccessionToView
export { SuccessionItem }
