import { requireEnv } from "@/utils"

const ensBaseURL = requireEnv("REACT_APP_ENS_API_URL")

const canvasBaseUrl = requireEnv("REACT_APP_CANVAS_BACKEND_URI")

export const fetchENSNameURL = addr => `${ensBaseURL}/address/${addr}/name`

export const claimENSNameURL = addr => `${canvasBaseUrl}/acc/${addr}/ens/claim`

export const fetchIsNameTakenURL = subdomainName => `${ensBaseURL}/name/${subdomainName}/taken`

export const fetchUserNFTsURL = (walletAddress, page, pageSize) =>
  `${canvasBaseUrl}/acc/${walletAddress}/nfts?page_size=${pageSize}&page_number=${page}`

export const setCanvasAvatarURL = walletAddress => `${canvasBaseUrl}/acc/${walletAddress}/set-avatar`

export const fetchAvatarURL = walletAddress => `${canvasBaseUrl}/avatar/${walletAddress}.json`

export const generateNFTURL = walletAddress => `${canvasBaseUrl}/avatar/${walletAddress}.nft`

export const generateAvatarURL = avatar => `${canvasBaseUrl}/avatar/${avatar}`
