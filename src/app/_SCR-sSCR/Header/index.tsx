"use client"

import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { formatLargeNumber } from "@/utils"

import GetSCRDialog from "./GetSCRDialog"
import Statistic from "./Statistic"
import DATA from "./data"

const Header = props => {
  const { circulatingSupply, votableSupply } = props
  const [getSCROpen, setGetSCROpen] = useState(false)
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

  const actionList = [
    {
      id: "get-scr",
      values: [circulatingSupply, votableSupply],
      action: () => {
        setGetSCROpen(true)
        sendGAEvent("event", "click_get_SCR", {
          label: "Get SCR now",
        })
      },
    },
    {
      id: "stake-scr",
      action: () => {
        // TODO: coming soon
        // sendGAEvent("event", "click_stack_SCR", {
        //   label: "Stack SCR now",
        // })
      },
    },
  ]

  const handleCloseDialog = () => {
    setGetSCROpen(false)
  }

  return (
    <Container
      sx={{
        pt: "4rem",
        pb: ["4.8rem", "8rem"],
        height: ["auto", "auto", height],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack direction="row" justifyContent="center">
        <Image src="/imgs/token/scr.svg" alt="scr" width="64" height="64" className="w-[4.8rem] sm:w-[6.4rem] aspect-square"></Image>
        <Image
          src="/imgs/token/sSCR.svg"
          alt="scr"
          width="64"
          height="64"
          className="w-[4.8rem] sm:w-[6.4rem] aspect-square ml-[-0.6rem] sm:ml-[-1rem]"
        ></Image>
        <Typography sx={{ fontSize: ["4rem", "6.4rem"], lineHeight: ["4,8rem", "8.8rem"], fontWeight: 600, ml: ["1.6rem", "2rem"] }}>
          SCR & sSCR
        </Typography>
      </Stack>
      <Stack direction={["column", "column", "row"]} sx={{ mt: ["4rem", "5rem"], gap: ["1.6rem", "3.2rem"] }}>
        {DATA.map(item => (
          <Stack
            key={item.id}
            direction="column"
            alignItems="center"
            sx={{
              flex: 1,
              p: ["2.4rem", "4rem 2.4rem"],
              backgroundColor: "background.default",
              borderRadius: "2rem",
              gap: "1.6rem",
            }}
          >
            <Image src={item.imageURL} alt={item.title} width={516} height={408} className="w-auto h-[12rem] sm:h-[18rem]"></Image>
            <Typography sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], fontWeight: 600 }}>{item.title}</Typography>
            <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], textAlign: "center", flex: 1 }}>
              {item.description}
            </Typography>
            <Stack direction="row" justifyContent="center" sx={{ width: "100%", gap: ["0.8rem", "2.4rem"], mb: ["0.8rem", "2.4rem"] }}>
              {item.values.map(({ label, value }, index) => (
                <Statistic key={label} label={label}>
                  {value === null ? "--" : formatLargeNumber(actionList.find(action => action.id === item.id)!.values?.[index] ?? value)}
                </Statistic>
              ))}
            </Stack>
            <Button
              color={item.upcoming ? "default" : "primary"}
              className="!w-full sm:!w-[20.8rem]"
              gloomy={!!item.upcoming}
              onClick={actionList.find(action => action.id === item.id)!.action}
            >
              {item.actionLabel}
            </Button>
          </Stack>
        ))}
      </Stack>
      <GetSCRDialog open={getSCROpen} onClose={handleCloseDialog}></GetSCRDialog>
    </Container>
  )
}

export default Header
