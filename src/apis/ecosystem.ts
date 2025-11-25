export const ecosystemOrigin = process.env.NEXT_PUBLIC_ECOSYSTEM_BASE_URI
export const ecosystemListHashUrl = ecosystemOrigin + "/docs/"
export const ecosystemListLogoUrl = ecosystemOrigin + "/logos/"
export const ecosystemListUrl = "https://ecosystem.scroll.cat/api/query"

export const fetchEcosystemCategoryToTagsURL = ecosystemOrigin + "/docs/category-to-tags.json"

export const fetchEcosystemMetricsData = "https://assets.scroll.cat/ecosystem/metrics"

// export const l2beatOrigin = "https://l2beat.com"
// lack of the latest day
// export const ecosystemTVLUrl = l2beatOrigin + "/api/tvl/scroll.json"
// export const ecosystemActivityUrl = l2beatOrigin + "/api/activity/scroll.json"

export const fetchEcosystemProtocolLogo = (name, ext) => `${ecosystemListLogoUrl}${name}${ext}`
export const fetchEcosystemProtocolByNameURL = name => `${ecosystemListUrl}?name=${name}`

// cross origin
// export const l2beatOrigin = "https://api.l2beat.com"
// export const ecosystemTVLUrl = l2beatOrigin + "/api/tvl/aggregate?projectSlugs=scroll"
// export const ecosystemActivityUrl = l2beatOrigin + "/api/activity/aggregate?projectSlugs=scroll"
