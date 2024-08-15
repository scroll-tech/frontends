import { requireEnv } from "@/utils"

const badgeRegistryBaseURL = requireEnv("REACT_APP_BADGE_REGISTRY_URL")

const badgeIndexerBaseURL = requireEnv("REACT_APP_BADGE_INDEXER_URL")

export const fetchBadgesURL = `${badgeRegistryBaseURL}/badges`

export const fetchBadgeByAddrURL = addr => `${badgeRegistryBaseURL}/badge/${addr}`

export const retrieveCanvasBadgeURL = `${badgeIndexerBaseURL}/count`
