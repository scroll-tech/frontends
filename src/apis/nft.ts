const baseUrl = process.env.NEXT_PUBLIC_NFT_API_URI

export const fetchParamsByAddressURL = address => `${baseUrl}/p/${address}.json?timestamp=${Date.now()}`

export const generateParamsByAddressURL = address => `${baseUrl}/up/${address}.json`
