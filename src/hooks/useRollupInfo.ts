import useSWR from "swr"

import { fetchBatchBlocksUrl, fetchBatchDetailUrl, fetchChunkBlocksUrl, fetchChunkListUrl, fetchLastBatchIndexesUrl } from "@/apis/rollupscan"

export enum BLOCK_LIST_TYPE {
  BATCH = "Batch",
  CHUNK = "Chunk",
}

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

export function useChunkList(index) {
  const { data, error, isLoading } = useSWR(`${fetchChunkListUrl}?batch_index=${index}`, fetcher)
  return {
    chunks: data?.chunks,
    isLoading,
    isError: error,
  }
}

export function useChunkBlocks(index) {
  const { data, error, isLoading } = useSWR(`${fetchChunkBlocksUrl}?chunk_index=${index}`, fetcher)
  return {
    blocks: data?.blocks,
    isLoading,
    isError: error,
  }
}

export function useBatchBlocks(index) {
  const { data, error, isLoading } = useSWR(`${fetchBatchBlocksUrl}?batch_index=${index}`, fetcher)
  return {
    blocks: data?.blocks,
    isLoading,
    isError: error,
  }
}
