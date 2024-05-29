import { useCallback, useEffect, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Card, Grid, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as SelectedSvg } from "@/assets/svgs/bridge/approve-token-selected.svg"
import { ETH_SYMBOL } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useBatchBridgeStore, { DepositBatchMode } from "@/stores/batchBridgeStore"
import useBridgeStore from "@/stores/bridgeStore"
import { BNToAmount, checkApproved, toTokenDisplay } from "@/utils"
import { formatAmount } from "@/utils"

import EconomyTooltip from "./EconomyTooltip"

type TransactionValue = bigint | null

const DEPOSIT_OPTIONS = [
  {
    title: "Economy 💰",
    type: DepositBatchMode.Economy,
    time: "30 min ~ 1 hour",
  },
  {
    title: "Fast ⚡️",
    type: DepositBatchMode.Fast,
    time: "20 min",
  },
]

const useStyles = makeStyles()(theme => ({
  cardRoot: {
    position: "relative",
    borderRadius: "2rem",
    backgroundColor: theme.palette.themeBackground.light,
    padding: "2.7rem 1.5rem 3.1rem",
    display: "flex",
    overflow: "visible",
    cursor: "pointer",
    flex: 1,
    border: "1px solid transparent",
    transition: "backgroundColor 0.3s ease",

    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },

    [theme.breakpoints.down("sm")]: {
      aspectRatio: "unset",
      justifyContent: "center",
    },
  },
  invaildCard: {
    opacity: 0.6,
    pointerEvents: "none",
  },
  selectedCard: {
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.background.default,
  },
  selectedIcon: {
    fontSize: "3.2rem",
    position: "absolute",
    right: "0.8rem",
    top: "0.8rem",
  },
  label: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    fontWeight: 700,
    fontFamily: "var(--default-font-family) !important",
  },
  info: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    display: "flex",
    justifyContent: "flex-end",
  },
  price: {
    fontSize: "1.4rem",
    lineHeight: "2.4rem",
    color: "#5B5B5B",
    marginLeft: "0.6rem",
  },
  subheader: {
    fontSize: "1.2rem",
    lineHeight: "2.4rem",
    color: "#5B5B5B",
    fontWeight: 700,
    textTransform: "uppercase",
    fontFamily: "var(--default-font-family) !important",
  },
}))

const CustomTypography = ({ isError, ...props }) => <Typography sx={{ color: isError ? "primary.main" : undefined }} {...props} />

const DepositSelector = props => {
  const { amount, feeError, l1GasFee, l2GasFee, l1EconomyGasFee, l2EconomyGasFee, needApproval, selectedToken, isVaild } = props
  const { isMobile } = useCheckViewport()
  const { classes, cx } = useStyles()

  const [selectedType, setSelectedType] = useState(DepositBatchMode.Economy)
  const { isNetworkCorrect } = useBridgeStore()
  const { changeDepositBatchMode, depositBatchMode } = useBatchBridgeStore()
  const { tokenPrice } = useBridgeContext()

  const handleSelect = value => {
    setSelectedType(value)
  }

  useEffect(() => {
    changeDepositBatchMode(selectedType)
  }, [selectedType])

  const allowDisplayValue = useMemo(() => {
    return isNetworkCorrect && amount && !feeError
  }, [isNetworkCorrect, amount, feeError, depositBatchMode])

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
    let displayedFee = "-"
    let displayedPrice = ""
    if (checkApproved(needApproval, DepositBatchMode.Fast) && allowDisplayValue) {
      displayedFee = getDisplayedValue(l1GasFee) as any
      displayedPrice = getDisplayedPrice(BNToAmount(l1GasFee as bigint))
    }
    let displayedBatchFee = "-"
    let displayedBatchPrice = ""
    if (checkApproved(needApproval, DepositBatchMode.Economy) && allowDisplayValue) {
      displayedBatchFee = getDisplayedValue(l1EconomyGasFee) as any
      displayedBatchPrice = getDisplayedPrice(BNToAmount(l1EconomyGasFee as bigint))
    }
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
  }, [l1GasFee, l1EconomyGasFee, getDisplayedValue, getDisplayedPrice, needApproval, allowDisplayValue])

  const displayedL2Fee = useMemo(() => {
    let displayedFee = "-"
    let displayedPrice = ""
    if (checkApproved(needApproval, DepositBatchMode.Fast) && allowDisplayValue) {
      displayedFee = getDisplayedValue(l2GasFee) as any
      displayedPrice = getDisplayedPrice(BNToAmount(l2GasFee as bigint))
    }
    let displayedBatchFee = "-"
    let displayedBatchPrice = ""
    if (checkApproved(needApproval, DepositBatchMode.Economy) && allowDisplayValue) {
      displayedBatchFee = getDisplayedValue(l2EconomyGasFee, selectedToken.decimals, selectedToken.symbol) as any
      displayedBatchPrice = getDisplayedPrice(BNToAmount(l2EconomyGasFee as bigint))
    }
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
  }, [l2GasFee, l2EconomyGasFee, getDisplayedValue, getDisplayedPrice, needApproval, allowDisplayValue])

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
            classes={{ root: cx(classes.cardRoot, !idx && !isVaild && classes.invaildCard, selectedType === item.type && classes.selectedCard) }}
            onClick={() => handleSelect(item.type)}
          >
            {item.type === selectedType && <SvgIcon classes={{ root: classes.selectedIcon }} component={SelectedSvg} inheritViewBox></SvgIcon>}
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <Typography
                sx={{
                  fontSize: ["2rem", "2.4rem"],
                  lineHeight: "3.6rem",
                  fontWeight: 600,
                  textAlign: "center",
                  fontFamily: "var(--default-font-family) !important",
                }}
              >
                {item.title}
              </Typography>
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
