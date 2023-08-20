import { formatUnits } from "ethers"
import { useMemo } from "react"
import { isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { Button, InputBase, Skeleton, Stack, Typography } from "@mui/material"

import { sanitizeNumericalString, toTokenDisplay } from "@/utils"

import TokenSelect from "./TokenSelect"

const useStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.themeBackground.normal,
    padding: "2.8rem 3rem",
    borderRadius: "2rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "2.8rem 2rem",
    },
  },
  input: {
    fontSize: "4rem",
    height: "3.5rem",
    padding: 0,
    marginBottom: "6px",
    fontWeight: 600,
    // fontFamily: "Roboto Flex",
  },
  fromBalance: {
    fontSize: "1.3rem",
    fontWeight: 600,
    lineHeight: 1,
    // fontFamily: "Roboto Flex",
  },
  maxButton: {
    width: "6.8rem",
    height: "2.8rem",
    fontSize: "1.6rem",
    padding: 0,
    backgroundColor: theme.palette.themeBackground.optionHightlight,
    fontWeight: 600,
    "&:hover": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.themeBackground.optionHightlight,
    },
    "&.Mui-disabled": {
      color: "#EBC28E",
      backgroundColor: "#FFF5E8",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "5rem",
      fontSize: "1.4rem",
    },
  },
}))

const BalanceInput = props => {
  const {
    value,
    onChange,
    onMaxAmount,
    balance,
    balanceLoading,
    token: selectedToken,
    tokenOptions,
    fee,
    disabled,
    onChangeToken,
    ...restProps
  } = props
  const { classes } = useStyles()

  const displayedBalance = useMemo(() => (disabled ? "0.00" : toTokenDisplay(balance, selectedToken.decimals)), [selectedToken, balance, disabled])

  const handleChangeAmount = e => {
    const amount = sanitizeNumericalString(e.target.value)
    onChange(amount)
  }

  const handleMaxAmount = () => {
    if (balance) {
      const shouldPayFee = selectedToken.native ? fee : BigInt(0)
      const maxValue = formatUnits(balance - shouldPayFee, selectedToken.decimals)
      onChange(maxValue)
    }
  }

  const handleChangeToken = value => {
    onChange("")
    onChangeToken(value)
  }

  return (
    <>
      <Stack direction="row" spacing={isMobileOnly ? "1.2rem" : "2rem"} alignItems="center" className={classes.root} {...restProps}>
        <TokenSelect value={selectedToken} options={tokenOptions} onChange={handleChangeToken}></TokenSelect>
        <Stack direction="column">
          <InputBase
            value={value}
            placeholder="0.00"
            disabled={disabled}
            classes={{ input: classes.input }}
            onChange={handleChangeAmount}
          ></InputBase>
          {balanceLoading ? (
            <Skeleton variant="text" width="12rem" />
          ) : (
            <Typography className={classes.fromBalance} sx={{ color: disabled ? "text.disabled" : "#0F8E7E" }}>
              {displayedBalance} available
            </Typography>
          )}
        </Stack>
        <Button className={classes.maxButton} variant="contained" color="info" disabled={disabled} onClick={handleMaxAmount}>
          Max
        </Button>
      </Stack>
    </>
  )
}

export default BalanceInput
