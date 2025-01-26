import { makeStyles } from "tss-react/mui"

import { Button, CircularProgress, Stack } from "@mui/material"
import { lighten } from "@mui/material/styles"

const useStyles = makeStyles()(theme => ({
  loadingIndicator: {
    color: theme.vars.palette.primary.contrastText,
    width: "max-content",
  },
  root: {
    width: "15rem",
    height: "4.4rem",
    fontSize: "1.6rem",
    fontWeight: 600,
    borderRadius: "0.5rem",
  },
  containedPrimary: {
    "&:hover": {
      backgroundColor: lighten("#FF684B", 0.1),
    },
  },
  loading: {
    backgroundColor: lighten("#FF684B", 0.1) + " !important",
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
      return loadingText
    }
    return children
  }

  return (
    <Button
      variant="contained"
      classes={{ root: classes.root, loading: classes.loading, loadingIndicator: classes.loadingIndicator }}
      loadingIndicator={
        <Stack direction="row" alignItems="center" spacing={1}>
          <span>{renderLoadingText()}</span>
          <CircularProgress color="inherit" size={18} thickness={4}></CircularProgress>
        </Stack>
      }
      {...restProps}
    >
      {children}
    </Button>
  )
}

export default ScrollLoadingButton
