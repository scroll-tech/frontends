import Image from "next/image"

import { Box, Container, Stack, Typography } from "@mui/material"

import PhoneSvg from "@/assets/svgs/builder-portal/phone.svg?url"

import CONTENT_DATA from "../Content/data"
import StepItem from "./StepItem"

const BuilderPortalHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: "themeBackground.builder",
        position: "relative",
        height: ["120rem", "75rem", "auto"],
        aspectRatio: ["auto", "auto", "16 / 9"],
        marginTop: [0, 0, "-6.5rem"],
      }}
    >
      <Container
        sx={{
          height: "100%",
          pt: "6.5rem",
          // background: [`url(${PhoneSvg.src}) center right / 460px auto no-repeat`],
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "14%",
        }}
      >
        <Stack direction={["column"]} alignItems={["center", "center", "flex-start"]} sx={{ gap: ["1.6rem"], width: "46%" }}>
          <Typography
            sx={{
              fontSize: ["4rem", "6.4rem"],
              lineHeight: ["4.8rem", "7.8rem"],
              fontWeight: 600,
            }}
          >
            Welcome to<br></br>Builder Portal
          </Typography>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 500 }}>How can we help you?</Typography>
          {CONTENT_DATA.map(item => (
            <StepItem key={item.title} {...item} />
          ))}
        </Stack>
        <Image src={PhoneSvg} alt="PhoneSvg" width={100} height={100} className="w-[40%]"></Image>
      </Container>
    </Box>
  )
}

export default BuilderPortalHeader
