import { makeStyles } from "tss-react/mui"

import { Tooltip } from "@mui/material"

import { TX_STATUS } from "@/constants"
import useBridgeStore from "@/stores/bridgeStore"
import useClaimStore from "@/stores/claimStore"

const useStyles = makeStyles()(theme => {
  return {
    chip: {
      width: "8.6rem",
      height: "2.8rem",
      fontSize: "1.4rem",
      fontWeight: 600,
      borderRadius: "10rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    pendingChip: {
      color: "#FFF8F3",
      backgroundColor: "#FF684B",
    },
    successChip: {
      color: "#0F8E7E",
      backgroundColor: "#DFFCF8",
    },
    failedChip: {
      color: "#FFF8F3",
      background: "#5B5B5B",
    },
    canNotClaimChip: {
      background: "#F0F0F0",
      color: "#5B5B5B",
    },
    claimedChip: {
      color: theme.palette.tagSuccess.main,
      backgroundColor: theme.palette.tagSuccess.light,
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
  const { changeTxType, changeWithdrawStep, changeHistoryVisible, changeTxResult } = useBridgeStore()
  const { setTargetTransaction } = useClaimStore()

  const moveToClaim = () => {
    changeHistoryVisible(false)
    changeTxResult(null)
    changeTxType("Withdraw")
    changeWithdrawStep("2")
    setTargetTransaction(tx.hash)
  }

  if (toStatus === TX_STATUS.success) {
    return <button className={cx(classes.chip, classes.successChip)}>{TX_STATUS.success}</button>
  }

  if (tx.assumedStatus) {
    return (
      <Tooltip placement="top" title={tx.errMsg || tx.assumedStatus}>
        <button className={cx(classes.chip, classes.failedChip)}>
          Failed
          <svg style={{ marginLeft: "4px" }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 12.75C10.175 12.75 12.75 10.175 12.75 7C12.75 3.825 10.175 1.25 7 1.25C3.825 1.25 1.25 3.825 1.25 7C1.25 10.175 3.825 12.75 7 12.75ZM7 14C10.865 14 14 10.865 14 7C14 3.135 10.865 0 7 0C3.135 0 0 3.135 0 7C0 10.865 3.135 14 7 14Z"
              fill="#FFF8F3"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 5.56C7.345 5.56 7.625 5.84 7.625 6.185V10.185C7.625 10.53 7.345 10.81 7 10.81C6.655 10.81 6.375 10.53 6.375 10.185V6.185C6.375 5.84 6.655 5.56 7 5.56Z"
              fill="#FFF8F3"
            />
            <path
              d="M7 4.435C7.34518 4.435 7.625 4.15518 7.625 3.81C7.625 3.46482 7.34518 3.185 7 3.185C6.65482 3.185 6.375 3.46482 6.375 3.81C6.375 4.15518 6.65482 4.435 7 4.435Z"
              fill="#FFF8F3"
            />
          </svg>
        </button>
      </Tooltip>
    )
  }

  //withdraw step2
  if (!tx.isL1 && fromStatus === TX_STATUS.success) {
    // withdraw claimable
    if (+tx?.claimInfo?.batch_index && tx?.claimInfo?.batch_index <= finalizedIndex) {
      return (
        <button onClick={moveToClaim} className={cx(classes.chip, classes.pendingChip)}>
          Claim
        </button>
      )
    }

    // withdraw not claimable
    return (
      <Tooltip
        placement="top"
        title="Scroll provers are still finalizing your transaction, this can take up to 4 hours. Once done, you'll be able to claim it here for use on the target network."
      >
        <button onClick={moveToClaim} className={cx(classes.chip, classes.canNotClaimChip)}>
          Claim
        </button>
      </Tooltip>
    )
  }
  return <button className={cx(classes.chip, classes.pendingChip)}>Pending</button>
}

export default TxStatus
