import { Box, Container } from "@mui/material"

const SectionWrapper = props => {
  const { dark, transparent, round, children, sx, full, maxWidth = "152rem", className, ...restProps } = props
  return (
    <Box
      {...restProps}
      sx={{
        backgroundColor: theme => (transparent ? "transparent" : dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.light),
        borderRadius: round ? "4rem 4rem 0 0 " : "unset",
      }}
    >
      <Container
        sx={{
          pt: ["8rem", "10rem", "15.4rem"],
          maxWidth: full ? "unset !important" : `${maxWidth} !important`,
          borderRadius: round ? "4rem 4rem 0 0 " : "unset",
          ...sx,
        }}
        className={className}
      >
        {children}
      </Container>
    </Box>
  )
}

export default SectionWrapper
