import { ethers } from "ethers"
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react"
import useStorage from "squirrel-gill"

import { Alert, Typography } from "@mui/material"

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import LoadingButton from "@/components/LoadingButton"
import TextButton from "@/components/TextButton"
import { CHAIN_ID, ETH_SYMBOL, NETWORKS, STANDARD_ERC20_GATEWAY_PROXY_ADDR } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useApprove, useAsyncMemo, useBalance, useSufficientBalance } from "@/hooks"
import { usePriceFee } from "@/hooks"
import useCheckValidAmount from "@/hooks/useCheckValidAmount"
import { amountToBN, sanitizeNumericalString, switchNetwork } from "@/utils"
import { toTokenDisplay } from "@/utils"

import DetailRow from "../components/InfoTooltip/DetailRow"
import FeeDetails from "../components/InfoTooltip/FeeDetails"
import ApproveLoading from "./ApproveLoading"
import SendAmountSelectorCard from "./SendAmountSelectorCard"
import SendLoading from "./SendLoading"
import SendTranferButton from "./SendTransferButton"
import { useEstimateSendTransaction } from "./useEstimateSendTransaction"
import { StyleContext, useSendStyles } from "./useSendStyles"
import { useSendTransaction } from "./useSendTransaction"

const Send: FC = () => {
  const { checkConnectedChainId, chainId, walletName, connect } = useRainbowContext()

  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)
  const { classes: styles, cx } = useSendStyles()
  const { networksAndSigners, tokenList } = useApp()

  const [fromNetwork, setFromNetwork] = useState({} as any)
  const [toNetwork, setToNetwork] = useState({} as any)
  const [totalBonderFeeDisplay, setTotalBonderFeeDisplay] = useState("-")
  const [estimatedGasCost, setEstimatedGasCost] = useState<undefined | bigint>(undefined)
  const [sendingModalOpen, setSendingModalOpen] = useState(false)

  const fromToken = useMemo(
    () => tokenList.find(item => item.chainId === fromNetwork.chainId && item.symbol === tokenSymbol) ?? ({} as any as Token),
    [tokenList, tokenSymbol, fromNetwork],
  )

  const toToken = useMemo(
    () => tokenList.find(item => item.chainId === toNetwork.chainId && item.symbol === tokenSymbol) ?? ({} as any as Token),
    [tokenList, tokenSymbol, toNetwork],
  )

  const [fromTokenAmount, setFromTokenAmount] = useState<string>()
  const [sendError, setSendError] = useState<any>()
  const [approving, setApproving] = useState<boolean>(false)

  const { isValid, message: invalidAmountMessage } = useCheckValidAmount(fromTokenAmount)

  const fromTokenList = useMemo(() => {
    return fromNetwork.chainId ? tokenList.filter(item => item.chainId === fromNetwork.chainId) : []
  }, [tokenList, fromNetwork])

  // Change the bridge if user selects different token to send
  const handleChangeToken = (event: ChangeEvent<{ value: Token }>) => {
    setTokenSymbol(event.target.value.symbol)
  }
  const { balance: fromBalance, loading: loadingFromBalance } = useBalance(fromToken, fromNetwork)

  const { balance: toBalance, loading: loadingToBalance } = useBalance(toToken, toNetwork)
  useEffect(() => {
    if (chainId && Object.values(CHAIN_ID).includes(chainId)) {
      const fromNetworkIndex = NETWORKS.findIndex(item => item.chainId === chainId)
      setFromNetwork(NETWORKS[fromNetworkIndex])
      setToNetwork(NETWORKS[+!fromNetworkIndex])
    } else {
      setFromNetwork(NETWORKS[0])
      setToNetwork(NETWORKS[1])
    }
  }, [chainId, tokenList, tokenSymbol])

  const { estimateSend } = useEstimateSendTransaction({
    fromNetwork,
    toNetwork,
    selectedToken: fromToken,
  })

  const handleEstimateSend = async () => {
    if (networksAndSigners[fromNetwork.chainId]?.signer) {
      const { maxFeePerGas: gasPrice } = await networksAndSigners[fromNetwork.chainId].provider.getFeeData()
      try {
        const gasLimit = await estimateSend()
        const estimatedGasCost = BigInt(gasLimit) * BigInt(gasPrice || 1e9)
        setEstimatedGasCost(estimatedGasCost)
      } catch (error) {
        setEstimatedGasCost(undefined)
      }
    }
  }

  useEffect(() => {
    handleEstimateSend()
  }, [chainId, fromToken, fromTokenAmount])

  const isCorrectNetwork = useMemo(() => !!chainId && fromNetwork.chainId === chainId, [chainId, fromNetwork])
  const { getPriceFee } = usePriceFee()

  useEffect(() => {
    if (estimatedGasCost !== undefined) {
      handleTotalBonderFeeDisplay()
    }
  }, [chainId, fromTokenAmount, fromToken, estimatedGasCost])

  const handleTotalBonderFeeDisplay = async () => {
    if (networksAndSigners[fromNetwork.chainId]?.signer) {
      const fee = await getPriceFee(fromToken, fromNetwork.isL1)
      const display = fromTokenAmount ? toTokenDisplay(fee + (estimatedGasCost as bigint)) + " " + ETH_SYMBOL : "-"
      setTotalBonderFeeDisplay(display)
    }
  }

  const { warning } = useSufficientBalance(
    fromToken,
    networksAndSigners[fromNetwork.chainId],
    fromTokenAmount ? amountToBN(fromTokenAmount, fromToken.decimals) : undefined,
    estimatedGasCost,
    fromBalance ?? undefined,
    isCorrectNetwork,
  )

  // network->sufficient->tx error
  const warningTip = useMemo(() => {
    if (!walletName) {
      return <TextButton onClick={connect}>Click here to connect wallet.</TextButton>
    } else if (!isCorrectNetwork) {
      return (
        <>
          Your wallet is connected to an unsupported network.{" "}
          <TextButton onClick={() => handleSwitchNetwork(fromNetwork.chainId)}>Click here to switch to {fromNetwork.name}.</TextButton>
        </>
      )
    } else if (warning) {
      return warning
    } else if (!isValid) {
      return invalidAmountMessage
    } else if (sendError && sendError !== "cancel" && sendError.code !== 4001) {
      return (
        <>
          The transaction failed. Your {walletName} wallet might not be up to date.{" "}
          <b>
            <u
              onClick={() => window.open("https://guide.scroll.io/user-guide/common-errors")}
              style={{ textUnderlineOffset: "0.4rem", cursor: "pointer" }}
            >
              Reset your {walletName} account
            </u>
          </b>
          {" before using Scroll Bridge."}
        </>
      )
    }
    return null
  }, [walletName, connect, isCorrectNetwork, warning, sendError, fromNetwork, isValid])

  // Switch the fromNetwork <--> toNetwork
  const handleSwitchDirection = () => {
    setFromNetwork(toNetwork)
    setToNetwork(fromNetwork)
    handleSwitchNetwork(toNetwork.chainId)
  }

  const handleApprove = async () => {
    try {
      setApproving(true)
      await approveFromToken()
    } catch (error) {}
    setApproving(false)
  }

  // ==============================================================================================
  // Send tokens
  // ==============================================================================================

  const { send: handleSendTransaction, sending } = useSendTransaction({
    fromNetwork,
    fromTokenAmount,
    setSendError,
    toNetwork,
    selectedToken: fromToken,
  })

  useEffect(() => {
    //TODO: outermost error
    if (!sending && sendError !== "cancel") {
      setFromTokenAmount("")
    }
    setSendingModalOpen(sending)
  }, [sending])

  const txValue = useMemo(() => `${fromTokenAmount} ${tokenSymbol}`, [fromTokenAmount, tokenSymbol])

  const { checkApproval } = useApprove(fromToken)

  const necessaryCondition = useMemo(() => {
    return fromTokenAmount && !warningTip
  }, [fromTokenAmount, warningTip])

  const needsApproval = useAsyncMemo(async () => {
    if (!necessaryCondition || (fromToken as NativeToken).native) {
      return false
    }

    try {
      const parsedAmount = amountToBN(fromTokenAmount, fromToken.decimals)
      const Token = new ethers.Contract((fromToken as ERC20Token).address, L1_erc20ABI, networksAndSigners[chainId as number].signer)
      return checkApproval(parsedAmount, Token, STANDARD_ERC20_GATEWAY_PROXY_ADDR[chainId as number])
    } catch (err) {
      console.log("~~~err", err)
      return false
    }
  }, [fromNetwork, fromToken, necessaryCondition, checkApproval])

  const approveFromToken = async () => {
    // eslint-disable-next-line
    const parsedAmount = amountToBN(fromTokenAmount, fromToken.decimals)
    const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
    if (!isNetworkConnected) return
    const Token = new ethers.Contract((fromToken as ERC20Token).address, L1_erc20ABI, networksAndSigners[chainId as number].signer)
    const tx = await Token.approve(
      STANDARD_ERC20_GATEWAY_PROXY_ADDR[chainId as number],
      ethers.MaxUint256,
      // parsedAmount
    )
    await tx?.wait()
  }

  const sendButtonActive = useMemo(() => {
    return !needsApproval && necessaryCondition
  }, [needsApproval, necessaryCondition])

  const handleCloseSendLoading = () => {
    setSendingModalOpen(false)
  }

  const handleCloseApproveLoading = () => {
    setApproving(false)
  }

  const handleChangeFromAmount = value => {
    setSendError(undefined)
    const amountIn = sanitizeNumericalString(value)
    setFromTokenAmount(amountIn)
  }

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      await switchNetwork(chainId)
    } catch (error) {
      // when there is a switch-network popover in MetaMask and refreshing page would throw an error
      console.log(error, "error")
    }
  }

  return (
    <StyleContext.Provider value={styles}>
      <div className={cx("flex", "flex-col", "items-center", "bg-white", styles.sendWrapper)}>
        <div className={cx("flex", "flex-col", "items-center", styles.sendPanel)}>
          <SendAmountSelectorCard
            value={fromTokenAmount}
            token={fromToken}
            label={"From"}
            onChange={handleChangeFromAmount}
            selectedNetwork={fromNetwork}
            networkOptions={NETWORKS}
            balance={fromBalance}
            loadingBalance={loadingFromBalance}
            // fromNetwork={fromNetwork}
            tokenList={fromTokenList}
            onChangeToken={handleChangeToken}
          />
          <SendTranferButton disabled={!toToken.chainId || sending} onClick={handleSwitchDirection} />
          <SendAmountSelectorCard
            value="0.1"
            token={toToken}
            label={"To"}
            selectedNetwork={toNetwork}
            networkOptions={NETWORKS}
            balance={toBalance}
            loadingBalance={loadingToBalance}
            disableInput
          />

          <div className={styles.details}>
            <div className={styles.destinationTxFeeAndAmount}>
              <DetailRow
                title={"Fees"}
                tooltip={<FeeDetails />}
                value={
                  <>
                    <Typography>{totalBonderFeeDisplay}</Typography>
                  </>
                }
                large
              />
            </div>
          </div>

          {warningTip && (
            <Alert variant="standard" severity={sendError ? "error" : "warning"} style={{ marginTop: "2.4rem" }}>
              {warningTip}
            </Alert>
          )}

          {needsApproval ? (
            <LoadingButton
              sx={{ mt: "2rem", width: "100%" }}
              onClick={handleApprove}
              disabled={!needsApproval}
              loading={approving}
              variant="contained"
            >
              Approve USDC
            </LoadingButton>
          ) : (
            <LoadingButton
              sx={{ mt: "2rem", width: "100%" }}
              onClick={handleSendTransaction}
              disabled={!sendButtonActive}
              loading={sending}
              variant="contained"
            >
              Send {tokenSymbol} to {toNetwork.name}
            </LoadingButton>
          )}
          <ApproveLoading open={approving} onClose={handleCloseApproveLoading} />
          <SendLoading value={txValue} from={fromNetwork.name} to={toNetwork.name} open={sendingModalOpen} onClose={handleCloseSendLoading} />
        </div>
      </div>
    </StyleContext.Provider>
  )
}

export default Send
