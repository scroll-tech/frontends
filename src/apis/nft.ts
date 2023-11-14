import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_NFT_API_URI")

export const fetchParamsByAddressURL = address => `${baseUrl}/p/${address}.json`
