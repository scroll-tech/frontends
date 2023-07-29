import { Box, Container } from "@mui/material"

const SectionWrapper = props => {
  const { dark, children, sx, full, maxWidth = "100%", ...restProps } = props
  return (
    <Box sx={{ backgroundColor: theme => (dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light) }} {...restProps}>
      <Container
        sx={{ pt: "15.4rem", px: ["2rem!important", "6rem !important"], maxWidth: full ? "unset !important" : `${maxWidth} !important`, ...sx }}
      >
        {children}
      </Container>
    </Box>
  )
}

export default SectionWrapper
