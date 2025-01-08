"use client"

import { Stack, Typography } from "@mui/material"

import { NORMAL_HEADER_HEIGHT } from "@/constants"
import { scrollPageToElement } from "@/utils"

import NumberIconsMap from "./NumberIcons"

const StepItem = props => {
  const { title, index } = props

  const handleClick = () => {
    const targetEl = document.getElementById(`builder-portal-${index}`)
    scrollPageToElement(targetEl, NORMAL_HEADER_HEIGHT)
  }

  const IconComponent = NumberIconsMap[index]

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing="1.6rem"
      role="button"
      sx={{
        p: "0.8rem 2.4rem",
        backgroundColor: "#FFFFFFCC",
        borderRadius: "1.6rem",
        width: "100%",
        "@media (hover: hover)": {
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
        },
      }}
      onClick={handleClick}
    >
      <Typography sx={{ fontSize: ["1.4rem", "1.8rem"], lineHeight: "2.8rem", flex: 1, cursor: "inherit" }}>{title}</Typography>
      <Typography sx={{ fontSize: ["1.4rem", "1.8rem"], lineHeight: "2.8rem", fontWeight: 500, cursor: "inherit" }}>Press</Typography>
      <IconComponent className="w-[2.8rem] sm:w-[3.2rem] h-auto" />
    </Stack>
  )
}

export default StepItem
