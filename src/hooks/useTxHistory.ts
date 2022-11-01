import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
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
  changePage: Dispatch<SetStateAction<number>>;
  changePageSize: Dispatch<SetStateAction<number>>;
  total: number;
  page: number;
}

export const WAIT_CONFIRMATIONS = 10;

export const PAGE_SIZE = 3;

const useTxHistory = (networksAndSigners) => {
  const { connectedNetworkId, address } = useWeb3Context();
  const txStore = useTxStore();
  const [page, changePage] = useState(1);
  const [pageSize, changePageSize] = useState(18);
  const {
    frontTransactions,
    transactions,
    addTransaction,
    updateTransaction,
    generateTransactions,
  } = txStore;

  const fetchTxList = useCallback((url) => {
    return fetch(url).then((r) => r.json());
  }, []);

  // TODO: do refresh
  // const needInterval = useMemo(()=>{
  //   const tx = transactions.
  //     const fromConfirmations =
  //     tx.fromBlockNumber && blockNumbers
  //       ? blockNumbers[+!tx.isL1] - tx.fromBlockNumber
  //       : 0;
  //   const toConfirmations =
  //     tx.toBlockNumber && blockNumbers
  //       ? blockNumbers[+tx.isL1] - tx.toBlockNumber
  //       : 0;

  //   if (
  //     fromConfirmations >= WAIT_CONFIRMATIONS &&
  //     toConfirmations >= WAIT_CONFIRMATIONS
  //   ) {
  //     updateTransaction(tx, { replaced: true });
  //   }
  // }, [transactions])

  const { data, error } = useSWR<any>(
    () => {
      if (address && page && pageSize)
        return `/bridgeapi/txs?address=${address}&page=${1}&pageSize=${pageSize}`;
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

  useEffect(() => {
    if (data?.data?.result.length) {
      const historyList = data.data.result;
      const hashList = historyList.map((item) => item.hash);
      const frontList = frontTransactions.filter((item) =>
        hashList.includes(item.hash)
      );
      const backList = historyList.map((tx) => {
        const amount = toTokenDisplay(tx.amount);
        const fromName = networks[+!tx.isL1].name;
        const fromExplore = networks[+!tx.isL1].explorer;
        const toName = networks[+tx.isL1].name;
        const toExplore = networks[+tx.isL1].explorer;
        const toHash = tx.finalizeTx?.hash;
        return {
          amount,
          fromName,
          fromExplore,
          fromBlockNumber: tx.blockNumber,
          hash: tx.hash,
          toName,
          toExplore,
          toHash,
          toBlockNumber: tx.finalizeTx?.blockNumber,
          isL1: tx.isL1,
        };
      });
      generateTransactions([...frontList, ...backList]);
    }
  }, [data, frontTransactions]);

  console.log(data?.data?.total, "total");

  const clearTransaction = () => {};

  return {
    blockNumbers,
    frontTransactions,
    transactions,
    addTransaction,
    updateTransaction,
    clearTransaction,
    changePage,
    changePageSize,
    page,
    total: data?.data?.total,
  };
};

export default useTxHistory;
