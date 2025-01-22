"use client"

import Image from "next/image"
import { useRef } from "react"

import { Box, Container, Stack, Typography } from "@mui/material"

import WhySSCR from "@/assets/svgs/defi/why-sSCR.svg?url"
// import Button from "@/components/Button"
import ScrollExpandedBg from "@/components/ScrollExpandedBg"
import SectionHeader from "@/components/SectionHeader"

import data from "./data"

const Explaination = () => {
  const wrapperRef = useRef()

  return (
    <ScrollExpandedBg sx={{ pt: ["6rem", "9.6rem"], pb: ["8rem", "14rem"] }} anchorEl={wrapperRef} fastScrollIn>
      <Box ref={wrapperRef}>
        <Container>
          <SectionHeader
            dark
            sx={{ mb: ["3.2rem", "12rem"] }}
            maxWidth={["100%", "50%"]}
            title="Why sSCR"
            content="Unlock the potential of SCR whilst engaging with the Scroll ecosystem."
            // action={
            //   <Button className="!w-[19.5rem] sm:!w-[23rem]" href="/ecosystem" color="primary">
            //     Read more details
            //   </Button>
            // }
          ></SectionHeader>
          <Stack direction={["column-reverse", "column-reverse", "row"]} justifyContent="center" gap={["4.8rem", "14.2rem"]}>
            <Stack direction="row" sx={{ flex: 1, justifyContent: ["center", "center", "flex-end"], alignItems: "center" }}>
              <Image src={WhySSCR} alt="scr" width="355" height="355" className="w-[24.2rem] sm:w-[35.5rem] h-auto"></Image>
            </Stack>
            <Stack sx={{ width: ["100%", "100%", "50%"], gap: ["4.8rem", "6.4rem"], justifySelf: "right" }} direction="column">
              {data.map(({ icon: IconSvg, title, description }) => (
                <Stack key={title} direction="column" spacing="1.6rem">
                  <IconSvg></IconSvg>
                  <Typography sx={{ fontSize: ["1.8rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 600, color: "primary.contrastText" }}>
                    {title}
                  </Typography>
                  <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], color: "primary.contrastText" }}>
                    {description}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </ScrollExpandedBg>
  )
}

export default Explaination
