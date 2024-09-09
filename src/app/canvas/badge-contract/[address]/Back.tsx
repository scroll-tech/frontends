import { useRouter } from "next/navigation"

import { Stack, SvgIcon, Typography } from "@mui/material"

import BackSvg from "@/assets/svgs/canvas/back.svg"

const Back = props => {
  const { sx, ...restProps } = props
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }
  return (
    <Stack
      onClick={handleGoBack}
      direction="row"
      gap="0.8rem"
      sx={{ cursor: "pointer", "& *": { cursor: "pointer !important" }, ...sx }}
      {...restProps}
    >
      <SvgIcon component={BackSvg} inheritViewBox></SvgIcon>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 600 }}>Back</Typography>
    </Stack>
  )
}
export default Back
