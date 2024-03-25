import { Box, CircularProgress } from "@mui/material"

const LoadingPage = props => {
  const { height = "100dvh", ...restProps } = props
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={height} {...restProps}>
      <CircularProgress color="primary" />
    </Box>
  )
}

export default LoadingPage
