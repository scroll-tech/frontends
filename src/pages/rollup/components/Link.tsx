import { Link as MuiLink } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const Link = props => {
  const { external, underline = "none", ...restProps } = props
  if (external) {
    return <MuiLink rel="noopener noreferrer" target={external ? "_blank" : ""} underline={underline} {...restProps} />
  }
  return <RouterLink>{...restProps}</RouterLink>
}

export default Link
