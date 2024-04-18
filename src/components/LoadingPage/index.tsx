import { Box, CircularProgress } from "@mui/material"

const LoadingPage = props => {
  const { height = "100vh", component, ...restProps } = props
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={height} {...restProps}>
      {component ? component : <CircularProgress color="primary" />}
    </Box>
  )
}

export default LoadingPage
