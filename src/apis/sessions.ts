import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_OPEN_BLOCK_URI")

export const generateWalletPointsUrl = address => `${baseUrl}/scroll/wallet-points?walletAddress=${address}`
