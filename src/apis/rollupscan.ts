import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_API_BASE_URI")

const prefix = requireEnv("REACT_APP_ROLLUPSCAN_API_PREFIX")

export const fetchLastBatchIndexesUrl = `${baseUrl}${prefix}/last_batch_indexes`

export const fetchBatchListUrl = `${baseUrl}${prefix}/batches`

export const fetchBatchDetailUrl = `${baseUrl}${prefix}/batch`

export const fetchChunkListUrl = `${baseUrl}${prefix}/chunks`

export const fetchChunkBlocksUrl = `${baseUrl}${prefix}/chunk_blocks`

export const fetchBatchBlocksUrl = `${baseUrl}${prefix}/batch_blocks`

export const searchUrl = `${baseUrl}${prefix}/search`

export const fetchBetchDetail = `${baseUrl}${prefix}/batch`
