import { FC, useMemo } from "react"
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
  priceFeeErrorMessage?: string
  selectedToken: any
  estimatedGasCost: bigint
  relayFee: bigint
  totalFee: bigint
  bridgeWarning?: string | JSX.Element | null
}

const CustomTypography = ({ isError, ...props }) => <Typography sx={{ color: isError ? "primary.main" : undefined }} {...props} />

const TransactionSummary: FC<Props> = props => {
  const { classes: styles } = useStyles()
  const { txType, isNetworkCorrect } = useBridgeStore()

  const { amount, priceFeeErrorMessage, selectedToken, estimatedGasCost, relayFee, totalFee, bridgeWarning } = props

  const getDisplayedValue = (value, decimals = BigInt(18), symbol = ETH_SYMBOL) => {
    const condition = isNetworkCorrect && amount && bridgeWarning === null
    if (!condition || priceFeeErrorMessage) return <CustomTypography isError={!!priceFeeErrorMessage}>-</CustomTypography>
    return toTokenDisplay(value, decimals, symbol)
  }

  const displayedAmount = useMemo(
    () => getDisplayedValue(amountToBN(amount, selectedToken.decimals), selectedToken.decimals, selectedToken.symbol),
    [isNetworkCorrect, amount, selectedToken, priceFeeErrorMessage, bridgeWarning],
  )

  const displayedL1Fee = useMemo(() => {
    const fee = txType === "Deposit" ? estimatedGasCost : relayFee
    return getDisplayedValue(fee)
  }, [isNetworkCorrect, amount, estimatedGasCost, relayFee, selectedToken, priceFeeErrorMessage, bridgeWarning])

  const displayedL2Fee = useMemo(() => {
    const fee = txType === "Deposit" ? relayFee : estimatedGasCost
    return getDisplayedValue(fee)
  }, [isNetworkCorrect, amount, estimatedGasCost, relayFee, selectedToken, priceFeeErrorMessage, bridgeWarning])

  const displayedTotalCost = useMemo(() => {
    if (selectedToken.symbol === ETH_SYMBOL) return getDisplayedValue(totalFee + amountToBN(amount, selectedToken.decimals))
    const condition = isNetworkCorrect && amount && bridgeWarning === null
    if (!condition || priceFeeErrorMessage) return <CustomTypography isError={!!priceFeeErrorMessage}>-</CustomTypography>
    return (
      getDisplayedValue(amountToBN(amount, selectedToken.decimals), selectedToken.decimals, selectedToken.symbol) +
      " + " +
      getDisplayedValue(totalFee)
    )
  }, [isNetworkCorrect, amount, totalFee, selectedToken, priceFeeErrorMessage, bridgeWarning])

  return (
    <div className={styles.root}>
      <Typography className={styles.title} variant="h5">
        Summary
      </Typography>
      <Box
        sx={{
          borderRadius: "1rem",
          background: "#FFF0DD",
          width: "100%",
          padding: "1rem 1.6rem",
        }}
      >
        <DetailRow title="You're moving" value={displayedAmount} large />
        <DetailRow
          title="L1 gas fee"
          // tooltip={<FeeDetails content="L1 fees go to Ethereum Validators." />}
          value={displayedL1Fee}
          large
        />
        <DetailRow title="L2 gas fee" value={displayedL2Fee} large />
        <Divider sx={{ my: "0.8rem" }} />
        <DetailRow title="Total" sx={{ mt: "0.8rem" }} value={displayedTotalCost} large />
      </Box>
    </div>
  )
}

export default TransactionSummary
