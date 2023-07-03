import { useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Chip } from "@mui/material"

import { TX_STATUS } from "@/constants"

const useStyles = makeStyles()(theme => {
  return {
    chip: {
      width: "12.6rem",
      height: "3.8rem",
      fontSize: "1.6rem",
      fontWeight: 500,
      ".MuiChip-label": {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    pendingChip: {
      color: theme.palette.tagWarning.main,
      backgroundColor: theme.palette.tagWarning.light,
    },
    successChip: {
      color: theme.palette.tagSuccess.main,
      backgroundColor: theme.palette.tagSuccess.light,
    },
    failedChip: {
      color: theme.palette.tagUnknown.main,
      backgroundColor: theme.palette.tagUnknown.light,
    },
    canceledChip: {
      color: theme.palette.tagSkipped.main,
      backgroundColor: theme.palette.tagSkipped.light,
    },
    emptyChip: {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.scaleBackground.disabled,
    },
  }
})

const StatusChip = props => {
  const { status, children, ...restProps } = props
  const { cx, classes } = useStyles()

  const chipStatusClass = useMemo(() => {
    if (status === TX_STATUS.pending) {
      return classes.pendingChip
    } else if (status === TX_STATUS.success) {
      return classes.successChip
    } else if (status === TX_STATUS.failed) {
      return classes.failedChip
    } else if (status === TX_STATUS.canceled) {
      return classes.canceledChip
    } else if (status === TX_STATUS.empty) {
      return classes.emptyChip
    }
    return null
  }, [status])

  return <Chip label={children} className={cx(classes.chip, chipStatusClass)} {...restProps} />
}

export default StatusChip
