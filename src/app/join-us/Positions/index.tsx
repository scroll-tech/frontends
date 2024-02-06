"use client"

import Image from "next/image"

import { Box, Typography } from "@mui/material"

// import BackgroundSvg from "@/assets/svgs/career/join-us.svg"
import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"
import useCheckViewport from "@/hooks/useCheckViewport"

const Positions = () => {
  const { isMobile } = useCheckViewport()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "12rem",
        borderRadius: "40px 40px 0px 0px",
        background: "#FFF0DD",
        pb: {
          xs: "4rem",
          sm: "12rem",
        },
      }}
    >
      <Image
        alt="background"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        src={isMobile ? "/imgs/career/join-us-m.png" : "/imgs/career/join-us.png"}
      />
      <FadeInUp>
        <Typography
          sx={{
            fontWeight: 500,
            textAlign: "center",
            mb: {
              sx: "2.8rem",
              sm: "3.2rem",
              md: "4.8rem",
            },
            fontSize: {
              xs: "3.2rem",
              sm: "4rem",
            },
            padding: {
              xs: "0 2rem",
              md: 0,
            },
            mt: {
              xs: "4rem",
              sm: "12rem",
            },
          }}
        >
          Join Scroll and contribute in
          <br />
          building the best L2 product in the web3 world.
        </Typography>
      </FadeInUp>
      <Button href="https://jobs.lever.co/ScrollFoundation" target="_blank" color="primary" width={isMobile ? "21rem" : "25rem"}>
        View open positions
      </Button>
    </Box>
  )
}

export default Positions
