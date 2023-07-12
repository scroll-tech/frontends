import { Link } from "react-router-dom"

import { Stack, SvgIcon, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"

import { ReactComponent as ArrowIcon } from "@/assets/svgs/footer/arrow.svg"

const LinkText = props => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.down("md"))
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography sx={{ color: "#FFF8F3", fontSize: "1.5rem", lineHeight: "4rem", cursor: "pointer" }}>{props.children}</Typography>
      {matches && <SvgIcon component={ArrowIcon} inheritViewBox sx={{ fontSize: "0.6rem", verticalAlign: "middle" }}></SvgIcon>}
    </Stack>
  )
}

const RelativeLink = props => {
  if (props.href) {
    return (
      <a href={props.href}>
        <LinkText>{props.name}</LinkText>
      </a>
    )
  }
  return (
    <Link to={props.to}>
      <LinkText>{props.name}</LinkText>
    </Link>
  )
}

export default RelativeLink
