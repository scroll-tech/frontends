import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_API_BASE_URI")
const prefix = requireEnv("REACT_APP_FAUCET_API_PREFIX")

export const fetchInfoUrl = `${baseUrl}${prefix}/info`
export const claimUrl = `${baseUrl}${prefix}/claim`
