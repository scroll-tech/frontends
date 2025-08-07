"use client"

// import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Container, Stack, Typography } from "@mui/material"

import SCRETHHero from "@/assets/svgs/defi/scr-eth-hero.svg?url"
import Button from "@/components/Button"

const Header = () => {
  const [height, setHeight] = useState("auto")

  useEffect(() => {
    function handleResize() {
      if (window.innerHeight - 65 > 858) {
        setHeight("calc(100vh - 6.5rem)")
      } else {
        setHeight("auto")
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // TODO:coming soon
  // const handleEventTracking = () => {
  //   sendGAEvent("event", "click_get_ethSCR", {
  //     label: "",
  //   })
  // }
  return (
    <Container
      sx={{
        pt: ["4.8rem", "4rem"],
        pb: "8rem",
        height: ["auto", "auto", height],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "4rem",
      }}
    >
      <Image src={SCRETHHero} alt="scr-eth" width="484" height="263" className="w-auto h-[16.3rem] sm:h-[26.3rem]"></Image>
      <Stack direction="row" justifyContent="center" sx={{ gap: ["1.6rem", "2rem"] }}>
        <Image src="/imgs/token/scrETH.svg" alt="scr" width="64" height="64" className="w-[4.8rem] sm:w-[6.4rem] aspect-square"></Image>
        <Typography sx={{ fontSize: ["4rem", "6.4rem"], lineHeight: ["4.8rem", "8.8rem"], fontWeight: 600 }}>scrETH</Typography>
      </Stack>
      <Typography
        sx={{
          fontSize: ["1.8rem", "2.4rem"],
          lineHeight: ["3.2rem", "4rem"],
          maxWidth: "50rem",
          textAlign: "center",
        }}
      >
        scrETH is Scroll's ecosystem native ETH LRT. Deposit ETH/WETH/ wstETH to obtain scrETH.
      </Typography>
      <Button className="!w-full sm:!w-[20.8rem]" color="default" gloomy>
        Coming soon
      </Button>
    </Container>
  )
}

export default Header
