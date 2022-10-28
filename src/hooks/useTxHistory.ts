import { useCallback, useEffect, useMemo } from "react";
import useSWR from "swr";
import { ChainId, networks } from "@/constants";
import { toTokenDisplay } from "@/utils";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import { useTxStore } from "@/stores/txStore";
export interface TxHistory {
  blockNumbers: number[];
  frontTransactions: any;
  transactions?: any;
  addTransaction: (tx: any) => void;
  updateTransaction: (tx, updateOpts) => void;
  clearTransaction: () => void;
}

const useTxHistory = (page = 1, networksAndSigners) => {
  const { connectedNetworkId, address } = useWeb3Context();
  const txStore = useTxStore();
  const { frontTransactions, addTransaction, updateTransaction } = txStore;

  const fetchTxList = useCallback((url) => {
    return fetch(url).then((r) => r.json());
  }, []);

  const { data } = useSWR<any>(
    () => {
      if (address && page)
        return `/bridgeapi/txs?address=${address}&page=${page}`;
      return null;
    },
    fetchTxList,
    {
      refreshInterval: 2000,
    }
  );

  const fetchBlockNumber = useCallback(async () => {
    if (connectedNetworkId) {
      const fetchL1blockNumber =
        networksAndSigners[ChainId.SCROLL_LAYER_1].provider.getBlockNumber();
      const fetchL2BlockNumber =
        networksAndSigners[ChainId.SCROLL_LAYER_2].provider.getBlockNumber();

      const blockNumbers = await Promise.allSettled([
        fetchL1blockNumber,
        fetchL2BlockNumber,
      ]);

      return blockNumbers.map((item) =>
        item.status === "fulfilled" ? item.value : -1
      );
    }
    return [-1, -1];
  }, [networksAndSigners, connectedNetworkId]);

  const { data: blockNumbers } = useSWR<any>(
    "eth_blockNumber",
    fetchBlockNumber,
    {
      refreshInterval: 2000,
    }
  );
  console.log(blockNumbers, "blockNumbers");

  const transactions = useMemo(() => {
    if (data?.data.result.length && blockNumbers) {
      return data.data.result.slice(0, 3).map((tx) => {
        const amount = toTokenDisplay(tx.amount);
        const fromName = networks[+!tx.isL1].name;
        const fromExplore = networks[+!tx.isL1].explorer;
        const fromHash = tx.hash;
        const toName = networks[+tx.isL1].name;
        const toExplore = networks[+tx.isL1].explorer;
        const toHash = tx.finalizeTx?.hash;
        return {
          amount,
          fromName,
          fromExplore,
          fromHash,
          toName,
          toExplore,
          toHash,
        };
      });
    }
  }, [data, blockNumbers]);

  useEffect(() => {
    if (data?.data.result) {
      const historyList = data.data.result;
      // const historyHashList = frontTransactions.map(item=>item.hash);
      frontTransactions.slice(0, 3).forEach((item) => {
        const currentTx = historyList.find((i) => i.hash === item.hash);
        if (currentTx?.finalizeTx) {
          updateTransaction(item, {
            toHash: currentTx.finalizeTx.hash,
            toBlockNumber: currentTx.finalizeTx.blockNumber,
            toStatus: "success",
          });
        }
      });
    }
  }, [data, frontTransactions]);

  const clearTransaction = () => {};

  return {
    blockNumbers,
    frontTransactions,
    transactions,
    addTransaction,
    updateTransaction,
    clearTransaction,
  };
};

export default useTxHistory;
