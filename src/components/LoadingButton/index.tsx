import { makeStyles } from "tss-react/mui"

import { LoadingButton } from "@mui/lab"
import { CircularProgress, Stack } from "@mui/material"

const useStyles = makeStyles()(() => ({
  loadingIndicator: {
    width: "max-content",
  },
}))

const ScrollLoadingButton = props => {
  const { children, loadingText, ...restProps } = props
  const { classes } = useStyles()

  const renderLoadingText = () => {
    if (loadingText === null) {
      return null
    }
    if (loadingText) {
      return <span>{loadingText}</span>
    }
    return <span>{children}</span>
  }

  return (
    <LoadingButton
      classes={{ loadingIndicator: classes.loadingIndicator }}
      loadingIndicator={
        <Stack direction="row" spacing={1}>
          {renderLoadingText()}
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
