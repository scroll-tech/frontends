import { useEffect, useMemo, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import useStorage from "squirrel-gill"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useApp } from "@/contexts/AppContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"
import { amountToBN, switchNetwork, toTokenDisplay } from "@/utils"

import useApprove from "../../hooks/useApprove"
import useBalance from "../../hooks/useBalance"
import useCheckValidAmount from "../../hooks/useCheckValidAmount"
import useGasFee from "../../hooks/useGasFee"
import { useSendTransaction } from "../../hooks/useSendTransaction"
import useSufficientBalance from "../../hooks/useSufficientBalance"
import BalanceInput from "./BalanceInput"
import DetailRow from "./InfoTooltip/DetailRow"
import FeeDetails from "./InfoTooltip/FeeDetails"
import NetworkDirection from "./NetworkDirection"

const SendTransaction = props => {
  const { chainId, connect } = useRainbowContext()
  // TODO: extract tokenList
  const { tokenList } = useApp()
  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)

  const { gasLimit, gasPrice, errorMessage: priceFeeErrorMessage, fetchData: fetchPriceFee } = usePriceFeeContext()

  const { txType, isNetworkCorrect, fromNetwork, changeTxError } = useBridgeStore()

  const [amount, setAmount] = useState<string>()

  const tokenOptions = useMemo(() => {
    return fromNetwork.chainId ? tokenList.filter(item => item.chainId === fromNetwork.chainId) : []
  }, [tokenList, fromNetwork])

  const selectedToken: any = useMemo(() => tokenOptions.find(item => item.symbol === tokenSymbol) ?? {}, [tokenOptions, tokenSymbol])

  const { balance, isLoading: balanceLoading } = useBalance(selectedToken.address)

  const { isNeeded: needApproval, approve, isLoading: approveLoading } = useApprove(fromNetwork, selectedToken, amount)

  const {
    send: sendTransaction,
    isLoading: sendLoading,
    error: sendError,
  } = useSendTransaction({
    amount,
    selectedToken,
  })

  const invalidAmountMessage = useCheckValidAmount(amount)
  // fee start
  const { gasFee: estimatedGasCost } = useGasFee(selectedToken)

  const totalFee = useMemo(() => estimatedGasCost + gasLimit * gasPrice, [estimatedGasCost, gasLimit, gasPrice])

  const { insufficientWarning } = useSufficientBalance(
    selectedToken,
    amount ? amountToBN(amount, selectedToken.decimals) : undefined,
    totalFee,
    balance ?? undefined,
  )
  // fee end

  const displayedFee = useMemo(() => {
    if (!isNetworkCorrect || !amount) {
      return <Typography>-</Typography>
    }
    if (priceFeeErrorMessage) {
      return <Typography sx={{ color: "primary.main" }}>-</Typography>
    }
    return toTokenDisplay(totalFee, selectedToken.decimals, ETH_SYMBOL)
  }, [isNetworkCorrect, amount, totalFee, selectedToken, priceFeeErrorMessage])

  const bridgeWarning = useMemo(() => {
    if (!chainId) {
      return (
        <>
          Your wallet is not connected.{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={connect}>
            Please connect your wallet to proceed.
          </TextButton>
        </>
      )
    } else if (!isNetworkCorrect) {
      return (
        <>
          Your wallet is connected to an unsupported network.{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={() => switchNetwork(fromNetwork.chainId)}>
            Click here to switch to {fromNetwork.name}.
          </TextButton>
        </>
      )
    } else if (insufficientWarning) {
      return insufficientWarning
    } else if (invalidAmountMessage) {
      return invalidAmountMessage
    } else if (priceFeeErrorMessage && amount) {
      return (
        <>
          {priceFeeErrorMessage},{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={() => fetchPriceFee()}>
            Click here to retry.
          </TextButton>
        </>
      )
    }
    return null
  }, [chainId, isNetworkCorrect, fromNetwork, insufficientWarning, invalidAmountMessage, priceFeeErrorMessage, amount])

  const necessaryCondition = useMemo(() => {
    return amount && !bridgeWarning
  }, [amount, bridgeWarning])

  const sendText = useMemo(() => {
    if (txType === "Deposit" && sendLoading) {
      return "Depositing Funds"
    } else if (txType === "Deposit" && !sendLoading) {
      return "Deposit Funds"
    } else if (txType === "Withdraw" && sendLoading) {
      return "Withdraw Funds"
    }
    return "Withdrawing Funds"
  }, [txType, sendLoading])

  useEffect(() => {
    // TODO: refactor
    // sendError: undefined  tx success
    // sendError: !(cancel||reject)  tx failure
    if (!sendLoading && sendError !== "cancel" && sendError !== "reject") {
      setAmount("")
    }
  }, [sendLoading, sendError])

  useEffect(() => {
    if (sendError && sendError !== "cancel" && sendError !== "reject") {
      changeTxError({ message: sendError.message })
    } else {
      changeTxError(null)
    }
  }, [sendError])

  const handleSend = () => {
    if (fromNetwork.isL1) {
      sendTransaction()
    } else {
      sendTransaction()
      // TODO: withdraw
    }
  }

  const handleChangeTokenSymbol = e => {
    setTokenSymbol(e.target.value.symbol)
  }

  const handleChangeAmount = value => {
    setAmount(value)
  }

  return (
    <Stack direction="column" alignItems="center" sx={{ height: ["30rem", "34rem"] }}>
      <NetworkDirection></NetworkDirection>
      <BalanceInput
        sx={{ mt: "3rem" }}
        value={amount}
        onChange={handleChangeAmount}
        token={selectedToken}
        fee={totalFee}
        balance={balance}
        balanceLoading={balanceLoading}
        disabled={fromNetwork.chainId !== chainId}
        tokenOptions={tokenOptions}
        onChangeToken={handleChangeTokenSymbol}
      ></BalanceInput>
      <DetailRow title="Fees" sx={{ my: "0.8rem" }} tooltip={<FeeDetails />} value={displayedFee} large />
      <Typography sx={{ fontSize: "1.4rem", fontWeight: 500, width: ["100%", "32.4rem"], textAlign: "center", margin: "0 auto" }} color="primary">
        {bridgeWarning}
      </Typography>
      <Box sx={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
        {needApproval ? (
          <Button
            key="approve"
            width={isMobileOnly ? "100%" : "25rem"}
            color="primary"
            disabled={!needApproval || !necessaryCondition}
            loading={approveLoading}
            onClick={approve}
          >
            {approveLoading ? "Approving " : "Approve "}
            {tokenSymbol}
          </Button>
        ) : (
          <Button
            key="send"
            width={isMobileOnly ? "100%" : "25rem"}
            color="primary"
            disabled={!necessaryCondition}
            loading={sendLoading}
            onClick={handleSend}
          >
            {sendText}
          </Button>
        )}
      </Box>
    </Stack>
  )
}

export default SendTransaction
