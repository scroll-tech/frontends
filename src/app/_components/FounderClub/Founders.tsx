"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Box, IconButton, Stack, Typography } from "@mui/material"

import MikeImage from "@/assets/images/home/Mike Silagadze.webp"
import RobertoImage from "@/assets/images/home/Roberto Machado.webp"
import TonyImage from "@/assets/images/home/Tony Olendo.webp"
import YiImage from "@/assets/images/home/Yi Sun.webp"
import LeftButton from "@/assets/svgs/landingpage/left-button.svg"
import Quota from "@/assets/svgs/landingpage/quota.svg"
import RightButton from "@/assets/svgs/landingpage/right-button.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const MotionBox = motion(Box)

const FOUNDER_LIST = [
  {
    name: "Roberto Machado",
    prototol: "Quill Finance",
    content:
      "We were able to launch Quill with first-mover advantage because of how easy Scroll makes things for builders. This is an ecosystem meant for those who want to create value, not extract it.",
    href: "https://www.quill.finance/",
    image: RobertoImage,
    bgColor: "#DCF2EF",
  },
  {
    name: "Mike Silagadze",
    prototol: "EtherFi",
    content: "Fast, cheap, ZK, good long term oriented team, good ecosystem - bet on teams that ship.",
    href: "https://www.ether.fi/",
    image: MikeImage,
    bgColor: "#FAFDD4",
  },
  {
    name: "Tony Olendo",
    prototol: "ViFi",
    content:
      "We are building on Scroll because it offers our users the strongest cryptographic guarantees. Scroll has built the most performant ZK L2 in the industry and offering this security to our users is a no brainer.",
    href: "https://www.virtualfinance.xyz/",
    image: TonyImage,
    bgColor: "#E5E2F7",
  },
  {
    name: "Yi Sun",
    prototol: "Axiom",
    content:
      "As we’ve been building Axiom, we’ve benefited tremendously from Scroll’s community-driven ethos in both open source code collaboration and ZK education.",
    href: "https://www.axiom.xyz/",
    image: YiImage,
    bgColor: "#FFF8F3",
  },
]

const Founders = () => {
  const { isDesktop } = useCheckViewport()

  const [current, setCurrent] = useState(0)

  const currentFounder = FOUNDER_LIST[current]

  const OFFSET = isDesktop ? 24 : 16

  const calc = index => {
    const predictedPosition = index - current + FOUNDER_LIST.length
    if (predictedPosition > 3) {
      return (predictedPosition % FOUNDER_LIST.length) * OFFSET * -1
    }
    return predictedPosition * OFFSET * -1
  }

  const handlePrev = () => {
    setCurrent((current - 1 + FOUNDER_LIST.length) % FOUNDER_LIST.length)
  }
  const handleNext = () => {
    setCurrent((current + 1) % FOUNDER_LIST.length)
  }

  return (
    <Stack
      direction={["column", "column", "column", "row"]}
      sx={{
        alignItems: ["center", "center", "center", "stretch"],
        minHeight: "100%",
        mb: ["4rem", "8rem"],
        gap: ["4rem", "6rem"],
      }}
    >
      <MotionBox sx={{ position: "relative", width: ["334px", "492px"], height: ["334px", "492px"], aspectRatio: "1/1" }}>
        {FOUNDER_LIST.map(({ name, image, bgColor }, index) => {
          return (
            <MotionBox
              key={index}
              initial={{ y: -index * OFFSET, x: -index * OFFSET }}
              animate={{ y: calc(index), x: calc(index) }}
              transition={{ type: "linear", duration: 0.6 }}
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                width: ["28.6rem", "42rem"],
                aspectRatio: "1/1",
                backgroundColor: bgColor,
                zIndex: OFFSET * FOUNDER_LIST.length + calc(index),
              }}
            >
              <Image src={image} alt={name} className="h-[85.7%] w-auto" />
            </MotionBox>
          )
        })}
      </MotionBox>
      <Stack direction="column" sx={{ gap: "2.4rem", pt: [0, "1.6rem"] }}>
        <Quota className="w-[4rem] sm:w-[6rem]"></Quota>
        <Typography sx={{ fontSize: ["2rem", "2.8rem"], lineHeight: ["3.6rem", "5.6rem"] }}>{currentFounder.content}</Typography>
        <Typography sx={{ fontSize: ["1.8rem", "2rem"], lineHeight: ["2.8rem", "3.6rem"], fontFamily: "var(--font-title)", flex: 1 }}>
          {currentFounder.name}, Co-founder of{" "}
          <a href={currentFounder.href} className="underline cursor-pointer whitespace-nowrap" target="_blank" rel="noreferrer">
            {currentFounder.prototol}
          </a>
        </Typography>
        <Stack direction="row" gap="2.4rem">
          <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handlePrev}>
            <LeftButton></LeftButton>
          </IconButton>
          <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleNext}>
            <RightButton></RightButton>
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Founders
