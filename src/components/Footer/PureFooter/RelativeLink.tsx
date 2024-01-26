import Link from "next/link"

import { Typography } from "@mui/material"

const LinkText = props => {
  return (
    <Typography
      sx={{
        color: theme => theme.palette.primary.contrastText,
        fontSize: ["1.6rem", "1.5rem"],
        lineHeight: "normal",
        marginBottom: ["3rem"],
        cursor: "pointer",
        "&:hover": {
          color: theme => theme.palette.primary.dark,
        },
      }}
    >
      {props.children}
    </Typography>
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
    <Link href={props.to}>
      <LinkText>{props.name}</LinkText>
    </Link>
  )
}

export default RelativeLink
