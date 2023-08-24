import { useMemo } from "react"
import { isMobileOnly } from "react-device-detect"
import useStorage from "squirrel-gill"

import { Alert, Box, Typography } from "@mui/material"

import Button from "@/components/Button"
import Link from "@/components/Link"
import TextButton from "@/components/TextButton"
import TxAlert from "@/components/TxAlert"
import { ETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import useBridgeStore from "@/stores/bridgeStore"

const TxSuccess = () => {
  const { fromNetwork, toNetwork, txResult, changeTxResult, txType, withDrawStep, changeWithdrawStep } = useBridgeStore()
  const [tokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)

  const transactionUrl = useMemo(() => `${fromNetwork.explorer}/tx/${txResult?.hash}`, [fromNetwork, txResult])

  const handleReturnDeposit = () => {
    changeTxResult(null)
  }

  // TODO: need confirm
  const handleReturnWithdraw = () => {
    changeWithdrawStep("1")
    changeTxResult(null)
  }

  const handleClaim = () => {
    changeWithdrawStep("2")
    changeTxResult(null)
  }

  if (txType === "Deposit") {
    return (
      <Box sx={{ height: "34rem" }}>
        <TxAlert severity="success">Success!</TxAlert>

        <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "2.5rem" }}>
          Moving {txResult?.amount} {tokenSymbol} to {toNetwork.name}
        </Typography>
        <Typography>...Approximately 20 minutes remaining</Typography>
        <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "4rem" }}>
          This is your tx hash: <Typography sx={{ fontWeight: 400 }}>{txResult?.hash}</Typography>
        </Typography>
        <Link sx={{ color: "success.main" }} underline="always" href={transactionUrl} external>
          Check your transaction in our block explorer
        </Link>
        <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "4rem" }}>Deposit more {tokenSymbol}</Typography>
        <TextButton sx={{ color: "success.main" }} underline="always" onClick={handleReturnDeposit}>
          Return to Deposit
        </TextButton>
      </Box>
    )
  } else if (txType === "Withdraw" && withDrawStep === "1") {
    return (
      <Box sx={{ height: "34rem" }}>
        <Alert icon={false} severity="success" sx={{ fontSize: "2.4rem", fontWeight: "600", textAlign: "center" }}>
          Success!
        </Alert>
        <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "2.5rem" }}>
          Moving {txResult?.amount} {tokenSymbol} to {toNetwork.name}
        </Typography>
        <Typography>...Approximately 20 minutes remaining</Typography>
        <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "4rem" }}>
          This is your tx hash: <Typography sx={{ fontWeight: 400 }}>{txResult?.hash}</Typography>
        </Typography>
        <Link sx={{ color: "success.main", marginBottom: "4.8rem" }} underline="always" href={transactionUrl} external>
          Check your transaction in our block explorer
        </Link>

        <Box sx={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%", marginTop: "4.8rem", justifyContent: "center" }}>
          <Button width={isMobileOnly ? "100%" : "35rem"} color="primary" onClick={handleClaim}>
            Claim Funds on Ethereum
          </Button>
        </Box>
      </Box>
    )
  }
  return (
    <Box sx={{ height: "34rem" }}>
      <Alert icon={false} severity="success" sx={{ fontSize: "2.4rem", fontWeight: "600", textAlign: "center" }}>
        Success!
      </Alert>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "2.5rem" }}>
        Moving {txResult?.amount} {tokenSymbol} to {toNetwork.name}
      </Typography>
      <Typography>...Approximately 20 minutes remaining</Typography>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "4rem" }}>
        This is your tx hash: <Typography sx={{ fontWeight: 400 }}>{txResult?.hash}</Typography>
      </Typography>
      <Link sx={{ color: "success.main" }} href={transactionUrl} underline="always" external>
        Check your transaction in our block explorer
      </Link>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mt: "4rem" }}>Withdraw more {tokenSymbol}</Typography>
      <TextButton sx={{ color: "success.main" }} underline="always" onClick={handleReturnWithdraw}>
        Return to Withdraw
      </TextButton>
    </Box>
  )
}

export default TxSuccess
