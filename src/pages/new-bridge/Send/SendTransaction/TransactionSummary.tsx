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

type Props = {
  amount?: string
  feeError?: string
  selectedToken: any
  l1GasFee: bigint | null
  l2GasFee: bigint | null
  bridgeWarning?: string | JSX.Element | null
  needApproval?: boolean
}

const CustomTypography = ({ isError, ...props }) => <Typography sx={{ color: isError ? "primary.main" : undefined }} {...props} />

const TransactionSummary: FC<Props> = props => {
  const { classes: styles } = useStyles()
  const { txType, isNetworkCorrect } = useBridgeStore()

  const { amount, feeError, selectedToken, l1GasFee, l2GasFee, needApproval } = props

  const getDisplayedValue = useCallback(
    (value, decimals = BigInt(18), symbol = ETH_SYMBOL) => {
      const isGasOk = l1GasFee !== null && l2GasFee !== null
      const condition = isNetworkCorrect && amount && isGasOk
      if (needApproval !== false || !condition || feeError)
        return <CustomTypography isError={!!feeError && amount && !needApproval}>-</CustomTypography>
      return toTokenDisplay(value, decimals, symbol)
    },
    [needApproval, isNetworkCorrect, amount, feeError, l1GasFee, l2GasFee],
  )

  const getDisplayedMultiplexValue = useCallback(() => {
    const isGasOk = l1GasFee !== null && l2GasFee !== null
    const condition = isNetworkCorrect && amount && isGasOk
    if (needApproval !== false || !condition || feeError)
      return <CustomTypography isError={!!feeError && amount && !needApproval}>-</CustomTypography>

    return (
      getDisplayedValue(amountToBN(amount, selectedToken.decimals), selectedToken.decimals, selectedToken.symbol) +
      " + " +
      getDisplayedValue(l1GasFee + l2GasFee)
    )
  }, [needApproval, isNetworkCorrect, amount, feeError, selectedToken, l1GasFee, l2GasFee, needApproval])

  const displayedAmount = useMemo(() => {
    const value = amountToBN(amount, selectedToken.decimals)
    return getDisplayedValue(value, selectedToken.decimals, selectedToken.symbol)
  }, [amount, selectedToken, getDisplayedValue])

  const displayedL1Fee = useMemo(() => {
    const fee = txType === "Deposit" ? l1GasFee : l2GasFee
    return getDisplayedValue(fee)
  }, [amount, txType, l1GasFee, l2GasFee, getDisplayedValue])

  const displayedL2Fee = useMemo(() => {
    const fee = txType === "Deposit" ? l2GasFee : l1GasFee
    return getDisplayedValue(fee)
  }, [amount, txType, l1GasFee, l2GasFee, getDisplayedValue])

  const displayedTotalCost = useMemo(() => {
    const isGasOk = l1GasFee !== null && l2GasFee !== null
    if (selectedToken.symbol === ETH_SYMBOL && isGasOk) return getDisplayedValue(l1GasFee + l2GasFee + amountToBN(amount))

    return getDisplayedMultiplexValue()
  }, [selectedToken, getDisplayedValue, getDisplayedMultiplexValue])

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
        <Divider sx={{ my: "1.2rem" }} />
        <DetailRow title="Total" value={displayedTotalCost} large />
      </Box>
    </div>
  )
}

export default TransactionSummary
