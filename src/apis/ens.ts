import { requireEnv } from "@/utils"

const ensBaseURL = requireEnv("REACT_APP_ENS_API_URL")
export function getEnsAddressURL(ens: string) {
  return `${ensBaseURL}/name/${ens}/address`
}
