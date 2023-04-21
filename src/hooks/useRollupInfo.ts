import useSWR from "swr"

import { fetchBatchDetailUrl, fetchBlockListUrl, fetchLastBatchIndexesUrl } from "@/apis/rollupscan"

const fetcher = (url: string) => scrollRequest(url)

export function useLastBlockNums() {
  const { data, error, isLoading } = useSWR(fetchLastBatchIndexesUrl, fetcher, {
    refreshInterval: 3000,
  })
  return {
    lastBlockNums: data,
    isLoading,
    isError: error,
  }
}

export function useBatchDetail(batchIndex) {
  const { data, error, isLoading } = useSWR(`${fetchBatchDetailUrl}?index=${batchIndex}`, fetcher)
  return {
    batch: data?.batch,
    isLoading,
    isError: error,
  }
}

export function useBlockList(batchIndex) {
  const { data, error, isLoading } = useSWR(`${fetchBlockListUrl}?batch_index=${batchIndex}`, fetcher)
  return {
    blocks: data?.blocks,
    isLoading,
    isError: error,
  }
}
