import MuiLink from "@mui/material/Link"
import { styled } from "@mui/material/styles"

const StyledLink = styled(MuiLink)(({ theme }) => ({
  textDecorationColor: "unset",
}))

const Link = props => {
  const { external, underline = "none", ...restProps } = props
  return <StyledLink rel="noopener noreferrer" target={external ? "_blank" : ""} underline={underline} {...restProps} />
}
export default Link
