import { useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Chip } from "@mui/material"

import { TxStatus } from "@/constants"

const useStyles = makeStyles()(theme => {
  return {
    chip: {
      width: "12.6rem",
      height: "3.8rem",
      fontSize: "1.6rem",
      fontWeight: 500,
      ".MuiChip-label": {
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
  const { status, children } = props
  const { cx, classes } = useStyles()

  const chipStatusClass = useMemo(() => {
    if (status === TxStatus.pending) {
      return classes.pendingChip
    } else if (status === TxStatus.success) {
      return classes.successChip
    } else if (status === TxStatus.failed) {
      return classes.failedChip
    } else if (status === TxStatus.canceled) {
      return classes.canceledChip
    } else if (status === TxStatus.empty) {
      return classes.emptyChip
    }
    return null
  }, [status])

  return <Chip label={children} className={cx(classes.chip, chipStatusClass)} />
}

export default StatusChip
