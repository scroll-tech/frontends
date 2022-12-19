import * as React from "react"
import { styled } from "@mui/material/styles"
import Button, { ButtonProps } from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { purple } from "@mui/material/colors"

const CustomizedButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // color: "text-red",
  // backgroundColor: purple[500],
  // textTransform: "inherit",
  // fontSize: "16px",
  // lineHeight: "18px",
  // padding: "16px 28px",
  // boxShadow: "none",
  // whiteSpace: "nowrap",
  // "&:hover": {
  //   boxShadow: "6px 9px 0px 0px #FEE7E0",
  // },
}))

export default CustomizedButton
