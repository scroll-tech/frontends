// import { HopBridge } from '@hop-protocol/sdk'
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { ChainId } from "@/constants";
import { useApp } from "@/contexts/AppContextProvider";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
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

  const {
    networksAndSigners,
    txHistory: { addTransaction },
  } = useApp();
  const [tx, setTx] = useState<any>();
  const [sending, setSending] = useState<boolean>(false);
  const { checkConnectedNetworkId } = useWeb3Context();
  const parsedAmount = useMemo(() => {
    if (!fromTokenAmount || !selectedToken) return BigNumber.from(0);
    return amountToBN(fromTokenAmount, selectedToken.decimals);
  }, [fromTokenAmount, selectedToken?.decimals]);

  useEffect(() => {
    if (tx) {
      addTransaction({
        hash: tx.hash,
        networkName: "optimism",
        fromNetwork,
        toNetwork,
        pending: false,
        destNetworkName: "polygon",
        replaced: true,
      });
    }
  }, [tx]);

  const send = async () => {
    try {
      setError(null);
      setTx(undefined);

      const networkId = Number(fromNetwork.networkId);
      const isNetworkConnected = await checkConnectedNetworkId(networkId);
      if (!isNetworkConnected) return;
      setSending(true);

      try {
        if (fromNetwork.isLayer1) {
          await sendl1ToL2();
        } else if (!fromNetwork.isLayer1 && toNetwork.isLayer1) {
          await sendl2ToL1();
        }
      } catch (error) {
        setSendError(error);
      }
    } catch (err: any) {
      if (!/cancelled/gi.test(err.message)) {
        setError(err);
      } else {
        setError("cancel");
      }
      logger.error(err);
    }
    setSending(false);
  };

  const sendl1ToL2 = async () => {
    if (selectedToken.isNativeToken) {
      const tx: any = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway[
        "depositETH(uint256)"
      ](0, {
        value: parsedAmount,
      });
      setTx(tx);
    } else {
      const tx: any = await networksAndSigners[ChainId.SCROLL_LAYER_1].gateway[
        "depositERC20(address,uint256,uint256)"
      ](selectedToken.address[fromNetwork.chainId], parsedAmount, 0);
      setTx(tx);
    }
  };

  const sendl2ToL1 = async () => {
    if (selectedToken.isNativeToken) {
      const tx: any = await networksAndSigners[ChainId.SCROLL_LAYER_2].gateway[
        "withdrawETH(uint256)"
      ](0, {
        value: parsedAmount,
      });
      setTx(tx);
    } else {
      const tx: any = await networksAndSigners[ChainId.SCROLL_LAYER_2].gateway[
        "withdrawERC20(address,uint256,uint256)"
      ](selectedToken.address[fromNetwork.chainId], parsedAmount, 0);
      setTx(tx);
    }
  };

  return {
    send,
    sending,
    setSending,
    tx,
    setTx,
  };
}
