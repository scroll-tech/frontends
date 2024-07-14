import { Box, Container, Stack, Typography } from "@mui/material"

const StepWrapper = props => {
  const { sx, title, description, children, action } = props

  return (
    <Container
      sx={{
        pt: ["2.4rem", "5.5rem"],
        pb: ["9.6rem", "6rem"],
        display: "flex",
        flexDirection: "column",
        height: ["calc(100vh - 6.2rem)", "calc(100vh - 6.5rem)"],
        justifyContent: ["flex-start", "center"],
        overflowY: "auto",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], fontWeight: 600, mb: "0.8rem" }}>{title}</Typography>
      <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], textAlign: "center" }}>{description}</Typography>
      <Box sx={sx}>{children}</Box>
      <Stack
        direction="row"
        gap="1.6rem"
        sx={theme => ({
          [theme.breakpoints.down("sm")]: {
            position: "fixed",
            padding: "2.4rem 2rem",
            bottom: 0,
            width: "100%",
            "& > div": {
              width: "100%",
            },
          },
        })}
      >
        {action}
      </Stack>
    </Container>
  )
}
export default StepWrapper
