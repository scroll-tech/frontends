import { useEffect, useMemo, useState } from "react"
import useStorage from "squirrel-gill"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as InfoSvg } from "@/assets/svgs/refactor/bridge-info.svg"
import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useApp } from "@/contexts/AppContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useBalance } from "@/hooks"
import useCheckViewport from "@/hooks/useCheckViewport"
import useBridgeStore from "@/stores/bridgeStore"
import { amountToBN, switchNetwork } from "@/utils"

import useApprove from "../../hooks/useApprove"
// import useBalance from "../../hooks/useBalance"
// import useCheckValidAmount from "../../hooks/useCheckValidAmount"
import useGasFee from "../../hooks/useGasFee"
import { useSendTransaction } from "../../hooks/useSendTransaction"
import useSufficientBalance from "../../hooks/useSufficientBalance"
import BalanceInput from "./BalanceInput"
import NetworkDirection from "./NetworkDirection"
import TransactionSummary from "./TransactionSummary"

const SendTransaction = props => {
  const { chainId, connect } = useRainbowContext()
  // TODO: extract tokenList
  const { tokenList } = useApp()
  const { isMobile } = useCheckViewport()
  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)

  const { gasLimit, gasPrice, errorMessage: relayFeeErrorMessage, fetchData: fetchPriceFee } = usePriceFeeContext()

  const { txType, isNetworkCorrect, fromNetwork, changeTxResult } = useBridgeStore()

  const [amount, setAmount] = useState<string>()

  const tokenOptions = useMemo(() => {
    return fromNetwork.chainId ? tokenList.filter(item => item.chainId === fromNetwork.chainId) : []
  }, [tokenList, fromNetwork])

  const selectedToken: any = useMemo(() => tokenOptions.find(item => item.symbol === tokenSymbol) ?? {}, [tokenOptions, tokenSymbol])

  // const { balance, isLoading: balanceLoading } = useBalance(selectedToken.address)
  const { balance, loading: balanceLoading } = useBalance(selectedToken, fromNetwork)

  const { isNeeded: needApproval, approve, isLoading: approveLoading } = useApprove(fromNetwork, selectedToken, amount)
  const {
    send: sendTransaction,
    isLoading: sendLoading,
    error: sendError,
  } = useSendTransaction({
    amount,
    selectedToken,
  })

  // fee start
  const {
    gasFee: estimatedGasCost,
    error: gasFeeErrorMessage,
    calculateGasFee,
    displayedGasFee: displayedEstimatedGasCost,
  } = useGasFee(selectedToken, needApproval)

  const relayFee = useMemo(() => (gasLimit && gasPrice ? gasLimit * gasPrice : null), [gasLimit, gasPrice])
  const totalFee = useMemo(() => (estimatedGasCost && relayFee ? estimatedGasCost + relayFee : null), [estimatedGasCost, relayFee])

  const { insufficientWarning } = useSufficientBalance(
    selectedToken,
    amount ? amountToBN(amount, selectedToken.decimals) : undefined,
    totalFee,
    balance ?? undefined,
  )
  // fee end
  const bridgeWarning = useMemo(() => {
    if (gasFeeErrorMessage && amount) {
      return (
        <>
          {gasFeeErrorMessage},{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem", verticalAlign: "middle" }} onClick={() => calculateGasFee()}>
            Click here to retry.
          </TextButton>
        </>
      )
    } else if (relayFeeErrorMessage && amount && !needApproval) {
      return (
        <>
          {relayFeeErrorMessage},{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem", verticalAlign: "middle" }} onClick={() => fetchPriceFee()}>
            Click here to retry.
          </TextButton>
        </>
      )
    } else if (insufficientWarning) {
      return insufficientWarning
    }
    return null
  }, [insufficientWarning, relayFeeErrorMessage, amount, gasFeeErrorMessage, needApproval])

  const necessaryCondition = useMemo(() => {
    return amount && !bridgeWarning
  }, [amount, bridgeWarning])

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
      changeTxResult({ code: 0, message: sendError.message })
    }
  }, [sendError])

  const handleSend = () => {
    sendTransaction()
  }

  const handleChangeTokenSymbol = symbol => {
    setTokenSymbol(symbol)
  }

  const handleChangeAmount = value => {
    setAmount(value)
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
          onClick={approve}
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
        disabled={!necessaryCondition}
        loading={sendLoading}
        onClick={handleSend}
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
        token={selectedToken}
        fee={totalFee}
        balance={balance}
        balanceLoading={balanceLoading}
        disabled={fromNetwork.chainId !== chainId}
        readOnly={approveLoading || sendLoading}
        tokenOptions={tokenOptions}
        onChangeToken={handleChangeTokenSymbol}
      ></BalanceInput>
      <Box sx={{ height: "2rem", width: "100%" }}>
        {bridgeWarning && (
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
            <SvgIcon sx={{ fontSize: "1.4rem", mr: "0.4rem", verticalAlign: "middle" }} component={InfoSvg} inheritViewBox></SvgIcon>
            <span style={{ verticalAlign: "middle" }}>{bridgeWarning}</span>
          </Typography>
        )}
      </Box>

      <TransactionSummary
        selectedToken={selectedToken}
        amount={amount}
        feeError={relayFeeErrorMessage || gasFeeErrorMessage}
        // totalFee={displayedEstimatedGasCost}
        l2GasFee={relayFee}
        l1GasFee={displayedEstimatedGasCost}
        bridgeWarning={bridgeWarning}
        needApproval={needApproval}
      />

      <Box
        sx={{
          mt: ["2.4rem", "2.8rem"],
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
          justifyContent: "center",
          "& .MuiButtonBase-root": { fontFamily: "var(--onboard-font-family-normal) !important" },
        }}
      >
        {renderButton()}
      </Box>
    </Stack>
  )
}

export default SendTransaction
