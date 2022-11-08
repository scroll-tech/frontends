import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { ChainId, BRIDGE_PAGE_SIZE } from "@/constants";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import { useTxStore } from "@/stores/txStore";
export interface TxHistory {
  blockNumbers: number[];
  frontTransactions: any;
  transactions?: any;
  pageTransactions?: any;
  addTransaction: (tx: any) => void;
  updateTransaction: (tx, updateOpts) => void;
  clearTransactions: () => void;
  comboPageTransactions: (address, page, rowsPerPage) => void;
}

const useTxHistory = (networksAndSigners) => {
  const { connectedNetworkId, address } = useWeb3Context();
  const txStore = useTxStore();
  const {
    frontTransactions,
    transactions,
    pageTransactions,
    addTransaction,
    updateTransaction,
    generateTransactions,
    comboPageTransactions,
    clearTransactions,
  } = txStore;

  const fetchTxList = useCallback(({ txs }) => {
    return fetch("/bridgeapi/txsbyhashes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txs }),
    }).then((res) => res.json());
  }, []);

  // fetch to hash/blockNumber from backend
  const { data, error } = useSWR<any>(
    () => {
      const txs = frontTransactions.map((item) => item.hash);
      if (txs.length && address) {
        return { txs };
      }
      return null;
    },
    fetchTxList,
    {
      refreshInterval: 2000,
    }
  );

  useEffect(() => {
    if (address) {
      comboPageTransactions(address, 1, BRIDGE_PAGE_SIZE);
    }
  }, [address]);

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
    return null;
  }, [networksAndSigners, connectedNetworkId]);

  const { data: blockNumbers } = useSWR<any>(
    "eth_blockNumber",
    fetchBlockNumber,
    {
      refreshInterval: 2000,
    }
  );

  console.log(blockNumbers, "blockNumbers");

  useEffect(() => {
    if (data?.data?.result.length) {
      generateTransactions(data.data.result);
    }
  }, [data]);

  return {
    blockNumbers,
    frontTransactions,
    transactions,
    pageTransactions,
    addTransaction,
    updateTransaction,
    clearTransactions,
    comboPageTransactions,
  };
};

export default useTxHistory;
