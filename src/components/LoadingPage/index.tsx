import { Box, Typography, CircularProgress } from "@mui/material"

const LoadingPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress sx={{ color: "#EB7106" }} />
  </Box>
)

export default LoadingPage
