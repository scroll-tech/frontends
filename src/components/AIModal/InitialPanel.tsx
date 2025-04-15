import Image from "next/image"

import { Stack, Typography } from "@mui/material"

import ScrollyCool from "@/assets/images/common/scrolly-cool.png"
import EnterSvg from "@/assets/svgs/header/enter.svg"

const LIST = [
  "this could be a general question",
  "this could be a very long long long long long",
  "this could be a very long long long long long long long long long long long long long question",
]

const InitialPanel = () => {
  return (
    <Stack direction="column" sx={{ alignItems: "center", p: "0 2.4rem", flex: 1, overflowY: "auto" }}>
      <Image src={ScrollyCool} alt="Scrolly" className="w-[72px] h-[72px]"></Image>
      <Typography sx={{ fontSize: "2rem", fontWeight: 500, lineHeight: "2.4rem", my: "3.2rem" }}>Welcome, Scroll AI is here to help!</Typography>
      {LIST.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            p: "0.8rem 1.6rem",
            bgcolor: "#1010100D",
            borderRadius: "4.4rem",
            mb: "1.6rem",
          }}
        >
          <EnterSvg></EnterSvg>
          <Typography sx={{ fontSize: "1.6rem", lineHeight: "2.4rem", flex: 1 }}>{item}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export default InitialPanel
