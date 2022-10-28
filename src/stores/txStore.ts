import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";

interface TxStore {
  frontTransactions: any[];
  addTransaction: (tx) => void;
  updateTransaction: (hash, tx) => void;
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
            for (const key in updateOpts) {
              current[key] = updateOpts[key];
            }
          })
        ),
    }),
    {
      name: "user-tx-storage",
    }
  )
);
