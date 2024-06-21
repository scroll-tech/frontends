import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_OPEN_BLOCK_URI")
const venusUrl = requireEnv("REACT_APP_SCROLL_VENUS_URI")

export const fetchWalletPointsUrl = address => `${baseUrl}/scroll/wallet-points?walletAddress=${address}`
export const fetchTokensMarksUrl = address => `${baseUrl}/scroll/bridge-balances?walletAddress=${address}`
export const fetchProjectsMarksUrl = address => `${baseUrl}/scroll/project-marks?walletAddress=${address}`

export const checkSignStatus = address => `${venusUrl}/v1/signature/address?address=${address}`
export const updateSignStatus = `${venusUrl}/v1/signature/sign`
