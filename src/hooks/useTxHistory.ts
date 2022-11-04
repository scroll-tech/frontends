import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { ChainId } from "@/constants";
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
  total: number;
}

export const WAIT_CONFIRMATIONS = 10;

const FRONT_CACHE_MAX_NUMBER = 3;

export const PAGE_SIZE = 3;

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

  const fetchTxList = useCallback((url) => {
    return fetch(url).then((r) => r.json());
  }, []);

  const { data, error } = useSWR<any>(
    () => {
      if (address)
        return `/bridgeapi/txs?address=${address}&page=${1}&pageSize=${
          frontTransactions.length || FRONT_CACHE_MAX_NUMBER
        }`;
      return null;
    },
    fetchTxList,
    {
      refreshInterval: frontTransactions.length ? 2000 : 0,
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
    if (data?.data?.result.length && blockNumbers) {
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
    // changePage,
    // changePageSize,
    // page,
    total: data?.data?.total,
  };
};

export default useTxHistory;
