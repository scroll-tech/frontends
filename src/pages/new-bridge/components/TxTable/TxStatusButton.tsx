import dayjs from "dayjs"
import Countdown from "react-countdown"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, Chip, SvgIcon, Tooltip } from "@mui/material"

import { ReactComponent as InfoSvg } from "@/assets/svgs/refactor/bridge-info.svg"
import { TX_STATUS } from "@/constants"
import useBridgeStore from "@/stores/bridgeStore"
import useClaimStore from "@/stores/claimStore"
import useTxStore from "@/stores/txStore"

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
    canceledChip: {
      color: "#FFF8F3",
      background: "#5B5B5B",
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
  const { toStatus, tx, fromStatus, finalizedIndex } = props
  const { classes, cx } = useStyles()
  const { estimatedTimeMap } = useTxStore()

  const { changeTxType, changeWithdrawStep, changeHistoryVisible, changeTxResult } = useBridgeStore()
  const { setTargetTransaction } = useClaimStore()

  const renderEstimatedWaitingTime = timestamp => {
    if (timestamp === 1) {
      return <>{tx.isL1 ? "Ready" : "Claimable"} in ...</>
    } else if (timestamp === 0) {
      return <>Pending</>
    } else if (timestamp) {
      return <Countdown date={timestamp} renderer={renderCountDown}></Countdown>
    }
    return null
  }

  const renderCountDown = ({ total, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <>Pending</>
    }
    return (
      <>
        {tx.isL1 ? "Ready" : "Claimable"} in ~{minutes}m
      </>
    )
  }

  const moveToClaim = () => {
    changeHistoryVisible(false)
    changeTxResult(null)
    changeTxType("Withdraw")
    changeWithdrawStep("2")
    setTargetTransaction(tx.hash)
  }

  if (toStatus === TX_STATUS.success) {
    return <Chip className={cx(classes.chip, classes.successChip)} label={TX_STATUS.success}></Chip>
  }

  if (tx.assumedStatus) {
    return (
      <Tooltip placement="top" title={tx.errMsg || tx.assumedStatus}>
        <Chip
          className={cx(classes.chip, classes[`${tx.assumedStatus.toLowerCase()}Chip`])}
          label={
            <>
              <span>{tx.assumedStatus}</span>
              <SvgIcon sx={{ fontSize: "1.6rem", ml: "0.4rem" }} component={InfoSvg} inheritViewBox></SvgIcon>
            </>
          }
        ></Chip>
      </Tooltip>
    )
  }

  //withdraw step2
  if (!tx.isL1 && fromStatus === TX_STATUS.success) {
    // withdraw claimable
    if (+tx?.claimInfo?.batch_index && tx?.claimInfo?.batch_index <= finalizedIndex) {
      return (
        <ButtonBase onClick={moveToClaim} className={cx(classes.chip, classes.claimButton)}>
          Claim
        </ButtonBase>
      )
    }

    // withdraw not claimable
    return (
      <Tooltip
        placement="top"
        title="Scroll provers are still finalizing your transaction, this can take up to 1 hour. Once done, you'll be able to claim it here for use on the target network."
      >
        <ButtonBase onClick={moveToClaim} className={cx(classes.chip, classes.waitingClaimChip)}>
          {renderEstimatedWaitingTime(tx.initiatedAt ? dayjs(tx.initiatedAt).add(1, "h").valueOf() : 1)}
        </ButtonBase>
      </Tooltip>
    )
  }
  return <Chip label={renderEstimatedWaitingTime(estimatedTimeMap[`from_${tx.hash}`])} className={cx(classes.chip, classes.pendingChip)}></Chip>
}

export default TxStatus
