import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_ROLLUPSCAN_API_URI")

export const fetchLastBatchIndexesUrl = `${baseUrl}/last_batch_indexes`

export const fetchBatchListUrl = `${baseUrl}/batches`

export const fetchBatchDetailUrl = `${baseUrl}/batch`

export const fetchChunkListUrl = `${baseUrl}/chunks`

export const fetchChunkBlocksUrl = `${baseUrl}/chunk_blocks`

export const fetchBatchBlocksUrl = `${baseUrl}/batch_blocks`

export const searchUrl = `${baseUrl}/search`

export const fetchBetchDetail = `${baseUrl}/batch`
