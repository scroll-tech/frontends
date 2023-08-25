import { Box, Container } from "@mui/material"

const SectionWrapper = props => {
  const { dark, round, children, sx, full, maxWidth = "152rem", ...restProps } = props
  return (
    <Box
      {...restProps}
      sx={{
        backgroundColor: theme => (dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light),
        borderRadius: round ? "4rem 4rem 0 0 " : "unset",
      }}
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
