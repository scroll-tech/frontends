import { InputBase, Stack, SvgIcon } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { ReactComponent as SearchSvg } from "@/assets/svgs/ecosystem/search.svg"

const SearchInput = props => {
  const { sticky, top, ...restProps } = props
  const theme = useTheme()

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="1rem"
      sx={{
        [theme.breakpoints.up("md")]: {
          position: sticky ? "sticky" : "static",
          top,
          zIndex: 1,
        },

        maxWidth: "32rem",
        height: "4.8rem",
        borderRadius: "2.4rem",
        border: theme => `1px solid ${theme.palette.text.primary}`,
        backgroundColor: theme => theme.palette.background.default,
        padding: "0.8rem 2.4rem",
        [theme.breakpoints.down("md")]: {
          gridRow: "2 / 3",
        },
        [theme.breakpoints.down("sm")]: {
          padding: "0.8rem 1.6rem",
        },
      }}
    >
      <SvgIcon sx={{ fontSize: "2rem" }} component={SearchSvg} inheritViewBox></SvgIcon>
      <InputBase
        sx={{
          flex: 1,
          fontSize: ["1.6rem", "1.8rem"],
          lineHeight: ["2.4rem", "2.8rem"],
          fontWeight: 500,
        }}
        placeholder="Search"
        {...restProps}
      ></InputBase>
    </Stack>
  )
}
export default SearchInput
