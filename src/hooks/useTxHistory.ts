import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { ChainId, BRIDGE_PAGE_SIZE } from "@/constants";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import useBridgeVisibleStore from "@/stores/bridgeVisibleStore";
import useTxStore from "@/stores/txStore";
export interface TxHistory {
  blockNumbers: number[];
}

const useTxHistory = (networksAndSigners) => {
  const { connectedNetworkId, address } = useWeb3Context();
  const {
    transactions,
    pageTransactions,
    generateTransactions,
    comboPageTransactions,
  } = useTxStore();

  const { historyVisible, bridgeFormVisible } = useBridgeVisibleStore();

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
      const recentAndHistoryTransactions = [
        ...transactions,
        ...pageTransactions,
      ];
      const pendingTransactions = recentAndHistoryTransactions.filter(
        (item) => !item.toHash
      );

      if (pendingTransactions.length && address) {
        const txs = pendingTransactions
          .map((item) => item.hash)
          .filter((item, index, arr) => index === arr.indexOf(item));
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
  };
};

export default useTxHistory;
