// import { requireEnv } from "@/utils"

// const ensSubdomainBaseURL = requireEnv("REACT_APP_ENS_SUBDOMAIN_URL")
const ensSubdomainBaseURL = ""

export const getEnsUsernameURL = addr => `${ensSubdomainBaseURL}/address/${addr}/name`

export const setEnsUsernameURL = addr => `${ensSubdomainBaseURL}/address/${addr}/name`
