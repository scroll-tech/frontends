import { Divider, Stack, SvgIcon } from "@mui/material"

import { ReactComponent as StarSvg } from "@/assets/svgs/sticker-contest/star.svg"

const Title = props => {
  return (
    <Stack
      sx={{ width: "100%", gap: ["0.4rem", "1.6rem", "2.8rem", "3.6rem"], mt: ["3.6rem", "7.2rem"], mb: ["1.8rem", "4.8rem"] }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <SvgIcon sx={{ fontSize: ["2.4rem", "4rem"] }} component={StarSvg} inheritViewBox></SvgIcon>
      <Divider sx={{ flex: 1, borderStyle: "dashed", borderColor: "primary.contrastText" }}></Divider>
      <SvgIcon sx={{ width: "auto", height: ["4rem", "7.2rem"] }} component={props.content} inheritViewBox></SvgIcon>
      <Divider sx={{ flex: 1, borderStyle: "dashed", borderColor: "primary.contrastText" }}></Divider>
      <SvgIcon sx={{ fontSize: ["2.4rem", "4rem"] }} component={StarSvg} inheritViewBox></SvgIcon>
    </Stack>
  )
}

export default Title
