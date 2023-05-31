import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_API_BASE_URI")
const prefix = requireEnv("REACT_APP_BRIDGE_API_PREFIX")

export const fetchTxByHashUrl = `${baseUrl}${prefix}/txsbyhashes`

export const fetchTxListUrl = `${baseUrl}${prefix}/txs`

export const fetchTxProofUrl = `${baseUrl}/rollupscan/api/batch?index=1631952`
