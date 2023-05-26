import { Link } from "react-router-dom"

import { Stack, SvgIcon } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"

import { ReactComponent as ArrowIcon } from "@/assets/svgs/footer/arrow.svg"

const LinkText = props => {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.down("md"))
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <span>{props.children}</span>
      {matches && <SvgIcon component={ArrowIcon} inheritViewBox sx={{ fontSize: "0.6rem", verticalAlign: "middle" }}></SvgIcon>}
    </Stack>
  )
}

const RelativeLink = props => {
  if (props.href) {
    return (
      <a href={props.href} className="text-md text-body-title-80 leading-[34px] hover:text-[#EB7106] align-middle">
        <LinkText>{props.name}</LinkText>
      </a>
    )
  }
  return (
    <Link className="text-md text-body-title-80 leading-[34px] hover:text-[#EB7106]" to={props.to}>
      <LinkText>{props.name}</LinkText>
    </Link>
  )
}

export default RelativeLink
