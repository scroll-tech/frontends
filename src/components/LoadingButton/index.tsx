import { makeStyles } from "tss-react/mui"

import { LoadingButton } from "@mui/lab"
import { CircularProgress, Stack } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  loadingIndicator: {
    color: theme.palette.primary.contrastText,
    width: "max-content",
  },
  loading: {
    color: "transparent !important",
  },
}))

const ScrollLoadingButton = props => {
  const { children, loadingText, sx, ...restProps } = props
  const { classes } = useStyles()

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
      classes={{ loadingIndicator: classes.loadingIndicator, loading: classes.loading }}
      sx={{
        "&.Mui-disabled": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          opacity: 0.4,
        },
        ...sx,
      }}
      loadingIndicator={
        <Stack direction="row" alignItems="center" spacing={1}>
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
