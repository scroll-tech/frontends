import { ReactComponent as ContributeIcon } from "@/assets/svgs/community/contribute.svg"
import { ReactComponent as DiscordIcon } from "@/assets/svgs/community/discord.svg"
import { ReactComponent as GovernanceSvg } from "@/assets/svgs/community/governance.svg"

export const DISCORD_LINK = "https://discord.gg/scroll"
export const COMMUNITY_FORUM_LINK = "https://gov.scroll.io/info"
export const CONTRIBUTE_TO_SCROLL_LINK = "https://github.com/scroll-tech/contribute-to-scroll"

export const COMMUNITY_EXPLORER_LIST = [
  {
    icon: DiscordIcon,
    href: DISCORD_LINK,
    title: "Join our Discord",
    content: "Connect with other Scroll developers and users",
  },
  {
    icon: GovernanceSvg,
    href: COMMUNITY_FORUM_LINK,
    title: "Go to Governance",
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
  "Online",
  "Pacific",
  "South America",
]
