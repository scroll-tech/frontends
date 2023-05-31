import classNames from "classnames"
import { ethers } from "ethers"
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react"
import useStorage from "squirrel-gill"

import { Alert, Typography } from "@mui/material"

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json"
import LoadingButton from "@/components/LoadingButton"
import TextButton from "@/components/TextButton"
import { ChainId, ERC20Token, ETH_SYMBOL, NativeToken, StandardERC20GatewayProxyAddr, Token, networks } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { useApprove, useAsyncMemo, useBalance, useSufficientBalance } from "@/hooks"
import { usePriceFee } from "@/hooks"
import { amountToBN, sanitizeNumericalString, switchNetwork } from "@/utils"
import { toTokenDisplay } from "@/utils"
import { BRIDGE_TOKEN_SYMBOL } from "@/utils/storageKey"

import ConfirmDialog from "../ConfirmDialog"
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
  const [tokenSymbol, setTokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)
  const { classes: styles, cx } = useSendStyles()
  const { networksAndSigners, tokenList } = useApp()

  const [fromNetwork, setFromNetwork] = useState({} as any)
  const [ConfirmDialogVisible, setConfirmDialogVisible] = useState(false)
  const [toNetwork, setToNetwork] = useState({} as any)
  const [totalBonderFeeDisplay, setTotalBonderFeeDisplay] = useState("-")
  const [estimatedGasCost, setEstimatedGasCost] = useState<undefined | bigint>(undefined)

  const { checkConnectedChainId, chainId, walletName, connectWallet } = useWeb3Context()

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
  const [error, setError] = useState<string | null | undefined>(null)
  const [approving, setApproving] = useState<boolean>(false)

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
    if (chainId && Object.values(ChainId).includes(chainId)) {
      const fromNetworkIndex = networks.findIndex(item => item.chainId === chainId)
      setFromNetwork(networks[fromNetworkIndex])
      setToNetwork(networks[+!fromNetworkIndex])
    } else {
      setFromNetwork(networks[0])
      setToNetwork(networks[1])
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
        const estimatedGasCost = (BigInt(gasLimit) * BigInt(gasPrice || 1e9) * BigInt(140)) / BigInt(100)
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
    handleTotalBonderFeeDisplay()
  }, [chainId, fromTokenAmount, fromToken])

  const handleTotalBonderFeeDisplay = async () => {
    if (networksAndSigners[fromNetwork.chainId]?.signer) {
      const fee = await getPriceFee(fromToken, fromNetwork.isLayer1)
      const display = fromTokenAmount ? toTokenDisplay(fee) + " " + ETH_SYMBOL : "-"
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
      return <TextButton onClick={connectWallet}>Click here to connect wallet.</TextButton>
    } else if (!isCorrectNetwork) {
      return (
        <>
          Your wallet is connected to an unsupported network.{" "}
          <TextButton onClick={() => handleSwitchNetwork(fromNetwork.chainId)}>Click here to switch to {fromNetwork.name}.</TextButton>
        </>
      )
    } else if (warning) {
      return warning
    } else if (sendError && sendError.code !== "ACTION_REJECTED" && sendError.code !== 4001) {
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
  }, [walletName, connectWallet, isCorrectNetwork, warning, sendError, fromNetwork])

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

  const {
    send: handleSendTransaction,
    sending,
    setSending,
  } = useSendTransaction({
    fromNetwork,
    fromTokenAmount,
    setSendError,
    setError,
    toNetwork,
    selectedToken: fromToken,
  })

  useEffect(() => {
    if (!sending && error !== "cancel") {
      setFromTokenAmount("")
    }
  }, [sending])

  const txValue = useMemo(() => `${fromTokenAmount} ${tokenSymbol}`, [fromTokenAmount, tokenSymbol])

  const { checkApproval } = useApprove(fromToken)

  const needsApproval = useAsyncMemo(async () => {
    if (
      !(networksAndSigners[ChainId.SCROLL_LAYER_1].gateway || networksAndSigners[ChainId.SCROLL_LAYER_2].gateway) ||
      !Number(fromTokenAmount) ||
      chainId !== fromNetwork.chainId ||
      (fromToken as NativeToken).native
    ) {
      return false
    }

    try {
      const parsedAmount = amountToBN(fromTokenAmount, fromToken.decimals)
      const Token = new ethers.Contract((fromToken as ERC20Token).address, L1_erc20ABI, networksAndSigners[chainId as number].signer)
      return checkApproval(parsedAmount, Token, StandardERC20GatewayProxyAddr[chainId as number])
    } catch (err) {
      console.log("~~~err", err)
      return false
    }
  }, [fromNetwork, fromToken, fromTokenAmount, checkApproval])

  const approveFromToken = async () => {
    // eslint-disable-next-line
    const parsedAmount = amountToBN(fromTokenAmount, fromToken.decimals)
    const isNetworkConnected = await checkConnectedChainId(fromNetwork.chainId)
    if (!isNetworkConnected) return
    const Token = new ethers.Contract((fromToken as ERC20Token).address, L1_erc20ABI, networksAndSigners[chainId as number].signer)
    const tx = await Token.approve(
      StandardERC20GatewayProxyAddr[chainId as number],
      ethers.MaxUint256,
      // parsedAmount
    )
    await tx?.wait()
  }

  const sendButtonActive = useMemo(() => {
    return !!(!needsApproval && fromTokenAmount && !warningTip)
  }, [needsApproval, fromTokenAmount, warningTip])

  const handleCloseSendLoading = () => {
    setSending(false)
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
      // cancel switch network in MetaMask would not throw error and the result is null just like successfully switched
      await switchNetwork(chainId)
    } catch (error) {
      // when there is a switch-network popover in MetaMask and refreshing page would throw an error
      console.log(error, "error")
    }
  }

  const handleSend = () => {
    if (fromNetwork.chainId === ChainId.SCROLL_LAYER_1) {
      handleSendTransaction()
    } else {
      setConfirmDialogVisible(true)
    }
  }

  const approveButtonActive = needsApproval
  return (
    <StyleContext.Provider value={styles}>
      <div className={cx("flex", "flex-col", "items-center", "bg-white", styles.sendWrapper)}>
        <div className={classNames("flex", "flex-col", "items-center", styles.sendPanel)}>
          <SendAmountSelectorCard
            value={fromTokenAmount}
            token={fromToken}
            label={"From"}
            onChange={handleChangeFromAmount}
            selectedNetwork={fromNetwork}
            networkOptions={networks}
            balance={fromBalance}
            loadingBalance={loadingFromBalance}
            // fromNetwork={fromNetwork}
            tokenList={fromTokenList}
            onChangeToken={handleChangeToken}
          />
          <SendTranferButton disabled={!toToken.chainId} onClick={handleSwitchDirection} />
          <SendAmountSelectorCard
            value="0.1"
            token={toToken}
            label={"To"}
            selectedNetwork={toNetwork}
            networkOptions={networks}
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
              disabled={!approveButtonActive}
              loading={approving}
              variant="contained"
            >
              Approve USDC
            </LoadingButton>
          ) : (
            <LoadingButton sx={{ mt: "2rem", width: "100%" }} onClick={handleSend} disabled={!sendButtonActive} loading={sending} variant="contained">
              Send {tokenSymbol} to {toNetwork.name}
            </LoadingButton>
          )}
          <ApproveLoading open={approving} onClose={handleCloseApproveLoading} />
          <SendLoading value={txValue} from={fromNetwork.name} to={toNetwork.name} open={sending} onClose={handleCloseSendLoading} />
        </div>
      </div>
      <ConfirmDialog open={ConfirmDialogVisible} setOpen={setConfirmDialogVisible} send={handleSendTransaction} />
    </StyleContext.Provider>
  )
}

export default Send
