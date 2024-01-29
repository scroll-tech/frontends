import { Divider, Stack, SvgIcon } from "@mui/material"

import { ReactComponent as FinalistsSvg } from "@/assets/svgs/sticker-contest/finalists.svg"
import { ReactComponent as StarSvg } from "@/assets/svgs/sticker-contest/star.svg"

const Title = () => {
  return (
    <Stack
      sx={{ width: "100%", gap: ["0.4rem", "3.6rem"], mb: ["3.6rem", "4.8rem"] }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <SvgIcon sx={{ fontSize: ["2.4rem", "4rem"] }} component={StarSvg} inheritViewBox></SvgIcon>
      <Divider sx={{ flex: 1, borderStyle: "dashed", borderColor: "primary.contrastText" }}></Divider>
      <SvgIcon sx={{ width: ["20rem", "36.7rem"], height: "auto" }} component={FinalistsSvg} inheritViewBox></SvgIcon>
      <Divider sx={{ flex: 1, borderStyle: "dashed", borderColor: "primary.contrastText" }}></Divider>

      <SvgIcon sx={{ fontSize: ["2.4rem", "4rem"] }} component={StarSvg} inheritViewBox></SvgIcon>
    </Stack>
  )
}

export default Title
