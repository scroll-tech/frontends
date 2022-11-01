import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

interface TxStore {
  frontTransactions: any[];
  transactions: any[];
  addTransaction: (tx) => void;
  updateTransaction: (hash, tx) => void;
  slimTransactions: (hashList) => void;
  generateTransactions: (transactions) => void;
}

interface Network {
  name: string;
  explorer: string;
  status: string;
}

interface Transaction {
  hash: string;
  status: string;
  amount: string;
  from: Network;
  to: Network;
}

export const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      frontTransactions: [],
      transactions: [],
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
      generateTransactions: (transactions) => {
        set((state) => ({
          transactions: transactions,
        }));
      },
    }),
    {
      name: "user-tx-storage",
    }
  )
);
