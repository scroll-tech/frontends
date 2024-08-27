import { ReactComponent as ContributeIcon } from "@/assets/svgs/community/contribute.svg"
import { ReactComponent as DiscordIcon } from "@/assets/svgs/community/discord.svg"
import { ReactComponent as ForumIcon } from "@/assets/svgs/community/forum.svg"

export const DISCORD_LINK = "https://discord.gg/scroll"
export const COMMUNITY_FORUM_LINK = "https://community.scroll.io/"
export const CONTRIBUTE_TO_SCROLL_LINK = "https://github.com/scroll-tech/contribute-to-scroll"

export const COMMUNITY_EXPLORER_LIST = [
  {
    icon: DiscordIcon,
    href: DISCORD_LINK,
    title: "Join our Discord",
    content: "Connect with other Scroll developers and users",
  },
  {
    icon: ForumIcon,
    href: COMMUNITY_FORUM_LINK,
    title: "Community Forum",
    content: "Discuss and propose changes to Scroll",
  },
  {
    icon: ContributeIcon,
    href: CONTRIBUTE_TO_SCROLL_LINK,
    title: "Contribute to Scroll",
    content: "Build with other developers",
  },
]

export const COMMUNITY_TIME_LIST = ["All time", "Upcoming", "Last month", "This year"]

export const COMMUNITY_REGION_LIST = [
  "All regions",
  "Africa",
  "Asia",
  "Central America",
  "Europe",
  "Middle East",
  "North America",
  "Pacific",
  "South America",
]
