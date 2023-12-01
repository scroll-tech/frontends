import { FC, useCallback, useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Divider, Typography } from "@mui/material"

import { ETH_SYMBOL } from "@/constants"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import useBridgeStore from "@/stores/bridgeStore"
import { BNToAmount, amountToBN, toTokenDisplay } from "@/utils"

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
  needApproval?: boolean
}

const CustomTypography = ({ isError, ...props }) => <Typography sx={{ color: isError ? "primary.main" : undefined }} {...props} />

const TransactionSummary: FC<Props> = props => {
  const { classes: styles } = useStyles()
  const { txType, isNetworkCorrect } = useBridgeStore()
  const { tokenPrice } = useBrigeContext()

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

  const getDisplayedPrice = useCallback(
    (amount = "", tokenAddress = "ethereum") => {
      if (allowDisplayValue && tokenPrice.price?.[tokenAddress.toLowerCase()]) {
        return (+amount * tokenPrice.price[tokenAddress.toLowerCase()].usd).toFixed(2)
      }
      return ""
    },
    [allowDisplayValue, showFeeError, tokenPrice],
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

  const getDisplayedMultiplexPrice = useCallback(() => {
    if (allowDisplayValue && tokenPrice.price?.[selectedToken.address.toLowerCase()]) {
      return (
        Number(getDisplayedPrice(amount, selectedToken.address)) +
        Number(getDisplayedPrice(BNToAmount((l1GasFee ?? BigInt(0)) + l2GasFee + (l1DataFee ?? BigInt(0)))))
      ).toFixed(2)
    }
    return ""
  }, [allowDisplayValue, showFeeError, amount, selectedToken, l1GasFee, l2GasFee, l1DataFee])

  const displayedAmount = useMemo(() => {
    const value = amountToBN(amount, selectedToken.decimals)
    return getDisplayedValue(value, selectedToken.decimals, selectedToken.symbol)
  }, [amount, selectedToken, getDisplayedValue])

  const displayedPrice = useMemo(() => {
    return getDisplayedPrice(amount, selectedToken.address)
  }, [amount, selectedToken, getDisplayedPrice])

  const displayedL1Fee = useMemo(() => {
    const fee = txType === "Deposit" ? l1GasFee : l2GasFee
    return getDisplayedValue(fee)
  }, [txType, l1GasFee, l2GasFee, getDisplayedValue])

  const displayedL1Price = useMemo(() => {
    const fee = txType === "Deposit" ? l1GasFee : l2GasFee
    return getDisplayedPrice(BNToAmount(fee as bigint))
  }, [txType, l1GasFee, l2GasFee, getDisplayedPrice])

  const displayedL2Fee = useMemo(() => {
    const fee = txType === "Deposit" ? l2GasFee : l1GasFee
    return getDisplayedValue(fee)
  }, [txType, l1GasFee, l2GasFee, getDisplayedValue])

  const displayedL2Price = useMemo(() => {
    const fee = txType === "Deposit" ? l2GasFee : l1GasFee
    return getDisplayedPrice(BNToAmount(fee as bigint))
  }, [txType, l1GasFee, l2GasFee, getDisplayedPrice])

  const displayedL1DataFee = useMemo(() => {
    return getDisplayedValue(l1DataFee)
  }, [l1DataFee, getDisplayedValue])

  const displayedL1DataPrice = useMemo(() => {
    return getDisplayedPrice(BNToAmount(l1DataFee as bigint))
  }, [l1DataFee, getDisplayedPrice])

  const displayedTotalCost = useMemo(() => {
    if (selectedToken.symbol === ETH_SYMBOL)
      return getDisplayedValue((l1GasFee ?? BigInt(0)) + l2GasFee + (l1DataFee ?? BigInt(0)) + amountToBN(amount))

    return getDisplayedMultiplexValue()
  }, [l1GasFee, l2GasFee, l1DataFee, selectedToken, getDisplayedValue, getDisplayedMultiplexValue])

  const displayedTotalPrice = useMemo(() => {
    if (selectedToken.symbol === ETH_SYMBOL)
      return getDisplayedPrice(BNToAmount((l1GasFee ?? BigInt(0)) + l2GasFee + (l1DataFee ?? BigInt(0)) + amountToBN(amount)))
    return getDisplayedMultiplexPrice()
  }, [l1GasFee, l2GasFee, l1DataFee, selectedToken, getDisplayedPrice, getDisplayedMultiplexPrice])

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
        <DetailRow title={`You're ${txType === "Deposit" ? "depositing" : "withdrawing"}`} value={displayedAmount} price={displayedPrice} large />
        {txType === "Deposit" && <DetailRow title="Ethereum gas fee" value={displayedL1Fee} price={displayedL1Price} large />}
        <DetailRow title="Scroll gas fee" value={displayedL2Fee} price={displayedL2Price} large />
        {txType === "Withdraw" && <DetailRow title="Ethereum data fee" value={displayedL1DataFee} price={displayedL1DataPrice} large />}
        <Divider sx={{ my: "1.2rem" }} />
        <DetailRow title="Total" value={displayedTotalCost} price={displayedTotalPrice} large />
      </Box>
    </div>
  )
}

export default TransactionSummary
