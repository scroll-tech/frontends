import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useLastBlockNums() {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_ROLLUPSCAN_BASE_API_URL}/last_batch_indexes`,
    fetcher,
    {
      refreshInterval: 3000,
    }
  );
  return {
    lastBlockNums: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useBatchDetail(batchId) {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_ROLLUPSCAN_BASE_API_URL}/batch?batch_id=${batchId}`,
    fetcher
  );
  return {
    batch: data?.batch,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useBlockList(batchId) {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_ROLLUPSCAN_BASE_API_URL}/blocks?batch_id=${batchId}`,
    fetcher
  );
  return {
    blocks: data?.blocks,
    isLoading: !error && !data,
    isError: error,
  };
}
