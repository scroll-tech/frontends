import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_BRIDGE_API_URI")

export const fetchTxByHashUrl = `${baseUrl}/txsbyhashes`

export const fetchWithdrawalListUrl = `${baseUrl}/l2/withdrawals`

export const fetchTxListUrl = `${baseUrl}/txs`

export const fetchClaimableTxListUrl = `${baseUrl}/l2/unclaimed/withdrawals`
