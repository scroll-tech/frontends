import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { networks } from "@/constants";
import { toTokenDisplay } from "@/utils";

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
      generateTransactions: (historyList) => {
        set((state) => {
          const hashList = historyList.map((item) => item.hash);
          const frontList = state.frontTransactions.filter(
            (item) => !hashList.includes(item.hash)
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
          return {
            frontTransactions: frontList,
            transactions: [...frontList, ...backList],
          };
        });
      },
    }),
    {
      name: "user-tx-storage",
    }
  )
);
