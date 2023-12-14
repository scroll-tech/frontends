import { Link } from "react-router-dom"

import { Stack, Typography } from "@mui/material"

const LinkText = props => {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography
        sx={{
          color: "#FFF8F3",
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
