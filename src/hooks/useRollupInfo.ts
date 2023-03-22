import useSWR from "swr"

import { fetchBatchDetailUrl, fetchBlockListUrl, fetchLastBatchIndexesUrl } from "@/apis/rollupscan"

const fetcher = (url: string) => scrollRequest(url)

export function useLastBlockNums() {
  const { data, error } = useSWR(fetchLastBatchIndexesUrl, fetcher, {
    refreshInterval: 3000,
  })
  return {
    lastBlockNums: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useBatchDetail(batchIndex) {
  const { data, error } = useSWR(`${fetchBatchDetailUrl}?index=${batchIndex}`, fetcher)
  return {
    batch: data?.batch,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useBlockList(batchIndex) {
  const { data, error } = useSWR(`${fetchBlockListUrl}?batch_index=${batchIndex}`, fetcher)
  return {
    blocks: data?.blocks,
    isLoading: !error && !data,
    isError: error,
  }
}
