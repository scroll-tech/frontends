import { formatUnits } from "ethers"
import { useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { InputBase, Skeleton, Stack, Typography } from "@mui/material"

import TextButton from "@/components/TextButton"
import useCheckViewport from "@/hooks/useCheckViewport"
import { sanitizeNumericalString, toTokenDisplay } from "@/utils"

import useTransactionBuffer from "../../hooks/useTransactionBuffer"
import TokenSelect from "./TokenSelect"

const useStyles = makeStyles()(theme => ({
  root: {
    padding: "0",
    width: "100%",
    borderRadius: "2rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  input: {
    width: "100%",
    fontSize: "2rem",
    height: "5.4rem",
    padding: 0,
    fontWeight: 500,
    lineHeight: 1,
    background: "#ffffff",
    border: "1px solid #473835",
    borderRadius: "1rem",
    paddingLeft: "1.4rem",
    "&.Mui-disabled": {
      backgroundColor: "#FFF5E8",
      border: "1px solid #A39B9A",
      cursor: "not-allowed",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
      height: "4.6rem",
    },
  },
  fromBalance: {
    fontSize: "1.4rem",
    fontWeight: 500,
    lineHeight: 2,
    color: "#A39B9A",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  maxButton: {
    height: "2.8rem",
    fontSize: "1.4rem",
    "&:hover": {
      opacity: 0.8,
    },
  },
  disabledMaxButton: {
    pointerEvents: "none",
    color: "#EBC28E",
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
    readOnly,
    onChangeToken,
    ...restProps
  } = props
  const { cx, classes } = useStyles()
  const transactionBuffer = useTransactionBuffer(selectedToken)

  const { isMobile } = useCheckViewport()

  const displayedBalance = useMemo(
    () => (disabled ? "-" : toTokenDisplay(balance, selectedToken.decimals, selectedToken.symbol)),
    [selectedToken, balance, disabled],
  )

  const shouldPayFee = useMemo(() => (selectedToken.native ? fee : BigInt(0)), [selectedToken, fee])

  const maxDisabled = useMemo(() => {
    if (!selectedToken.native) {
      return !balance
    }
    if (balance && shouldPayFee) {
      return BigInt(balance) - transactionBuffer <= BigInt(shouldPayFee)
    }
    return true
  }, [selectedToken, balance, shouldPayFee, transactionBuffer])

  const handleChangeAmount = e => {
    const amount = sanitizeNumericalString(e.target.value)
    onChange(amount)
  }

  const handleMaxAmount = () => {
    if (balance) {
      let maxValue
      if (selectedToken.native) {
        // 0.01  0.001
        maxValue = formatUnits(BigInt(balance) - BigInt(shouldPayFee) - transactionBuffer, selectedToken.decimals)
      } else {
        maxValue = formatUnits(balance, selectedToken.decimals)
      }
      onChange(maxValue)
    }
  }

  const handleChangeToken = value => {
    onChange("")
    onChangeToken(value)
  }

  return (
    <>
      <Stack direction="row" spacing={isMobile ? "1.2rem" : "2rem"} alignItems="center" className={classes.root} {...restProps}>
        <InputBase
          value={value}
          placeholder="0.0000"
          disabled={disabled}
          classes={{ input: classes.input }}
          sx={{ width: "100%" }}
          readOnly={readOnly}
          onChange={handleChangeAmount}
        ></InputBase>
        <TokenSelect value={selectedToken} options={tokenOptions} onChange={handleChangeToken} disabled={disabled} readOnly={readOnly}></TokenSelect>
      </Stack>
      <Stack sx={{ width: "100%", pt: "0.4rem" }} direction="row" alignItems="center" spacing="0.4rem">
        {balanceLoading ? (
          <Skeleton variant="text" width="12rem" />
        ) : (
          <Typography className={classes.fromBalance}>Available: {displayedBalance}</Typography>
        )}

        <TextButton
          underline="always"
          className={cx(classes.maxButton, (disabled || maxDisabled) && classes.disabledMaxButton)}
          onClick={handleMaxAmount}
        >
          Max
        </TextButton>
      </Stack>
    </>
  )
}

export default BalanceInput
