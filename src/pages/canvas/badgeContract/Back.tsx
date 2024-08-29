import { useNavigate } from "react-router-dom"

import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as BackSvg } from "@/assets/svgs/canvas/back.svg"

const Back = props => {
  const { sx, ...restProps } = props
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
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
