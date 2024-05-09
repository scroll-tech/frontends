import { Box, Container, Stack, Typography } from "@mui/material"

const StepWrapper = props => {
  const { sx, title, description, children, action } = props

  return (
    <Container
      sx={{
        pt: ["5.5rem"],
        pb: ["6rem"],
        display: "flex",
        flexDirection: "column",
        height: ["calc(100vh - 5.6rem)", "calc(100vh - 6.5rem)"],
        justifyContent: ["flex-start", "center"],
        overflowY: "auto",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600, mb: "0.8rem" }}>{title}</Typography>
      <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", textAlign: "center" }}>{description}</Typography>
      <Box sx={sx}>{children}</Box>
      <Stack direction="row" gap="1.6rem">
        {action}
      </Stack>
    </Container>
  )
}
export default StepWrapper
