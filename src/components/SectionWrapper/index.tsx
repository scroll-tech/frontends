import { Box, Container } from "@mui/material"

const SectionWrapper = props => {
  const { dark, round, children, sx, full, maxWidth = "100%", ...restProps } = props
  return (
    <Box
      sx={{
        backgroundColor: theme => (dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light),
        borderRadius: round ? "4rem 4rem 0 0 " : "unset",
      }}
      {...restProps}
    >
      <Container
        sx={{
          pt: ["8rem", "15.4rem"],
          maxWidth: full ? "unset !important" : `${maxWidth} !important`,
          borderRadius: round ? "4rem 4rem 0 0 " : "unset",
          ...sx,
        }}
      >
        {children}
      </Container>
    </Box>
  )
}

export default SectionWrapper
