import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { networks } from "@/constants";
import { toTokenDisplay } from "@/utils";

interface TxStore {
  frontTransactions: Transaction[];
  transactions: Transaction[];
  pageTransactions: Transaction[];
  addTransaction: (tx) => void;
  updateTransaction: (hash, tx) => void;
  slimTransactions: (hashList) => void;
  generateTransactions: (transactions) => void;
  comboPageTransactions: (address, page, rowsPerPage) => void;
  clearTransactions: () => void;
}
interface Transaction {
  hash: string;
  fromName: string;
  toName: string;
  fromExplore: string;
  toExplore: string;
  amount: string;
  isL1: boolean;
  fromBlockNumber?: number;
  toBlockNumber?: number;
}

const formatBackTxList = (backList) => {
  return backList.map((tx) => {
    const amount = toTokenDisplay(tx.amount);
    const fromName = networks[+!tx.isL1].name;
    const fromExplore = networks[+!tx.isL1].explorer;
    const toName = networks[+tx.isL1].name;
    const toExplore = networks[+tx.isL1].explorer;
    const toHash = tx.finalizeTx?.hash;
    return {
      hash: tx.hash,
      amount,
      fromName,
      fromExplore,
      fromBlockNumber: tx.blockNumber,
      toHash,
      toName,
      toExplore,
      toBlockNumber: tx.finalizeTx?.blockNumber,
      isL1: tx.isL1,
    };
  });
};

export const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      frontTransactions: [],
      transactions: [],
      pageTransactions: [],
      addTransaction: (newTx) =>
        set((state) => ({
          frontTransactions: [newTx, ...state.frontTransactions],
        })),
      updateTransaction: (oldTx, updateOpts) =>
        set(
          produce((state) => {
            const current = state.frontTransactions.find(
              (item) => item.hash === oldTx.hash
            );
            if (current) {
              for (const key in updateOpts) {
                current[key] = updateOpts[key];
              }
            }
          })
        ),
      slimTransactions: (hashList) => {
        set((state) => ({
          frontTransactions: state.frontTransactions.filter(
            (item) => !hashList.includes(item.hash)
          ),
        }));
      },
      generateTransactions: (historyList) => {
        set((state) => {
          const hashList = historyList.map((item) => item.hash);
          const frontList = state.frontTransactions.filter(
            (item) => !hashList.includes(item.hash)
          );
          const backList = formatBackTxList(historyList);
          return {
            frontTransactions: frontList,
            transactions: [...frontList, ...backList],
          };
        });
      },
      clearTransactions: () => {
        set({
          frontTransactions: [],
          transactions: [],
          pageTransactions: [],
        });
      },
      comboPageTransactions: async (address, page, rowsPerPage) => {
        const pickTxFromPool = get().transactions.slice(
          (page - 1) * rowsPerPage,
          (page - 1) * rowsPerPage + rowsPerPage
        );
        if (pickTxFromPool.length === rowsPerPage) {
          set({ pageTransactions: pickTxFromPool });
          return;
        }
        const limit = rowsPerPage - pickTxFromPool.length;
        const offset =
          (page - 1) * rowsPerPage - get().frontTransactions.length;

        const result = await fetch(
          `/bridgeapi/txs?address=${address}&offset=${offset}&limit=${limit}`
        );
        const data = await result.json();
        set({
          pageTransactions: [
            ...pickTxFromPool,
            ...formatBackTxList(data.data.result),
          ],
        });
      },
    }),
    {
      name: "bridgeTransactions",
    }
  )
);
