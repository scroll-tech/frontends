// /* eslint-disable */
import { ChangeEvent, FC, useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Card, MenuItem, Skeleton, Typography } from "@mui/material"

import { Token } from "@/constants"
import { toTokenDisplay } from "@/utils"

import LargeTextField from "../components/LargeTextField"
import RaisedSelect from "../components/RaisedSelect"
import SelectOption from "../components/RaisedSelect/SelectOption"
import NetworkLabel from "./NetworkLabel"
import SelectedToken from "./SelectedToken"

type Props = {
  value?: string
  label: string
  token: Token
  onChange?: (value: string) => void
  fromNetwork?: any
  tokenList?: Token[]
  toNetwork?: any
  selectedNetwork?: any
  networkOptions: any[]
  onNetworkChange?: (network?: any) => void
  balance?: bigint
  loadingBalance?: boolean
  disableInput?: boolean
  deadline?: any
  setWarning?: (message: string) => void
  onChangeToken?: (event: ChangeEvent<{ value: Token }>) => void
}

const useStyles = makeStyles()(theme => {
  return {
    container: {
      width: "100%",
      boxSizing: "border-box",

      [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: "1.6rem",
      },
      padding: "2.8rem",
      borderRadius: "1rem",
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.boxShadows.sharp,
      transition: "all 0.15s ease-out",
    },
    selectItem: {
      "&.Mui-selected": {
        backgroundColor: theme.palette.scaleBackground.primary,
        "&:hover, &:focus": {
          backgroundColor: theme.palette.scaleBackground.primary,
        },
      },
      ".MuiTypography-root": {
        cursor: "pointer",
      },
      [theme.breakpoints.down("sm")]: {
        minHeight: "3.8rem",
      },
    },
    topRow: {
      marginBottom: "1.8rem",
    },
    networkSelectionBox: {
      display: "flex",
      alignItems: "center",
      transition: "all 0.15s ease-out",
    },
    networkLabel: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "0.4rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    networkIconContainer: {
      display: "flex",
      justifyContent: "center",
      width: "4rem",
      height: "4rem",
    },
    networkIcon: {
      display: "flex",
      height: "2.2rem",
      margin: "0.7rem",
    },
    balance: {
      display: "flex",
      alignItems: "center",
    },
    maxButton: {
      width: "5rem",
      height: "3rem",
      lineHeight: "3rem",
      textAlign: "center",
      borderRadius: "2rem",
      fontSize: "1.4rem",
      marginLeft: "1.4rem",
      cursor: "pointer",
      fontWeight: 600,
      border: "none",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.main,
      [theme.breakpoints.down("sm")]: {
        height: "2.2rem",
        lineHeight: "2.2rem",
      },
    },
  }
})

const SendAmountSelectorCard: FC<Props> = props => {
  const {
    value = "",
    label = "from",
    token,
    onChange,
    selectedNetwork,
    tokenList,
    balance,
    loadingBalance = false,
    disableInput = false,
    onChangeToken,
  } = props
  const { classes } = useStyles()

  const balanceLabel = useMemo(() => {
    return toTokenDisplay(balance, token?.decimals)
  }, [balance, token])

  const isToCard = useMemo(() => label === "To", [label])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange?.(value)
  }

  // TODO: max
  // const handleMaxClick = async () => {
  //   if (!(onChange && balance && token &&   deadline)) {
  //     return
  //   }
  //   let nativeTokenMaxGasCost = BigInt(0)
  //   if (token.isNativeToken) {
  //     if (!toNetwork && setWarning) {
  //       return setWarning('Please set a destination network to determine max value')
  //     }
  //     const options = {
  //       balance,
  //       token,
  //       fromNetwork,
  //       toNetwork,
  //       deadline,
  //     }
  //     try {
  //       const estimatedGasCost = await estimateSend(options)
  //       if (estimatedGasCost) {
  //         nativeTokenMaxGasCost = estimatedGasCost
  //       }
  //     } catch (error) {
  //       logger.error(error)
  //     }
  //   }
  //   let totalAmount = balance.sub(nativeTokenMaxGasCost)
  //   if (totalAmount.lt(0)) {
  //     totalAmount = BigInt(0)
  //   }
  //   const maxValue = formatUnits(totalAmount, token.decimals)
  //   onChange(maxValue)
  // }

  return (
    <Card className={classes.container}>
      <div className="flex justify-between items-center w-full">
        {isToCard ? (
          <div />
        ) : (
          <LargeTextField
            className="flex-1"
            value={value}
            onChange={handleInputChange}
            placeholder="0.00"
            leftAlign
            disabled={disableInput}
            sx={{
              fontFamily: "Inter",
              letterSpacing: "0.25px",
            }}
          />
        )}
        {isToCard ? (
          <SelectedToken icon={token.logoURI}>{token.symbol}</SelectedToken>
        ) : (
          <RaisedSelect value={token} onChange={onChangeToken}>
            {tokenList?.map((token: any) => (
              <MenuItem value={token} key={token.symbol} className={classes.selectItem}>
                <SelectOption icon={token.logoURI} label={token.symbol} />
              </MenuItem>
            ))}
          </RaisedSelect>
        )}
      </div>
      <div className="flex justify-between items-center w-full mt-4">
        <NetworkLabel network={selectedNetwork} />
        {loadingBalance ? (
          <Skeleton variant="text" width="15rem" />
        ) : balance ? (
          <div className="flex items-center justify-end flex-wrap">
            <Typography variant="subtitle2" color="textSecondary" align="right">
              Balance: {balanceLabel}
            </Typography>
            {/* {balance.gt(0) && !disableInput ? (
              <button
                className={classes.maxButton}
                onClick={handleMaxClick}
                title="Max amount you can send while still having enough to cover fees"
              >
                MAX
              </button>
            ) : null} */}
          </div>
        ) : null}
      </div>
    </Card>
  )
}

export default SendAmountSelectorCard
