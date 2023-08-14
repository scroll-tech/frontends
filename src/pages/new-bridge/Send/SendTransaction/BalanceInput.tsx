import { useCallback, useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Button, InputBase, Stack, Typography } from "@mui/material"

import { ETH_SYMBOL } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { sanitizeNumericalString, toTokenDisplay } from "@/utils"

import DetailRow from "./InfoTooltip/DetailRow"
import FeeDetails from "./InfoTooltip/FeeDetails"
import TokenSelect from "./TokenSelect"

const useStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.themeBackground.normal,
    padding: "2.8rem 3rem",
    borderRadius: "2rem",
  },
  input: {
    fontSize: "4rem",
    height: "4rem",
    padding: "0 0 2px",
    fontWeight: 600,
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
  },
}))

const BalanceInput = props => {
  const { value, onChange, onMaxAmount, token: selectedToken, tokenOptions, fee, disabled, onChangeToken, ...restProps } = props
  const { classes } = useStyles()

  const { balance } = useRainbowContext()

  const displayedBalance = useMemo(() => (disabled ? "0.00" : toTokenDisplay(balance, selectedToken.decimals)), [selectedToken, balance, disabled])

  const handleChangeAmount = e => {
    const amount = sanitizeNumericalString(e.target.value)
    onChange(amount)
  }

  const handleMaxAmount = useCallback(() => {
    const maxValue = toTokenDisplay((balance ?? BigInt(0)) - fee, selectedToken.decimals)
    onChange(maxValue)
  }, [balance, fee])

  return (
    <>
      <Stack direction="row" spacing="2rem" alignItems="center" className={classes.root} {...restProps}>
        <TokenSelect value={selectedToken} options={tokenOptions} onChange={onChangeToken}></TokenSelect>
        <Stack direction="column">
          <InputBase
            value={value}
            placeholder="0.00"
            disabled={disabled}
            classes={{ input: classes.input }}
            onChange={handleChangeAmount}
          ></InputBase>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 600, color: disabled ? "text.disabled" : "#0F8E7E" }}>
            {displayedBalance} available
          </Typography>
        </Stack>
        <Button className={classes.maxButton} variant="contained" color="info" disabled={disabled} onClick={handleMaxAmount}>
          Max
        </Button>
      </Stack>

      <DetailRow
        title="Fees"
        sx={{ mt: "0.8rem" }}
        tooltip={<FeeDetails />}
        value={
          <>
            <Typography>{value ? toTokenDisplay(fee, selectedToken.decimals, ETH_SYMBOL) : "-"}</Typography>
          </>
        }
        large
      />
    </>
  )
}

export default BalanceInput
