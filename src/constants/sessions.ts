import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"

import { ReactComponent as ForumIcon } from "@/assets/svgs/sessions/forum.svg"
import { ReactComponent as LearnIcon } from "@/assets/svgs/sessions/learn.svg"
import { ReactComponent as SupportIcon } from "@/assets/svgs/sessions/support.svg"

dayjs.extend(utc)

export const Chapter1StartDate = dayjs("2024-05-15T09:00:00Z")

export const FORUM_LINK = "https://scrollzkp.notion.site/Scroll-Sessions-FAQ-498f70eb33b94d539746a43256956517"
export const SUPPORT_LINK = "https://scrollzkp.notion.site/Scroll-Sessions-FAQ-498f70eb33b94d539746a43256956517"
export const LEARN_LINK = "https://scrollzkp.notion.site/Scroll-Sessions-FAQ-498f70eb33b94d539746a43256956517"

export const SESSIONS_EXPLORER_LIST = [
  {
    icon: ForumIcon,
    href: FORUM_LINK,
    title: "FAQ",
    content: "For any questions, please refer here first",
  },
  {
    icon: SupportIcon,
    href: SUPPORT_LINK,
    title: "Support",
    content: "Request support if there are issues with your Marks",
  },
  {
    icon: LearnIcon,
    href: LEARN_LINK,
    title: "Terms and conditions",
    content: "All legal things",
  },
]
