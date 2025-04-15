import { Box, Typography } from "@mui/material"

const UserMessage = props => {
  const { children } = props
  return (
    <Box sx={{ textAlign: "right", mb: "1.6rem" }}>
      <Typography
        sx={{
          fontSize: "1.6rem",
          lineHeight: "2.4rem",
          maxWidth: "80%",
          borderRadius: "2rem",
          p: "0.8rem 1.6rem",
          bgcolor: "#1010100D",
          display: "inline-block",
          textAlign: "left",
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export default UserMessage
