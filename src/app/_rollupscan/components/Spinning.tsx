import { Box, CircularProgress } from "@mui/material"

const Spinning = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 300 }}>
      <CircularProgress sx={{ color: "primary.main" }} />
    </Box>
  )
}

export default Spinning
