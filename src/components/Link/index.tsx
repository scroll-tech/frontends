import Link from "@mui/material/Link"

const ScrollLink = props => {
  const { external, underline = "none", sx, ...restProps } = props
  return (
    <Link
      sx={{ textDecorationColor: "unset", ...sx }}
      rel="noopener noreferrer"
      target={external ? "_blank" : ""}
      underline={underline}
      {...restProps}
    />
  )
}
export default ScrollLink
