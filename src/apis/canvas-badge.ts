const badgeRegistryBaseURL = process.env.NEXT_PUBLIC_BADGE_REGISTRY_URL

const badgeIndexerBaseURL = process.env.NEXT_PUBLIC_BADGE_INDEXER_URL

export const fetchBadgesURL = `${badgeRegistryBaseURL}/badges`

export const fetchBadgeByAddrURL = addr => `${badgeRegistryBaseURL}/badge/${addr}`

export const retrieveCanvasBadgeURL = `${badgeIndexerBaseURL}/count`
