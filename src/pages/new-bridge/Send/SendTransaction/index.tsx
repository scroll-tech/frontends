import { ethers } from "ethers"
import { useMemo, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import useStorage from "squirrel-gill"

import { Box, Stack, Typography } from "@mui/material"

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETH_SYMBOL, GATEWAY_ROUTE_PROXY_ADDR, WETH_GATEWAY_PROXY_ADDR } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useApp } from "@/contexts/AppContextProvider"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useApprove, useAsyncMemo } from "@/hooks"
import useCheckValidAmount from "@/hooks/useCheckValidAmount"
import useBridgeStore from "@/stores/bridgeStore"
import { amountToBN, switchNetwork, toTokenDisplay } from "@/utils"

import useGasFee from "../../hooks/useGasFee"
import { useSendTransaction } from "../../hooks/useSendTransaction"
import useSufficientBalance from "../../hooks/useSufficientBalance"
import BalanceInput from "./BalanceInput"
import DetailRow from "./InfoTooltip/DetailRow"
import FeeDetails from "./InfoTooltip/FeeDetails"
import NetworkDirection from "./NetworkDirection"

const SendTransaction = props => {
  const { chainId, balance, connect, walletName } = useRainbowContext()
  // TODO: extract tokenList
  const { tokenList, networksAndSigners } = useApp()
  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)
  const { gasLimit, gasPrice } = usePriceFeeContext()

  const { txType, isNetworkCorrect, fromNetwork } = useBridgeStore()

  const [amount, setAmount] = useState<string>()
  const [sendError, setSendError] = useState<any>()

  const tokenOptions = useMemo(() => {
    return fromNetwork.chainId ? tokenList.filter(item => item.chainId === fromNetwork.chainId) : []
  }, [tokenList, fromNetwork])

  const selectedToken: any = useMemo(() => tokenOptions.find(item => item.symbol === tokenSymbol) ?? {}, [tokenOptions, tokenSymbol])

  const { checkApproval } = useApprove(selectedToken)

  const { send: sendTransaction, sending } = useSendTransaction({
    amount,
    setSendError,
    selectedToken,
  })

  const { isValid, message: invalidAmountMessage } = useCheckValidAmount(amount)

  // fee start
  const estimatedGasCost = useGasFee(selectedToken)

  const totalFee = useMemo(() => (estimatedGasCost ?? BigInt(0)) + gasLimit * gasPrice, [estimatedGasCost, gasLimit, gasPrice])

  const { insufficientWarning } = useSufficientBalance(
    selectedToken,
    amount ? amountToBN(amount, selectedToken.decimals) : undefined,
    totalFee,
    balance ?? undefined,
  )
  // fee end

  const displayedFee = useMemo(() => {
    if (!isNetworkCorrect || !amount) {
      return "-"
    }
    return toTokenDisplay(totalFee, selectedToken.decimals, ETH_SYMBOL)
  }, [isNetworkCorrect, amount, totalFee, selectedToken])

  const bridgeWarning = useMemo(() => {
    if (!chainId) {
      return (
        <>
          Your wallet is not connected.{" "}
          <TextButton underline="always" onClick={connect}>
            Please connect your wallet to proceed.
          </TextButton>
        </>
      )
    } else if (!isNetworkCorrect) {
      return (
        <>
          Your wallet is connected to an unsupported network.{" "}
          <TextButton underline="always" onClick={() => switchNetwork(fromNetwork.chainId)}>
            Click here to switch to {fromNetwork.name}.
          </TextButton>
        </>
      )
    } else if (insufficientWarning) {
      return insufficientWarning
    } else if (!isValid) {
      return invalidAmountMessage
    } else if (sendError && sendError !== "cancel" && sendError.code !== 4001) {
      return (
        <>
          The transaction failed. Your {walletName} wallet might not be up to date.{" "}
          <TextButton underline="always" onClick={() => window.open("https://guide.scroll.io/user-guide/common-errors")}>
            Reset your {walletName} account
          </TextButton>
          {" before using Scroll Bridge."}
        </>
      )
    }
    return null
  }, [chainId, isNetworkCorrect, fromNetwork, insufficientWarning, isValid, invalidAmountMessage])

  const necessaryCondition = useMemo(() => {
    return amount && !bridgeWarning
  }, [amount, bridgeWarning])

  const approveAddress = useMemo(() => {
    if (!fromNetwork.isL1 && selectedToken.symbol === "WETH") return WETH_GATEWAY_PROXY_ADDR[fromNetwork.chainId]
    return GATEWAY_ROUTE_PROXY_ADDR[fromNetwork.chainId]
  }, [fromNetwork, selectedToken])

  const needApproval = useAsyncMemo(async () => {
    if (!necessaryCondition || (selectedToken as NativeToken).native) {
      return false
    }

    try {
      const parsedAmount = amountToBN(amount, selectedToken.decimals)
      const Token = new ethers.Contract((selectedToken as ERC20Token).address, L1_erc20ABI, networksAndSigners[chainId as number].signer)
      return checkApproval(parsedAmount, Token, approveAddress)
    } catch (err) {
      return false
    }
  }, [selectedToken, necessaryCondition, checkApproval, amount])

  const sendButtonActive = useMemo(() => {
    return !needApproval && necessaryCondition
  }, [needApproval, necessaryCondition])

  const handleApprove = async () => {
    const tokenInstance = new ethers.Contract((selectedToken as ERC20Token).address, L1_erc20ABI, networksAndSigners[chainId as number].signer)
    const tx = await tokenInstance.approve(approveAddress, ethers.MaxUint256)
    await tx?.wait()
  }

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
    <Stack direction="column" alignItems="center" sx={{ height: ["31rem", "34rem"] }}>
      <NetworkDirection></NetworkDirection>
      <BalanceInput
        sx={{ mt: "3rem" }}
        value={amount}
        onChange={handleChangeAmount}
        token={selectedToken}
        fee={totalFee}
        disabled={fromNetwork.chainId !== chainId}
        tokenOptions={tokenOptions}
        onChangeToken={handleChangeTokenSymbol}
      ></BalanceInput>
      <DetailRow title="Fees" sx={{ my: "0.8rem" }} tooltip={<FeeDetails />} value={<Typography>{displayedFee}</Typography>} large />
      <Typography sx={{ fontSize: "1.4rem", fontWeight: 500, width: "32.4rem", textAlign: "center", margin: "0 auto" }} color="primary">
        {bridgeWarning}
      </Typography>
      <Box sx={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
        {needApproval ? (
          <Button width={isMobileOnly ? "100%" : "25rem"} color="primary" disabled={!needApproval} onClick={handleApprove}>
            Approve {tokenSymbol}
          </Button>
        ) : (
          <Button width={isMobileOnly ? "100%" : "22rem"} color="primary" disabled={!sendButtonActive} loading={sending} onClick={handleSend}>
            {txType === "Deposit" ? "Depositing Funds" : "Withdraw Funds"}
          </Button>
        )}
      </Box>
    </Stack>
  )
}

export default SendTransaction
