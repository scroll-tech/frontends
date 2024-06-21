import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"

import { ReactComponent as ForumIcon } from "@/assets/svgs/sessions/forum.svg"
import { ReactComponent as LearnIcon } from "@/assets/svgs/sessions/learn.svg"
import { ReactComponent as SupportIcon } from "@/assets/svgs/sessions/support.svg"

dayjs.extend(utc)

export const Chapter1StartDate = dayjs("2024-05-15T09:00:00Z")

export const FORUM_LINK = "https://scrollzkp.notion.site/Scroll-Sessions-FAQ-498f70eb33b94d539746a43256956517"
export const SUPPORT_LINK = "https://tally.so/r/3lNV1B"
export const TOU_LINK = "/sessions-terms-of-use"

export const SESSIONS_EXPLORER_LIST = [
  {
    icon: ForumIcon,
    href: FORUM_LINK,
    title: "FAQ",
    content: "You will find most answers here",
  },
  {
    icon: SupportIcon,
    href: SUPPORT_LINK,
    title: "Support",
    content: "Marks are wrong or missing? Tell us",
  },
  {
    icon: LearnIcon,
    href: TOU_LINK,
    title: "Sessions’ Terms of Use",
    content: "All legal things",
  },
]

export const SESSIONS_ZERO_ASSETS = "session-0-assets"
export const SESSIONS_ZERO_GAS = "session-0-gas"
export const SESSIONS_ONE_DEX = "session-1-dex"
export const SESSIONS_ONE_LENDING = "session-1-lending"
export const SESSIONS_ONE_ACTIVITIES = "session-1-activities"
