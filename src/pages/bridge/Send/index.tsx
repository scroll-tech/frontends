import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import Alert from "@mui/material/Alert";
import Button from "../components/Button";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import SendAmountSelectorCard from "./SendAmountSelectorCard";

import {
  StandardERC20GatewayProxyAddr,
  networks,
  ETH_SYMBOL,
  tokens,
  ChainId,
  Addresses,
} from "@/constants";
import { useApp } from "@/contexts/AppContextProvider";
import {
  useApprove,
  useAsyncMemo,
  useBalance,
  useSufficientBalance,
} from "@/hooks";
import { sanitizeNumericalString, amountToBN } from "@/utils";
import SendTranferButton from "./SendTransferButton";
import { useSendStyles, StyleContext } from "./useSendStyles";
import { useSendTransaction } from "./useSendTransaction";
import SendLoading from "./SendLoading";
import ApproveLoading from "./ApproveLoading";

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json";
import classNames from "classnames";

const Send: FC = () => {
  const { classes: styles, cx } = useSendStyles();
  const { networksAndSigners } = useApp();

  const [fromNetwork, setFromNetwork] = useState(networks[0]);
  const [toNetwork, setToNetwork] = useState(networks[1]);
  const [selectedToken, setSelectedToken] = useState(tokens[ETH_SYMBOL]);
  const { checkConnectedNetworkId, connectedNetworkId } = useWeb3Context();

  const [fromTokenAmount, setFromTokenAmount] = useState<string>();
  const [sendError, setSendError] = useState<any>();
  const [error, setError] = useState<string | null | undefined>(null);
  const [approving, setApproving] = useState<boolean>(false);

  // Change the bridge if user selects different token to send
  const handleChangeToken = (event: ChangeEvent<{ value: unknown }>) => {
    const tokenSymbol = event.target.value as string;
    const selectedToken = tokens[tokenSymbol];
    setSelectedToken(selectedToken);
  };
  const { balance: fromBalance, loading: loadingFromBalance } = useBalance(
    selectedToken,
    networksAndSigners,
    fromNetwork
  );
  const { balance: toBalance, loading: loadingToBalance } = useBalance(
    selectedToken,
    networksAndSigners,
    toNetwork
  );

  useEffect(() => {
    if (connectedNetworkId) {
      connectedNetworkId === toNetwork.chainId && handleSwitchDirection();
    }
  }, [connectedNetworkId]);

  const { sufficientBalance, warning } = useSufficientBalance(
    selectedToken,
    networksAndSigners[fromNetwork.networkId],
    amountToBN(fromTokenAmount || "0", selectedToken.decimals),
    undefined,
    fromBalance
  );

  const isCorrectNetwork = useMemo(
    () => connectedNetworkId && fromNetwork.networkId === connectedNetworkId,
    [connectedNetworkId, fromNetwork]
  );

  // network->sufficient->tx error
  const warningTip = useMemo(() => {
    if (!isCorrectNetwork) {
      return <>Your wallet is connected to an unsupported network.</>;
    } else if (warning) {
      return warning;
    } else if (sendError && sendError.code !== "ACTION_REJECTED") {
      return (
        <>
          The transaction failed. Your MetaMask wallet might not be up to date.
          <b>
            <u style={{ textUnderlineOffset: "0.4rem" }}>
              Reset your MetaMask account
            </u>
          </b>
          {" before using Scroll Bridge."}
        </>
      );
    }
    return null;
  }, [isCorrectNetwork, warning, sendError]);

  // Switch the fromNetwork <--> toNetwork
  const handleSwitchDirection = () => {
    setFromNetwork(toNetwork);
    setToNetwork(fromNetwork);
  };

  const handleApprove = async () => {
    try {
      setApproving(true);
      await approveFromToken();
    } catch (error) {}
    setApproving(false);
  };

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
    selectedToken,
  });

  useEffect(() => {
    if (!sending && error !== "cancel") {
      setFromTokenAmount("");
    }
  }, [sending]);

  const txValue = useMemo(
    () => `${fromTokenAmount} ${selectedToken.symbol}`,
    [fromTokenAmount, selectedToken]
  );

  const { checkApproval } = useApprove(selectedToken);

  const needsApproval = useAsyncMemo(async () => {
    if (
      !(
        networksAndSigners[ChainId.SCROLL_LAYER_1].gateway ||
        networksAndSigners[ChainId.SCROLL_LAYER_2].gateway
      ) ||
      !Number(fromTokenAmount) ||
      connectedNetworkId !== fromNetwork.chainId ||
      selectedToken.isNativeToken
    ) {
      return false;
    }

    try {
      const parsedAmount = amountToBN(fromTokenAmount, selectedToken.decimals);
      const Token = new ethers.Contract(
        (selectedToken as any).address[fromNetwork.chainId],
        L1_erc20ABI,
        networksAndSigners[connectedNetworkId].signer
      );
      return checkApproval(
        parsedAmount,
        Token,
        StandardERC20GatewayProxyAddr[connectedNetworkId]
      );
    } catch (err: any) {
      console.log("~~~err", err);
      return false;
    }
  }, [fromNetwork, selectedToken, fromTokenAmount, checkApproval]);

  const approveFromToken = async () => {
    const networkId = Number(fromNetwork.networkId);
    // eslint-disable-next-line
    const parsedAmount = amountToBN(fromTokenAmount, selectedToken.decimals);
    const isNetworkConnected = await checkConnectedNetworkId(networkId);
    if (!isNetworkConnected) return;
    const Token = new ethers.Contract(
      (selectedToken as any).address[fromNetwork.chainId],
      L1_erc20ABI,
      networksAndSigners[connectedNetworkId as number].signer
    );
    // console.log('aa', Token.address === selectedToken.address[fromNetwork.chainId])
    const tx = await Token.approve(
      StandardERC20GatewayProxyAddr[connectedNetworkId as number],
      ethers.constants.MaxUint256
      // parsedAmount
    );
    await tx?.wait();
  };

  const sendButtonActive = useMemo(() => {
    return !!(!needsApproval && fromTokenAmount && !warningTip);
  }, [needsApproval, fromTokenAmount, warningTip]);

  const handleCloseSendLoading = () => {
    setSending(false);
  };

  const handleCloseApproveLoading = () => {
    setApproving(false);
  };

  const handleChangeFromAmount = (value) => {
    setSendError(undefined);
    const amountIn = sanitizeNumericalString(value);
    setFromTokenAmount(amountIn);
  };

  const switchNetwork = async () => {
    const networkId = Number(fromNetwork.networkId);
    console.log([Addresses[networkId].autoconnect]);
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [Addresses[networkId].autoconnect],
      });
      console.log("error");
    } catch (error) {
      console.log(error);
    }
  };
  const approveButtonActive = needsApproval;
  return (
    <StyleContext.Provider value={styles}>
      <div
        className={cx(
          "flex",
          "flex-col",
          "items-center",
          "bg-white",
          styles.sendWrapper
        )}
      >
        <div
          className={classNames(
            "flex",
            "flex-col",
            "items-center",
            styles.sendPanel
          )}
        >
          <SendAmountSelectorCard
            value={fromTokenAmount}
            token={selectedToken}
            label={"From"}
            onChange={handleChangeFromAmount}
            selectedNetwork={fromNetwork}
            networkOptions={networks}
            balance={fromBalance}
            loadingBalance={loadingFromBalance}
            fromNetwork={fromNetwork}
            onChangeToken={handleChangeToken}
          />
          <SendTranferButton onClick={handleSwitchDirection} />
          <SendAmountSelectorCard
            value="0.1"
            token={selectedToken}
            label={"To"}
            selectedNetwork={toNetwork}
            networkOptions={networks}
            balance={toBalance}
            loadingBalance={loadingToBalance}
            disableInput
          />

          {warningTip && (
            <Alert
              variant="standard"
              severity={sendError ? "error" : "warning"}
              style={{ marginTop: "2.4rem" }}
            >
              {warningTip}
            </Alert>
          )}

          {needsApproval ? (
            <Button
              className={styles.button}
              disabled={!approveButtonActive}
              onClick={handleApprove}
              fullWidth
              large
              color="primary"
            >
              Approve USDC
            </Button>
          ) : isCorrectNetwork ? (
            <Button
              className={styles.button}
              onClick={handleSendTransaction}
              disabled={!sendButtonActive}
              fullWidth
              large
              color="primary"
            >
              Send {selectedToken.symbol} to {toNetwork.name}
            </Button>
          ) : (
            <Button
              className={styles.button}
              onClick={switchNetwork}
              fullWidth
              large
              color="primary"
            >
              Switch to {fromNetwork.name}
            </Button>
          )}
          <ApproveLoading
            open={approving}
            onClose={handleCloseApproveLoading}
          ></ApproveLoading>
          <SendLoading
            value={txValue}
            from={fromNetwork.name}
            to={toNetwork.name}
            open={sending}
            onClose={handleCloseSendLoading}
          ></SendLoading>
        </div>
      </div>
    </StyleContext.Provider>
  );
};

export default Send;
