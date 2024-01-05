import { Box, CircularProgress } from "@mui/material"

const LoadingPage = props => {
  const { height = "100vh", ...restProps } = props
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={height} {...restProps}>
      <CircularProgress color="primary" />
    </Box>
  )
}

export default LoadingPage
