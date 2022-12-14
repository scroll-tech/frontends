// import { HopBridge } from '@hop-protocol/sdk'
import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import { ChainId, networks } from "@/constants";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import { useApp } from "@/contexts/AppContextProvider";
import useTxStore from "@/stores/txStore";
import useBridgeStore from "@/stores/bridgeStore";
import logger from "@/utils/logger";
import { amountToBN } from "@/utils";

export type TransactionHandled = {
  transaction: any;
  txModel: any;
};

export function useSendTransaction(props) {
  const {
    fromNetwork,
    fromTokenAmount,
    setError,
    setSendError,
    toNetwork,
    selectedToken,
  } = props;

  const { networksAndSigners } = useApp();
  const { addTransaction, updateTransaction } = useTxStore();
  const { changeRecentTxVisible } = useBridgeStore();
  const [sending, setSending] = useState<boolean>(false);
  const { checkConnectedChainId } = useWeb3Context();
  const parsedAmount = useMemo(() => {
    if (!fromTokenAmount || !selectedToken) return BigNumber.from(0);
    return amountToBN(fromTokenAmount, selectedToken.decimals);
  }, [fromTokenAmount, selectedToken?.decimals]);

  const send = async () => {
    try {
      setError(null);

      const networkId = Number(fromNetwork.networkId);
      const isNetworkConnected = await checkConnectedChainId(networkId);
      if (!isNetworkConnected) return;
      setSending(true);
      let tx;
      try {
        if (fromNetwork.isLayer1) {
          tx = await sendl1ToL2();
        } else if (!fromNetwork.isLayer1 && toNetwork.isLayer1) {
          tx = await sendl2ToL1();
        }
        setSending(false);
        changeRecentTxVisible(true);
        handleTransaction(tx);
        const txResult = await tx.wait();
        handleTransaction(tx, {
          fromBlockNumber: txResult.blockNumber,
        });
      } catch (error) {
        setSendError(error);
        setSending(false);
      }
    } catch (err) {
      if (!/cancelled/gi.test(err.message)) {
        setError(err);
      } else {
        setError("cancel");
      }
      logger.error(err);
    }
  };

  const handleTransaction = (tx, updateOpts?) => {
    if (updateOpts) {
      updateTransaction(tx, updateOpts);
      return;
    }
    addTransaction({
      hash: tx.hash,
      fromName: fromNetwork.name,
      toName: toNetwork.name,
      fromExplore: fromNetwork.explorer,
      toExplore: toNetwork.explorer,
      amount: fromTokenAmount,
      isL1: fromNetwork.name === networks[0].name,
      symbolToken: selectedToken.address?.[fromNetwork.chainId],
    });
  };

  const sendl1ToL2 = () => {
    if (selectedToken.isNativeToken) {
      return networksAndSigners[ChainId.SCROLL_LAYER_1].gateway[
        "depositETH(uint256)"
      ](0, {
        value: parsedAmount,
      });
    } else {
      return networksAndSigners[ChainId.SCROLL_LAYER_1].gateway[
        "depositERC20(address,uint256,uint256)"
      ](selectedToken.address[fromNetwork.chainId], parsedAmount, 0);
    }
  };

  const sendl2ToL1 = () => {
    if (selectedToken.isNativeToken) {
      return networksAndSigners[ChainId.SCROLL_LAYER_2].gateway[
        "withdrawETH(uint256)"
      ](0, {
        value: parsedAmount,
      });
    } else {
      return networksAndSigners[ChainId.SCROLL_LAYER_2].gateway[
        "withdrawERC20(address,uint256,uint256)"
      ](selectedToken.address[fromNetwork.chainId], parsedAmount, 0);
    }
  };

  return {
    send,
    sending,
    setSending,
  };
}
