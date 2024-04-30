import { useCallback, useEffect, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Card, Grid, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as SelectedSvg } from "@/assets/svgs/bridge/approve-token-selected.svg"
import { ETH_SYMBOL } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useBatchBridgeStore, { DepositBatchMode } from "@/stores/batchBridgeStore"
import useBridgeStore from "@/stores/bridgeStore"
import { BNToAmount, toTokenDisplay } from "@/utils"
import { formatAmount } from "@/utils"

import EconomyTooltip from "./EconomyTooltip"

type TransactionValue = bigint | null

const DEPOSIT_OPTIONS = [
  {
    title: "Fast & Furious ⚡️",
    info: ["Approval on each order", "Pay gas on every trade"],
    type: DepositBatchMode.Fast,
    time: "20 min",
  },
  {
    title: "Economy 💰",
    info: ["Only approve once", "Save on future gas fee"],
    type: DepositBatchMode.Economy,
    time: "30min ~ 1 hour",
  },
]

// const DEPOSIT_TYPE = Object.fromEntries(DEPOSIT_OPTIONS.map(item => [item.type, item.type]))

const useStyles = makeStyles()(theme => ({
  cardRoot: {
    position: "relative",
    borderRadius: "2rem",
    borderColor: "#473835",
    padding: "3rem 1.6rem",
    display: "flex",
    overflow: "visible",
    cursor: "pointer",
    flex: 1,
    "*": {
      cursor: "pointer !important",
      fontFamily: "var(--default-font-family) !important",
    },
    [theme.breakpoints.down("sm")]: {
      aspectRatio: "unset",
      justifyContent: "center",
    },
  },
  invaildCard: {
    opacity: 0.7,
  },
  selectedCard: {
    outline: `1px solid ${theme.palette.text.primary}`,
  },
  selectedIcon: {
    fontSize: "2.8rem",
    position: "absolute",
    right: "0.8rem",
    top: "0.8rem",
  },
  label: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    fontWeight: 700,
  },
  info: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    fontFamily: "var(--developer-page-font-family) !important",
    display: "flex",
    justifyContent: "flex-end",
  },
  price: {
    fontSize: "1.4rem",
    lineHeight: "2.4rem",
    color: "#5B5B5B",
    marginLeft: "0.6rem",
    fontFamily: "var(--developer-page-font-family) !important",
  },
  subheader: {
    fontSize: "1.2rem",
    lineHeight: "2.4rem",
    color: "#5B5B5B",
    fontWeight: 700,
    textTransform: "uppercase",
  },
}))

const CustomTypography = ({ isError, ...props }) => <Typography sx={{ color: isError ? "primary.main" : undefined }} {...props} />

const DepositSelector = props => {
  const { amount, feeError, l1GasFee, l2GasFee, needApproval, batchDepositGasFee, selectedToken, isVaild } = props
  const { isMobile } = useCheckViewport()
  const { classes, cx } = useStyles()

  const [selectedType, setSelectedType] = useState(DepositBatchMode.Fast)
  const { isNetworkCorrect } = useBridgeStore()
  const { changeDepositBatchMode, batchDepositConfig } = useBatchBridgeStore()
  const { tokenPrice } = useBridgeContext()

  const handleSelect = value => {
    setSelectedType(value)
  }

  useEffect(() => {
    changeDepositBatchMode(selectedType)
  }, [selectedType])

  const allowDisplayValue = useMemo(() => {
    return isNetworkCorrect && amount && needApproval === false && !feeError
  }, [isNetworkCorrect, amount, needApproval, feeError])

  const showFeeError = useMemo(() => {
    return !!feeError && amount && !needApproval
  }, [feeError, amount, needApproval])

  const getDisplayedPrice = useCallback(
    (amount = "", tokenAddress = "ethereum") => {
      if (allowDisplayValue && tokenPrice.price?.[tokenAddress.toLowerCase()]) {
        return (+amount * tokenPrice.price[tokenAddress.toLowerCase()].usd).toFixed(2)
      }
      return ""
    },
    [allowDisplayValue, showFeeError, tokenPrice],
  )

  const getDisplayedValue = useCallback(
    (value: TransactionValue = BigInt(0), decimals = BigInt(18), symbol = ETH_SYMBOL) => {
      if (allowDisplayValue) {
        return toTokenDisplay(value, decimals, symbol)
      }
      return <CustomTypography isError={showFeeError}>-</CustomTypography>
    },
    [allowDisplayValue, showFeeError],
  )

  const displayedL1Fee = useMemo(() => {
    const displayedFee = getDisplayedValue(l1GasFee)
    const displayedPrice = getDisplayedPrice(BNToAmount(l1GasFee as bigint))

    const displayedBatchFee = getDisplayedValue(batchDepositGasFee)
    const displayedBatchPrice = getDisplayedPrice(BNToAmount(batchDepositGasFee as bigint))

    return {
      [DepositBatchMode.Fast]: {
        value: displayedFee,
        price: displayedPrice,
      },
      [DepositBatchMode.Economy]: {
        value: displayedBatchFee,
        price: displayedBatchPrice,
      },
    }
  }, [l1GasFee, batchDepositGasFee, getDisplayedValue, getDisplayedPrice])

  const displayedL2Fee = useMemo(() => {
    const displayedFee = getDisplayedValue(l2GasFee)
    const displayedPrice = getDisplayedPrice(BNToAmount(l2GasFee as bigint))

    const displayedBatchFee = getDisplayedValue(batchDepositConfig.feeAmountPerTx)
    const displayedBatchPrice = getDisplayedPrice(BNToAmount(batchDepositConfig.feeAmountPerTx as bigint))

    return {
      [DepositBatchMode.Fast]: {
        value: displayedFee,
        price: displayedPrice,
      },
      [DepositBatchMode.Economy]: {
        value: displayedBatchFee,
        price: displayedBatchPrice,
      },
    }
  }, [l2GasFee, getDisplayedValue, getDisplayedPrice])

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "3rem" : "2rem"}
        justifyContent="center"
        sx={{ mt: ["1.6rem", "1.6rem"], mb: ["1.6rem", "1.6rem"], width: "100%" }}
      >
        {DEPOSIT_OPTIONS.map((item, idx) => (
          <Card
            key={item.type}
            role="button"
            tabIndex={0}
            variant="outlined"
            classes={{ root: cx(classes.cardRoot, !!idx && !isVaild && classes.invaildCard, selectedType === item.type && classes.selectedCard) }}
            onClick={() => handleSelect(item.type)}
          >
            {item.type === selectedType && <SvgIcon classes={{ root: classes.selectedIcon }} component={SelectedSvg} inheritViewBox></SvgIcon>}
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.6rem", fontWeight: 600, textAlign: "center" }}>{item.title}</Typography>
              <Grid container>
                <Grid classes={{ root: classes.label }} item xs={4}>
                  Time
                </Grid>
                <Grid classes={{ root: classes.info }} item xs={8} textAlign="right">
                  {item.time}
                </Grid>
              </Grid>
              <Grid classes={{ root: classes.subheader }} item xs={12}>
                Gas fee
              </Grid>
              <Grid container>
                <Grid classes={{ root: classes.label }} item xs={4}>
                  Ethereum
                </Grid>
                <Grid classes={{ root: classes.info }} item xs={8} textAlign="right">
                  {displayedL1Fee[DepositBatchMode[item.type]].value}
                  <Typography classes={{ root: classes.price }} component="span">
                    {displayedL1Fee[DepositBatchMode[item.type]]?.price ? ` $${formatAmount(displayedL1Fee[DepositBatchMode[item.type]].price)}` : ""}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid classes={{ root: classes.label }} item xs={4}>
                  Scroll
                </Grid>
                <Grid classes={{ root: classes.info }} item xs={8} textAlign="right">
                  {displayedL2Fee[DepositBatchMode[item.type]].value}
                  <Typography classes={{ root: classes.price }} component="span">
                    {displayedL1Fee[DepositBatchMode[item.type]]?.price
                      ? ` $${formatAmount(displayedL2Fee[DepositBatchMode[item.type]].price)}`
                      : " "}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Card>
        ))}
      </Stack>
      {!isVaild && <EconomyTooltip selectedToken={selectedToken} amount={amount} />}
    </Box>
  )
}

export default DepositSelector
