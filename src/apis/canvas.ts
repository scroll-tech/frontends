const baseUrl = process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI

export const getAvatarURL = add => `${baseUrl}/heartbeat/${add}.svg`

export const getHeartrate = add => `${baseUrl}/heartbeat/${add}`

export const getSmallAvatarURL = add => `${baseUrl}/heartbeat/${add}/s.svg`

export const getImgByCode = code => `${baseUrl}/code/${code}.png`

export const fetchSignByCode = (code, add) => `${baseUrl}/code/${code}/sig/${add}`

export const fetchCodeByAdd = add => `${baseUrl}/acc/${add}/code`

export const checkCodeValidation = code => `${baseUrl}/code/${code}/active`

export const getInviteUrlByCode = code => `${process.env.NEXT_PUBLIC_FFRONTENDS_URL}/canvas/invite/${code}`

export const viewEASScanURL = id => `${process.env.NEXT_PUBLIC_EAS_EXPLORER_URL}/attestation/view/${id}`

export const checkBadgeEligibilityURL = (baseUrl, walletAddress, badgeContract) =>
  `${baseUrl}/check?badge=${badgeContract}&recipient=${walletAddress}`

export const claimBadgeURL = (baseUrl, walletAddress, badgeContract) => `${baseUrl}/claim?badge=${badgeContract}&recipient=${walletAddress}`

export const EthereumYearBadgeURL = year => `${process.env.NEXT_PUBLIC_ETHEREUM_YEAR_BADGE_API_URI}/canvas/year/${year}.webp`
