import create from "zustand";
import { persist } from "zustand/middleware";
import produce from "immer";
import { networks } from "@/constants";
import { toTokenDisplay } from "@/utils";

interface TxStore {
  page: number;
  total: number;
  loading: boolean;
  error: string;
  frontTransactions: Transaction[];
  transactions: Transaction[];
  pageTransactions: Transaction[];
  addTransaction: (tx) => void;
  updateTransaction: (hash, tx) => void;
  generateTransactions: (transactions) => void;
  comboPageTransactions: (address, page, rowsPerPage) => void;
  clearTransactions: () => void;
}
interface Transaction {
  hash: string;
  toHash?: string;
  fromName: string;
  toName: string;
  fromExplore: string;
  toExplore: string;
  fromBlockNumber?: number;
  toBlockNumber?: number;
  amount: string;
  isL1: boolean;
  symbolToken?: string;
}

const formatBackTxList = (backList) => {
  if (!backList.length) {
    return [];
  }
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
      symbolToken: tx.isL1 ? tx.l1Token : tx.l2Token,
    };
  });
};

export const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      page: 1,
      total: 0,
      frontTransactions: [],
      loading: false,
      error: "",
      // frontTransactions + backendTransactions.slice(0, 3)
      transactions: [],
      pageTransactions: [],
      // when user send a transaction
      addTransaction: (newTx) =>
        set((state) => ({
          frontTransactions: [newTx, ...state.frontTransactions],
          transactions: [newTx, ...state.transactions],
        })),
      // wait transaction success in from network
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
      // polling transactions
      // slim frontTransactions and keep the latest 3 backTransactions
      generateTransactions: (historyList) => {
        set((state) => {
          const frontHashList = state.frontTransactions.map(
            (item) => item.hash
          );
          const pendingFrontList = state.frontTransactions.filter(
            (item, index) => !historyList[index]
          );

          const backList = historyList.filter((item) => item);
          const syncList = formatBackTxList(backList);

          const restList = state.transactions.filter(
            (item) => ![...frontHashList].includes(item.hash)
          );

          return {
            frontTransactions: pendingFrontList,
            transactions: pendingFrontList.concat(
              [...syncList, ...restList].slice(0, 3)
            ),
          };
        });
      },
      clearTransactions: () => {
        set({
          frontTransactions: [],
          transactions: [],
          pageTransactions: [],
          page: 1,
          total: 0,
        });
      },

      // page transactions
      comboPageTransactions: async (address, page, rowsPerPage) => {
        const frontTransactions = get().frontTransactions;
        set({ loading: true });
        if (frontTransactions.length >= rowsPerPage) {
          set({
            pageTransactions: frontTransactions.slice(0, rowsPerPage),
            page,
            loading: false,
          });
          return;
        }
        const limit = rowsPerPage - frontTransactions.length;
        const offset = (page - 1) * rowsPerPage - frontTransactions.length;

        const result = await fetch(
          `/bridgeapi/txs?address=${address}&offset=${offset}&limit=${limit}`
        );
        const data = await result.json();
        set({
          pageTransactions: [
            ...frontTransactions,
            ...formatBackTxList(data.data.result),
          ],
          total: data.data.total,
          page,
          loading: false,
        });
        if (page === 1) {
          // keep transactions always latest
          set({
            transactions: [
              ...frontTransactions,
              ...formatBackTxList(data.data.result),
            ],
          });
        }
      },
    }),
    {
      name: "bridgeTransactions",
    }
  )
);
