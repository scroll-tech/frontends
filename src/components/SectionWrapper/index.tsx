import { Box, Container } from "@mui/material"

const SectionWrapper = props => {
  const { dark, children, sx, full, maxWidth = "130rem", ...restProps } = props
  return (
    <Box sx={{ backgroundColor: theme => (dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light) }} {...restProps}>
      <Container sx={{ pt: "15.4rem", maxWidth: full ? "unset !important" : `${maxWidth} !important`, ...sx }}>{children}</Container>
    </Box>
  )
}

export default SectionWrapper
