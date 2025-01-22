// const baseUrl = process.env.NEXT_PUBLIC_OPEN_BLOCK_URI
const venusUrl = process.env.NEXT_PUBLIC_SCROLL_VENUS_URI

const baseUrl = process.env.NEXT_PUBLIC_SESSIONS_URI

export const checkSignStatus = address => `${venusUrl}/v1/signature/address?address=${address}`
export const updateSignStatus = `${venusUrl}/v1/signature/sign`

export const fetchSession0And1TotalMarksURL = address => `${baseUrl}/session1-marks/${address}`
export const fetchSession2TotalMarksURL = address => `${baseUrl}/session2-marks/${address}`
export const fetchSession2PerProtocolMarksURL = address => `${baseUrl}/session2-project-marks/${address}`
