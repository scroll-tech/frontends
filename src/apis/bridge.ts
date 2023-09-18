import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_BRIDGE_API_URI")

export const fetchTxByHashUrl = `${baseUrl}/txsbyhashes`

export const fetchTxListUrl = `${baseUrl}/txs`

export const fetchClaimableTxListUrl = `${baseUrl}/claimable`

export const fetchDepositStatusUrl = `${baseUrl}/claimable`
