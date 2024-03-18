import { Box, Container, Stack, Typography } from "@mui/material"

const StepWrapper = props => {
  const { sx, title, description, children, action } = props

  return (
    <Container sx={{ pt: ["2rem", "4rem", "9.6rem"], pb: ["8rem", "16rem"], display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography sx={{ fontSize: "4rem", lineHeight: "5.6rem", fontWeight: 600 }}>{title}</Typography>
      <Typography sx={{ fontSize: "2rem", lineHeight: "3.2rem" }}>{description}</Typography>
      <Box sx={sx}>{children}</Box>
      <Stack direction="row" gap="1.6rem">
        {action}
      </Stack>
    </Container>
  )
}
export default StepWrapper
