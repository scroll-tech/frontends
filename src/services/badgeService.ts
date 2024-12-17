import { fetchWhiteListBadgesURL } from "@/apis/canvas-badge"
import { SCR_HOLDING_BADGE_ADDRESS } from "@/constants"

export const fetchWhiteListBadges = async () => {
  try {
    const result = await scrollRequest(fetchWhiteListBadgesURL)
    return result?.data?.map(item => item.badgeContract).concat(SCR_HOLDING_BADGE_ADDRESS)
  } catch (e) {
    return []
  }
}
