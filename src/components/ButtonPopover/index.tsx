import { makeStyles } from "tss-react/mui"

import { Close } from "@mui/icons-material"
import { Backdrop, Card, ClickAwayListener, Popper, Stack, Typography } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  container: {
    width: "max-content",
    padding: "2.8rem",
    boxSizing: "border-box",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100vw - 3.2rem)",
      margin: "0 1.6rem",
      padding: "2rem",
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
      fontWeight: 600,
    },
  },
}))

const ButtonPopover = props => {
  const { open, anchorEl, title, children, onClose } = props
  const { classes } = useStyles()

  const handleClose = () => {
    onClose(true)
  }
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: theme => [theme.zIndex.appBar - 2, -1],
      }}
    >
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        sx={{ zIndex: theme => theme.zIndex.appBar - 1 }}
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 16],
              },
            },
            {
              name: "preventOverflow",
              options: {
                padding: 0,
              },
            },
          ],
        }}
      >
        <>
          <ClickAwayListener onClickAway={handleClose}>
            <Card className={classes.container}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" className={classes.title}>
                  {title}
                </Typography>
                <Close onClick={handleClose} />
              </Stack>
              {children}
            </Card>
          </ClickAwayListener>
        </>
      </Popper>
    </Backdrop>
  )
}

export default ButtonPopover
