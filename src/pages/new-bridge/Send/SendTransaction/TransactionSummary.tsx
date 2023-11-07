import { FC, useCallback, useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Divider, Typography } from "@mui/material"

import { ETH_SYMBOL } from "@/constants"
import useBridgeStore from "@/stores/bridgeStore"
import { amountToBN, toTokenDisplay } from "@/utils"

import DetailRow from "./InfoTooltip/DetailRow"

const useStyles = makeStyles()(theme => ({
  root: {
    width: "100%",
    marginTop: "1.2rem",
    marginBottom: "1.2rem",
  },
  title: {
    fontSize: "1.8rem",
    lineHeight: "3.6rem",
    fontWeight: 500,
    marginBottom: "0.4rem",
  },
}))

type TransactionValue = bigint | null

type Props = {
  amount?: string
  feeError?: string
  selectedToken: any
  l1GasFee: TransactionValue
  l2GasFee: bigint
  l1DataFee?: bigint
  bridgeWarning?: string | JSX.Element | null
  needApproval?: boolean
}

const CustomTypography = ({ isError, ...props }) => <Typography sx={{ color: isError ? "primary.main" : undefined }} {...props} />

const TransactionSummary: FC<Props> = props => {
  const { classes: styles } = useStyles()
  const { txType, isNetworkCorrect } = useBridgeStore()

  const { amount, feeError, selectedToken, l1GasFee, l2GasFee, l1DataFee, needApproval } = props

  const allowDisplayValue = useMemo(() => {
    return isNetworkCorrect && amount && needApproval === false && !feeError
  }, [isNetworkCorrect, amount, needApproval, feeError])

  const showFeeError = useMemo(() => {
    return !!feeError && amount && !needApproval
  }, [feeError, amount, needApproval])

  const getDisplayedValue = useCallback(
    (value: TransactionValue = BigInt(0), decimals = BigInt(18), symbol = ETH_SYMBOL) => {
      if (allowDisplayValue) {
        return toTokenDisplay(value, decimals, symbol)
      }
      return <CustomTypography isError={showFeeError}>-</CustomTypography>
    },
    [allowDisplayValue, showFeeError],
  )

  const getDisplayedMultiplexValue = useCallback(() => {
    if (allowDisplayValue) {
      return (
        getDisplayedValue(amountToBN(amount, selectedToken.decimals), selectedToken.decimals, selectedToken.symbol) +
        " + " +
        getDisplayedValue((l1GasFee ?? BigInt(0)) + l2GasFee + (l1DataFee ?? BigInt(0)))
      )
    }
    return <CustomTypography isError={showFeeError}>-</CustomTypography>
  }, [allowDisplayValue, showFeeError, amount, selectedToken, l1GasFee, l2GasFee, l1DataFee])

  const displayedAmount = useMemo(() => {
    const value = amountToBN(amount, selectedToken.decimals)
    return getDisplayedValue(value, selectedToken.decimals, selectedToken.symbol)
  }, [amount, selectedToken, getDisplayedValue])

  const displayedL1Fee = useMemo(() => {
    const fee = txType === "Deposit" ? l1GasFee : l2GasFee
    return getDisplayedValue(fee)
  }, [txType, l1GasFee, l2GasFee, getDisplayedValue])

  const displayedL2Fee = useMemo(() => {
    const fee = txType === "Deposit" ? l2GasFee : l1GasFee
    return getDisplayedValue(fee)
  }, [txType, l1GasFee, l2GasFee, getDisplayedValue])

  const displayedL1DataFee = useMemo(() => {
    return getDisplayedValue(l1DataFee)
  }, [l1DataFee, getDisplayedValue])

  const displayedTotalCost = useMemo(() => {
    if (selectedToken.symbol === ETH_SYMBOL)
      return getDisplayedValue((l1GasFee ?? BigInt(0)) + l2GasFee + (l1DataFee ?? BigInt(0)) + amountToBN(amount))

    return getDisplayedMultiplexValue()
  }, [l1GasFee, l2GasFee, l1DataFee, selectedToken, getDisplayedValue, getDisplayedMultiplexValue])

  return (
    <div className={styles.root}>
      <Typography className={styles.title} variant="h5">
        Summary
      </Typography>
      <Box
        sx={{
          borderRadius: "1rem",
          background: theme => theme.palette.themeBackground.normal,
          width: "100%",
          padding: "1rem 1.6rem",
        }}
      >
        <DetailRow title={`You're ${txType === "Deposit" ? "depositing" : "withdrawing"}`} value={displayedAmount} large />
        {txType === "Deposit" && <DetailRow title="Ethereum gas fee" value={displayedL1Fee} large />}
        <DetailRow title="Scroll gas fee" value={displayedL2Fee} large />
        {txType === "Withdraw" && <DetailRow title="Ethereum data fee" value={displayedL1DataFee} large />}
        <Divider sx={{ my: "1.2rem" }} />
        <DetailRow title="Total" value={displayedTotalCost} large />
      </Box>
    </div>
  )
}

export default TransactionSummary
