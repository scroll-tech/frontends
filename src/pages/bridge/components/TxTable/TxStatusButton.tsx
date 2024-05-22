import dayjs from "dayjs"
import Countdown from "react-countdown"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, Chip, Tooltip } from "@mui/material"

import { TX_STATUS } from "@/constants"
import useTxStore from "@/stores/txStore"

import ActiveButton from "./ActiveButton"

const useStyles = makeStyles()(theme => {
  return {
    chip: {
      width: "15rem",
      height: "4rem",
      fontSize: "1.4rem",
      fontWeight: 600,
      borderRadius: "10rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ".MuiChip-label": {
        display: "flex",
        alignItems: "center",
      },
    },

    pendingChip: {
      color: "#8C591A",
      backgroundColor: "#FFF8F3",
    },
    successChip: {
      color: "#0F8E7E",
      backgroundColor: "#DFFCF8",
    },
    failedChip: {
      backgroundColor: "#FFE1DB",
      color: "#FF684B",
    },
    cancelledChip: {
      color: "#5B5B5B",
      background: "#EDEDED",
    },
    waitingClaimChip: {
      background: "#FFF8F3",
      color: "#8C591A",
    },
    claimButton: {
      borderRadius: "0.5rem",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    pagination: {
      ".MuiPaginationItem-text": {
        fontSize: "1.6rem",
      },
      ".MuiPaginationItem-root": {
        color: theme.palette.text.primary,
      },
      ".MuiPaginationItem-root.Mui-selected": {
        fontWeight: 700,
        backgroundColor: "unset",
      },
      ".MuiSvgIcon-root": {
        fontSize: "2.4rem",
      },
    },
  }
})

const TxStatus = props => {
  const { tx } = props
  const { classes, cx } = useStyles()
  const { estimatedTimeMap } = useTxStore()

  const renderEstimatedWaitingTime = timestamp => {
    if (timestamp) {
      return <Countdown date={timestamp} renderer={renderCountDown}></Countdown>
    }
    return <>Pending</>
  }

  const renderCountDown = ({ total, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <>Pending</>
    }
    return (
      <>
        {tx.isL1 ? "Ready" : "Claimable"} in ~{minutes ? `${minutes}m` : `${seconds}s`}
      </>
    )
  }

  if (tx.txStatus === TX_STATUS.Sent || tx.txStatus === TX_STATUS.BatchDepositSent) {
    if (tx.claimInfo?.claimable) {
      return <ActiveButton type="Claim" tx={tx} />
    } else if (tx.isL1) {
      return <Chip label={renderEstimatedWaitingTime(estimatedTimeMap[`from_${tx.hash}`])} className={cx(classes.chip, classes.pendingChip)}></Chip>
    } else {
      return (
        <Tooltip
          placement="top"
          title="Scroll provers are still finalizing your transaction, this can take up to 1 hour. Once done, you'll be able to claim it here for use on the target network."
        >
          <ButtonBase className={cx(classes.chip, classes.waitingClaimChip)}>
            {renderEstimatedWaitingTime(tx.initiatedAt ? dayjs.unix(tx.initiatedAt).add(1, "h").valueOf() : null)}
          </ButtonBase>
        </Tooltip>
      )
    }
  }

  if ([TX_STATUS.Dropped, TX_STATUS.SentFailed, TX_STATUS.Skipped, TX_STATUS.BatchDepositFailed].includes(tx.txStatus)) {
    return (
      <Tooltip placement="top" title="Please click on the transaction hash to view the error reason.">
        <Chip
          className={cx(classes.chip, classes.failedChip)}
          label={
            <>
              <span>Failed</span>
            </>
          }
        ></Chip>
      </Tooltip>
    )
  }

  if (tx.txStatus === TX_STATUS.Relayed || tx.txStatus === TX_STATUS.BatchDepositRelayed) {
    return <Chip className={cx(classes.chip, classes.successChip)} label="Success"></Chip>
  }

  if (tx.txStatus === TX_STATUS.RelayedReverted || tx.txStatus === TX_STATUS.FailedRelayed) {
    return <ActiveButton type="Retry" tx={tx} />
  }

  return <Chip label="Pending" className={cx(classes.chip, classes.pendingChip)}></Chip>
}

export default TxStatus
