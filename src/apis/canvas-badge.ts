import { requireEnv } from "@/utils"

const baseUrl = requireEnv("REACT_APP_BADGE_BACKEND_URL")

export const fetchBadgesURL = `${baseUrl}/badges`
