import { FC, useCallback, useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"

import { CHAIN_ID, ETH_SYMBOL, L1_NAME, L2_NAME } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import useBridgeStore from "@/stores/bridgeStore"
import { amountToBN, toTokenDisplay } from "@/utils"
import { isAlternativeGasTokenEnabled } from "@/utils"

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
  table: {
    overflow: "hidden",
    background: theme.palette.themeBackground.normal,
    width: "100%",
    border: `1.6rem solid ${theme.palette.themeBackground.normal}`,
    borderTopWidth: " 1.2rem",
    borderBottomWidth: "1.2rem",
  },
  hr: {
    "& td": {
      height: "21px",
      background: "linear-gradient(transparent 10px, #101010 10px, #101010 11px, transparent 11px)",
    },
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

  const { amount, feeError, selectedToken, l1GasFee, l2GasFee, l1DataFee, needApproval } = props
  const { tokenList } = useBridgeContext()

  const allowDisplayValue = useMemo(() => {
    return isNetworkCorrect && amount && needApproval === false && !feeError
  }, [isNetworkCorrect, amount, needApproval, feeError])

  const showFeeError = useMemo(() => {
    return !!feeError && amount && !needApproval
  }, [feeError, amount, needApproval])

  const l2NativeToken = useMemo(() => {
    return tokenList.find(token => (token as any).native && token.chainId === CHAIN_ID.L2)
  }, [tokenList])

  const getDisplayedValue = useCallback(
    (value: TransactionValue = BigInt(0), decimals = BigInt(18), symbol = ETH_SYMBOL) => {
      if (allowDisplayValue) {
        return toTokenDisplay(value, decimals, symbol)
      }
      return <CustomTypography isError={showFeeError}>-</CustomTypography>
    },
    [allowDisplayValue, showFeeError],
  )

  const getDisplayedMultiplex = useCallback(() => {
    if (allowDisplayValue) {
      let displayedValue
      if (isAlternativeGasTokenEnabled && txType === "Withdraw") {
        if (selectedToken.symbol === l2NativeToken?.symbol) {
          displayedValue =
            getDisplayedValue(
              amountToBN(amount, selectedToken.decimals) + (l1GasFee ?? BigInt(0)) + l2GasFee,
              selectedToken.decimals,
              selectedToken.symbol,
            ) + (l1DataFee ? " + " + getDisplayedValue(l1DataFee) : "")
        } else {
          displayedValue =
            getDisplayedValue(amountToBN(amount, selectedToken.decimals), selectedToken.decimals, selectedToken.symbol) +
            " + " +
            getDisplayedValue((l1GasFee ?? BigInt(0)) + l2GasFee, l2NativeToken?.decimals, l2NativeToken?.symbol) +
            (l1DataFee ? " + " + getDisplayedValue(l1DataFee) : "")
        }
      } else {
        displayedValue =
          getDisplayedValue(amountToBN(amount, selectedToken.decimals), selectedToken.decimals, selectedToken.symbol) +
          " + " +
          getDisplayedValue((l1GasFee ?? BigInt(0)) + l2GasFee + (l1DataFee ?? BigInt(0)))
      }

      return { value: displayedValue }
    }

    return {
      value: <CustomTypography isError={showFeeError}>-</CustomTypography>,
    }
  }, [allowDisplayValue, showFeeError, amount, selectedToken, l1GasFee, l2GasFee, l1DataFee, getDisplayedValue])

  const displayedAmount = useMemo(() => {
    const valueBN = amountToBN(amount, selectedToken.decimals)
    const displayedValue = getDisplayedValue(valueBN, selectedToken.decimals, selectedToken.symbol)

    return { value: displayedValue }
  }, [amount, selectedToken, getDisplayedValue])

  const displayedL1Fee = useMemo(() => {
    const fee = txType === "Deposit" ? l1GasFee : l2GasFee
    const displayedFee = getDisplayedValue(fee)

    return { value: displayedFee }
  }, [txType, l1GasFee, l2GasFee, getDisplayedValue])

  const displayedL2Fee = useMemo(() => {
    const fee = txType === "Deposit" ? l2GasFee : l1GasFee

    if (isAlternativeGasTokenEnabled) {
      const displayedFee = getDisplayedValue(fee, l2NativeToken?.decimals, l2NativeToken?.symbol)
      return { value: displayedFee }
    }

    const displayedFee = getDisplayedValue(fee)
    return { value: displayedFee }
  }, [txType, l1GasFee, l2GasFee, getDisplayedValue])

  const displayedL1DataFee = useMemo(() => {
    const displayedFee = getDisplayedValue(l1DataFee)

    return { value: displayedFee }
  }, [l1DataFee, getDisplayedValue])

  const displayedTotalCost = useMemo(() => {
    if (selectedToken.symbol === ETH_SYMBOL) {
      const totalCostBN = (l1GasFee ?? BigInt(0)) + l2GasFee + (l1DataFee ?? BigInt(0)) + amountToBN(amount)
      const displayedTotalCost = getDisplayedValue(totalCostBN)

      return { value: displayedTotalCost }
    }

    return {
      value: getDisplayedMultiplex().value,
    }
  }, [l1GasFee, l2GasFee, l1DataFee, amount, selectedToken, getDisplayedValue, getDisplayedMultiplex])

  return (
    <div className={styles.root}>
      <Typography className={styles.title} variant="h5">
        Summary
      </Typography>
      <Box
        sx={{
          borderRadius: "0.8rem",
          border: "1px solid #101010",
          overflow: "hidden",
        }}
      >
        <table className={styles.table}>
          <tbody>
            <DetailRow title={`You're ${txType === "Deposit" ? "depositing" : "withdrawing"}`} value={displayedAmount.value} large />
            {txType === "Deposit" && <DetailRow title={`${L1_NAME} gas fee`} value={displayedL1Fee.value} large />}
            <DetailRow title={`${L2_NAME} gas fee`} value={displayedL2Fee.value} large />
            {txType === "Withdraw" && <DetailRow title={`${L1_NAME} data fee`} value={displayedL1DataFee.value} large />}
            <tr className={styles.hr}>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <DetailRow title="Total" value={displayedTotalCost.value} large />
          </tbody>
        </table>
      </Box>
    </div>
  )
}

export default TransactionSummary
