import { isMobile } from "react-device-detect"
import { Link } from "react-router-dom"

import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ArrowIcon } from "@/assets/svgs/footer/arrow.svg"

const LinkText = props => {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography
        sx={{
          color: "#FFF8F3",
          fontSize: ["1.6rem", "1.5rem"],
          lineHeight: ["4rem", "4.5rem"],
          cursor: "pointer",
          "&:hover": {
            color: theme => theme.palette.primary.dark,
          },
        }}
      >
        {props.children}
      </Typography>
      {isMobile && <SvgIcon component={ArrowIcon} inheritViewBox sx={{ fontSize: "0.6rem", verticalAlign: "middle" }}></SvgIcon>}
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
