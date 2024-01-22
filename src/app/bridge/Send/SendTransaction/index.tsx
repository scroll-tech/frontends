import { useEffect, useMemo, useState } from "react"
import useStorage from "squirrel-gill"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import WarningSvg from "@/assets/svgs/bridge/warning.svg"
import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo, useBalance } from "@/hooks"
import useApprove from "@/hooks/useApprove"
import useCheckViewport from "@/hooks/useCheckViewport"
// import useBalance from "@/hooks/useViemBalance"
import useGasFee from "@/hooks/useGasFee"
import { useSendTransaction } from "@/hooks/useSendTransaction"
import useSufficientBalance from "@/hooks/useSufficientBalance"
import useBridgeStore from "@/stores/bridgeStore"
import { amountToBN, switchNetwork, trimErrorMessage } from "@/utils"

import ApprovalDialog from "./ApprovalDialog"
import BalanceInput from "./BalanceInput"
import NetworkDirection from "./NetworkDirection"
import TransactionSummary from "./TransactionSummary"

const SendTransaction = props => {
  const { chainId, connect } = useRainbowContext()
  // TODO: extract tokenList
  const { tokenList } = useBrigeContext()
  const { isMobile } = useCheckViewport()
  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)

  const { gasLimit, gasPrice, errorMessage: relayFeeErrorMessage, fetchData: fetchPriceFee, getL1DataFee } = usePriceFeeContext()

  const { txType, isNetworkCorrect, fromNetwork, changeTxResult } = useBridgeStore()

  const [amount, setAmount] = useState<string>("")

  const [maxWarning, setMaxWarning] = useState<string>()

  const [bridgeWarning, setBridgeWarning] = useState()
  const [inputError, setInputError] = useState(false)

  const [approvalVisible, setApprovalVisible] = useState(false)

  const validAmount = useMemo(() => (Number(amount) > 0 ? amount : ""), [amount])

  const tokenOptions = useMemo(() => {
    return fromNetwork.chainId ? tokenList.filter(item => item.chainId === fromNetwork.chainId) : []
  }, [tokenList, fromNetwork])

  const selectedToken: any = useMemo(() => tokenOptions.find(item => item.symbol === tokenSymbol) ?? {}, [tokenOptions, tokenSymbol])

  // const { balance, isLoading: balanceLoading } = useBalance(selectedToken.address)
  const { balance, loading: balanceLoading } = useBalance(selectedToken, fromNetwork)

  const {
    isNeeded: needApproval,
    approve,
    isRequested: isRequestedApproval,
    isLoading: approveLoading,
  } = useApprove(fromNetwork, selectedToken, validAmount)
  const {
    send: sendTransaction,
    isLoading: sendLoading,
    error: sendError,
  } = useSendTransaction({
    amount: validAmount,
    selectedToken,
  })

  // fee start
  const { gasFee: estimatedGasCost, gasLimit: txGasLimit, error: gasFeeErrorMessage, calculateGasFee } = useGasFee(selectedToken, needApproval)

  const l1DataFee = useAsyncMemo(
    async () =>
      txType === "Withdraw" && amount && txGasLimit
        ? await getL1DataFee(selectedToken, amountToBN(amount, selectedToken.decimals), txGasLimit)
        : BigInt(0),
    [amount, selectedToken, txGasLimit, txType],
  )

  const relayFee = useMemo(() => gasLimit * gasPrice, [gasLimit, gasPrice])
  const totalFee = useMemo(
    () => (estimatedGasCost && !relayFeeErrorMessage ? estimatedGasCost + relayFee + (l1DataFee ?? BigInt(0)) : null),
    [estimatedGasCost, relayFeeErrorMessage, relayFee, l1DataFee],
  )

  const { insufficientWarning } = useSufficientBalance(
    selectedToken,
    amount ? amountToBN(amount, selectedToken.decimals) : undefined,
    totalFee,
    balance ?? undefined,
  )

  useEffect(() => {
    let nextBridgeWarning
    let nextInputError = false
    if (!chainId) {
      nextBridgeWarning = (
        <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={connect}>
          Connect wallet
        </TextButton>
      )
    } else if (chainId !== fromNetwork.chainId) {
      nextBridgeWarning = (
        <>
          Wrong network.{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={() => switchNetwork(fromNetwork.chainId)}>
            Switch to {fromNetwork.name}
          </TextButton>
        </>
      )
    } else if (maxWarning && maxWarning !== "FeeError") {
      nextBridgeWarning = <>{maxWarning}</>
      nextInputError = true
    } else if (gasFeeErrorMessage && (validAmount || maxWarning) && needApproval === false) {
      nextBridgeWarning = (
        <>
          {gasFeeErrorMessage},{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={() => calculateGasFee()}>
            Click here to retry.
          </TextButton>
        </>
      )
    } else if (relayFeeErrorMessage && (validAmount || maxWarning) && needApproval === false) {
      nextBridgeWarning = (
        <>
          {relayFeeErrorMessage},{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={() => fetchPriceFee()}>
            Click here to retry.
          </TextButton>
        </>
      )
    } else if (insufficientWarning) {
      nextBridgeWarning = insufficientWarning
      nextInputError = insufficientWarning !== ">0"
    }
    setBridgeWarning(nextBridgeWarning)
    setInputError(nextInputError)
  }, [chainId, fromNetwork, maxWarning, insufficientWarning, relayFeeErrorMessage, validAmount, gasFeeErrorMessage, needApproval])

  // fee end

  const necessaryCondition = useMemo(() => {
    return validAmount && !bridgeWarning
  }, [validAmount, bridgeWarning])

  const sendText = useMemo(() => {
    if (txType === "Deposit" && sendLoading) {
      return "Depositing funds"
    } else if (txType === "Deposit" && !sendLoading) {
      return "Deposit funds"
    } else if (txType === "Withdraw" && sendLoading) {
      return "Withdrawing funds"
    }
    return "Withdraw funds"
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
      changeTxResult({ code: 0, message: trimErrorMessage(sendError.message) })
    }
  }, [sendError])

  useEffect(() => {
    setMaxWarning("")
  }, [balance, amount, totalFee])

  useEffect(() => {
    if (isRequestedApproval) {
      setApprovalVisible(false)
    }
  }, [isRequestedApproval])

  const handleChangeTokenSymbol = symbol => {
    setTokenSymbol(symbol)
  }

  const handleChangeAmount = value => {
    setAmount(value)
  }

  const handleOpenApprovalDialog = () => {
    setApprovalVisible(true)
  }

  const handleCloseApprovalDialog = () => {
    setApprovalVisible(false)
  }

  const handleError = value => {
    setMaxWarning(value)
  }

  const handleApprove = isMaximum => {
    approve(isMaximum)
  }

  const renderButton = () => {
    if (!chainId) {
      return (
        <Button key="connect" width={isMobile ? "100%" : "25rem"} color="primary" onClick={connect} whiteButton>
          Connect Wallet
        </Button>
      )
    }

    if (!isNetworkCorrect) {
      return (
        <Button key="switch" width={isMobile ? "100%" : "32rem"} color="primary" onClick={() => switchNetwork(fromNetwork.chainId)} whiteButton>
          Switch to {fromNetwork.name}
        </Button>
      )
    }

    if (needApproval) {
      return (
        <Button
          key="approve"
          width={isMobile ? "100%" : "25rem"}
          color="primary"
          disabled={!necessaryCondition}
          loading={approveLoading}
          onClick={handleOpenApprovalDialog}
          whiteButton
        >
          {approveLoading ? "Approving " : "Approve "}
          {tokenSymbol}
        </Button>
      )
    }

    return (
      <Button
        key="send"
        width={isMobile ? "100%" : "25rem"}
        color="primary"
        disabled={!necessaryCondition || needApproval === undefined}
        loading={sendLoading}
        onClick={sendTransaction}
        whiteButton
      >
        {sendText}
      </Button>
    )
  }

  return (
    <Stack direction="column" alignItems="center">
      <NetworkDirection></NetworkDirection>
      <BalanceInput
        sx={{ mt: "1.6rem" }}
        value={amount}
        onChange={handleChangeAmount}
        error={inputError}
        token={selectedToken}
        fee={totalFee}
        balance={balance}
        balanceLoading={balanceLoading}
        disabled={fromNetwork.chainId !== chainId}
        readOnly={approveLoading || sendLoading}
        tokenOptions={tokenOptions}
        onError={handleError}
        onChangeToken={handleChangeTokenSymbol}
      ></BalanceInput>
      <Box sx={{ height: "2rem", width: "100%" }}>
        {!!bridgeWarning && bridgeWarning !== ">0" && (
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 500,
              width: ["calc(100% + 1rem)", "100%"],
              "@media (max-width: 600px)": {
                marginLeft: "-0.5rem",
              },
            }}
            color="primary"
          >
            <SvgIcon
              sx={{
                fontSize: "1.6rem",
                mr: "0.8rem",
                verticalAlign: "middle",
                color: "#FF684B",
              }}
              component={WarningSvg}
              inheritViewBox
            ></SvgIcon>
            <Stack
              component="span"
              direction="row"
              style={{
                display: "inline-flex",
                verticalAlign: "middle",
                alignItems: "center",
                gap: "0.2rem",
              }}
            >
              {bridgeWarning}
            </Stack>
          </Typography>
        )}
      </Box>

      <TransactionSummary
        selectedToken={selectedToken}
        amount={validAmount}
        feeError={relayFeeErrorMessage || gasFeeErrorMessage}
        // totalFee={displayedEstimatedGasCost}
        l2GasFee={relayFee}
        l1GasFee={estimatedGasCost}
        l1DataFee={l1DataFee}
        needApproval={needApproval}
      />

      <Box
        sx={{
          mt: ["2.4rem", "2.8rem"],
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
          justifyContent: "center",
          "& .MuiButtonBase-root": {
            fontFamily: "var(--default-font-family) !important",
          },
        }}
      >
        {renderButton()}
      </Box>
      <ApprovalDialog
        open={approvalVisible}
        token={selectedToken}
        loading={approveLoading && !isRequestedApproval}
        onApprove={handleApprove}
        onClose={handleCloseApprovalDialog}
      ></ApprovalDialog>
    </Stack>
  )
}

export default SendTransaction
