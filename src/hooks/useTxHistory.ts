import { useCallback, Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "react-use";
import find from "lodash/find";
import { filterByHash } from "@/utils";

export interface TxHistory {
  transactions?: any[];
  setTransactions: Dispatch<SetStateAction<any[] | undefined>>;
  addTransaction: (tx: any) => void;
  // removeTransaction: (tx: any) => void;
  // updateTransaction: (tx: any, updateOpts: any, matchingHash?: string) => void;
  clearTransaction: () => void;
}

export interface UpdateTransactionOptions {
  pending?: boolean;
  pendingDestinationConfirmation?: boolean;
  destNetworkName?: string;
  destTxHash?: string;
  replaced?: boolean | string;
}

const cacheKey = "recentTransactions";

const localStorageSerializationOptions = {
  raw: false,
  serializer: (value: any[]) => {
    return JSON.stringify(value);
  },
  deserializer: (value: string) => {
    return JSON.parse(value);
  },
};

const useTxHistory = (defaultTxs: any[] = []): TxHistory => {
  const [transactions, setTransactions] = useLocalStorage<any[]>(
    cacheKey,
    defaultTxs,
    localStorageSerializationOptions
  );

  // 这里就是将返回值存起来的地方
  function filterSortAndSetTransactions(
    tx: any,
    txs?: any[],
    hashFilter?: string
  ) {
    // 由于新的交易的replaced永远为true，这就意味着需要移除原有交易历史记录中hash相同的数据，以新的替代
    const filtered = filterByHash(txs, hashFilter);

    // TODO: 此方法需要被重写，transaction需要被存进数据里
    // NOTICE: 由于交易不记录时间戳，所以sort无效
    setTransactions([tx, ...filtered].slice(0, 3));
  }

  // 完成一次send后会调用此方法，参数为交易执行的返回结果

  const addTransaction = useCallback(
    (tx: any) => {
      // If tx exists with hash == tx.replaced, remove it
      const match = find(transactions, ["hash", tx.replaced]);
      filterSortAndSetTransactions(tx, transactions, match?.hash);
    },
    [transactions]
  );

  // 只留下最新的三条记录？
  // const removeTransaction = useCallback(
  //   (tx: any) => {
  //     // If tx exists with hash == tx.replaced, remove it
  //     const filtered = filterByHash(transactions, tx.hash);
  //     setTransactions(sortByRecentTimestamp(filtered).slice(0, 3));
  //   },
  //   [transactions]
  // );

  // const updateTransaction = useCallback(
  //   (
  //     tx: any,
  //     updateOpts: UpdateTransactionOptions,
  //     matchingHash?: string
  //   ) => {
  //     for (const key in updateOpts) {
  //       tx[key] = updateOpts[key];
  //     }
  //     filterSortAndSetTransactions(tx, transactions, matchingHash || tx.hash);
  //   },
  //   [transactions]
  // );

  const clearTransaction = useCallback(() => {
    setTransactions([]);
  }, []);
  // this will make sure to update in local storage the updated pending status,
  // so it doesn't show as pending indefinitely on reload.
  // This wouldn't be an issue if useEffect worked properly with array nested
  // of nested objects and it detected property changes.
  return {
    transactions,
    setTransactions,
    addTransaction,
    // removeTransaction,
    // updateTransaction,
    clearTransaction,
  };
};

export default useTxHistory;
