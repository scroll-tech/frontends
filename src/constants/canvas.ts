import { SCR_HOLDING_BADGE_ADDRESS } from "./badge"

export enum BADGES_VISIBLE_TYPE {
  VISIBLE = "Displayed",
  INVISIBLE = "Not displayed",
}

export enum CANVAS_AVATAR_TYPE {
  NFT = "NFT",
  PICTURE = "Picture",
  HEARTBEAT = "Heartbeat",
}

export const BADGE_INTEGRATION_GUIDE =
  "https://scrollzkp.notion.site/Introducing-Scroll-Canvas-Badge-Integration-Guide-8656463ab63b42e8baf924763ed8c9d5"

export const EXPLORE_BADGES_URL = "/canvas-and-badges#discover"

export const CANVAS_AVATAR_MAX_SIZE = 4.5 * 1024 * 1024 // 4.5MB

export const GRACE_PERIOD_DURATION = 60 // min

export const FORCE_PAY_GAS_FEE_BADGE_LIST = [SCR_HOLDING_BADGE_ADDRESS]
