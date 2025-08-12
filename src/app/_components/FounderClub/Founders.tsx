"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

import { Box, IconButton, Stack, Typography } from "@mui/material"

import JYImage from "@/assets/images/home/JY.webp"
import JasonImage from "@/assets/images/home/Jason.webp"
import MikeImage from "@/assets/images/home/Mike Silagadze.webp"
import PeterMainaImage from "@/assets/images/home/Peter.webp"
import RobertoImage from "@/assets/images/home/Roberto Machado.webp"
import TomasDIMaurovImage from "@/assets/images/home/Tomas.webp"
import TonyImage from "@/assets/images/home/Tony Olendo.webp"
import YudhishthraImage from "@/assets/images/home/Yudhishthra.webp"
import LeftButton from "@/assets/svgs/landingpage/left-button.svg"
import Quota from "@/assets/svgs/landingpage/quota.svg"
import RightButton from "@/assets/svgs/landingpage/right-button.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const MotionBox = motion(Box)

const FOUNDER_LIST = [
  {
    name: "Tony Olendo",
    title: "Co-Founder",
    prototol: "ViFi",
    content:
      "We are building on Scroll because it offers our users the strongest cryptographic guarantees. Scroll has built the most performant ZK L2 in the industry and offering this security to our users is a no brainer.",
    href: "https://www.virtualfinance.xyz/",
    image: TonyImage,
    bgColor: "#E5E2F7",
  },
  {
    name: "Roberto Machado",
    title: "Co-Founder",
    prototol: "Quill Finance",
    content:
      "We were able to launch Quill with first-mover advantage because of how easy Scroll makes things for builders. This is an ecosystem meant for those who want to create value, not extract it.",
    href: "https://www.quill.finance/",
    image: RobertoImage,
    bgColor: "#DCF2EF",
  },
  {
    name: "Tomas DI Maurov",
    title: "Founder",
    prototol: "ChatterPay",
    content:
      "Scroll helped us take ChatterPay from a hackathon project to mainnet, with low-cost transfers and key support from all the team that boosted our launch, distribution, and content.",

    href: "https://chatterpay.net/",
    image: TomasDIMaurovImage,
    bgColor: "#FFF8F3",
  },
  {
    name: "Yudhishthra",
    title: "Founder",
    prototol: "SynthOS",
    content:
      "Scroll is building the stablecoin stack for yield, utility, and access. SynthOS plugs into it by routing idle stablecoins to earn in the background, then settling instantly when needed.",

    href: "https://www.synthos.fun/",
    image: YudhishthraImage,
    bgColor: "#FAFDD4",
  },
  {
    name: "Peter Maina",
    title: "Founder",
    prototol: "Project Mocha",
    content:
      "Project Mocha is building on Scroll’s zkEVM Layer 2 because it gives us the scalability and low fees we need to empower coffee farmers . With Scroll’s fast, secure, and cost-effective infrastructure, we can focus on real impact—helping communities grow while providing global users a frictionless Web3 experience.",
    href: "https://projectmocha.com/",
    image: PeterMainaImage,
    bgColor: "#E5E2F7",
  },
  {
    name: "JY",
    title: "Founder",
    prototol: "Polystream",
    content: "Building on Scroll is a no-brainer:  cheap, secure, and most importantly, dev-friendly. Love the people too!",
    href: "https://www.polystream.xyz/",
    image: JYImage,
    bgColor: "#DCF2EF",
  },
  {
    name: "Sir Honeyworth B. Goldwing",
    title: "Chief Nectar Officer",
    prototol: "Honeypop",
    content:
      "Born in the lush Golden Hive of Scroll Valley, Honeyworth inherited his family’s centuries-old tradition of collecting the finest nectar from the richest flowers. When he discovered DeFi, he realized there was sweeter gold than honey. Now, he uses his knowledge of liquidity flows to guide others to prosperous harvests on Honeypop.",
    href: "https://honeypop.app/",
    image: JasonImage,
    bgColor: "#FAFDD4",
  },
  {
    name: "Mike Silagadze",
    title: "Co-founder",
    prototol: "EtherFi",
    content: "Fast, cheap, ZK, good long term oriented team, good ecosystem - bet on teams that ship.",
    href: "https://www.ether.fi/",
    image: MikeImage,
    bgColor: "#FFF8F3",
  },
]

const Founders = () => {
  const { isDesktop } = useCheckViewport()

  const [current, setCurrent] = useState(0)

  const currentFounder = FOUNDER_LIST[current]

  const cardOffset = useMemo(() => (isDesktop ? 24 : 16), [isDesktop])

  const cardSize = useMemo(() => (isDesktop ? 420 : 286), [isDesktop])

  const cardGroupHeight = cardSize + cardOffset * FOUNDER_LIST.length

  useEffect(() => {
    const interval = setTimeout(() => {
      handleNext()
    }, 5e3)
    return () => clearTimeout(interval)
  }, [current])

  const calc = index => {
    const predictedPosition = index - current + FOUNDER_LIST.length
    if (predictedPosition > FOUNDER_LIST.length - 1) {
      return (predictedPosition % FOUNDER_LIST.length) * cardOffset * -1
    }
    return predictedPosition * cardOffset * -1
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
      <MotionBox sx={{ position: "relative", width: cardGroupHeight, height: cardGroupHeight, aspectRatio: "1/1" }}>
        {FOUNDER_LIST.map(({ name, image, bgColor }, index) => {
          return (
            <MotionBox
              key={index}
              initial={{ y: -index * cardOffset, x: -index * cardOffset }}
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
                zIndex: cardOffset * FOUNDER_LIST.length + calc(index),
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
          {currentFounder.name}, {currentFounder.title} of{" "}
          <a href={currentFounder.href} className="underline cursor-pointer whitespace-nowrap" target="_blank" rel="noreferrer">
            {currentFounder.prototol}
          </a>
        </Typography>
        <Stack direction="row" gap="2.4rem">
          <IconButton aria-label="prev" sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handlePrev}>
            <LeftButton></LeftButton>
          </IconButton>
          <IconButton aria-label="next" sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleNext}>
            <RightButton></RightButton>
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Founders
