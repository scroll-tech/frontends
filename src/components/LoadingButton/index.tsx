import { LoadingButton } from "@mui/lab"
import { CircularProgress, Stack } from "@mui/material"

const ScrollLoadingButton = props => {
  const { children, loadingText, ...restProps } = props

  const renderLoadingText = () => {
    if (loadingText === null) {
      return null
    }
    if (loadingText) {
      return loadingText
    }
    return children
  }

  return (
    <LoadingButton
      loadingIndicator={
        <Stack direction="row" spacing={2}>
          <span>{renderLoadingText()}</span>
          <CircularProgress color="inherit" size={18} thickness={4}></CircularProgress>
        </Stack>
      }
      {...restProps}
    >
      {children}
    </LoadingButton>
  )
}

export default ScrollLoadingButton
